/* eslint-disable no-restricted-syntax */
import csvParse from "csv-parse";
import fs from "fs";
import path from "path";
import { container } from "tsyringe";
import { v1 as uuidV1 } from "uuid";

import { BlobServiceClient } from "@azure/storage-blob";
import { CreateContactUseCase } from "@modules/contacts/useCases/createContact/CreateContactUseCase";
import { CreateFailureUseCase } from "@modules/contacts/useCases/createFailure/CreateFailureUseCase";
import { DeleteImportUseCase } from "@modules/contacts/useCases/deleteImport/DeleteImportUseCase";
import { UpdateImportUseCase } from "@modules/contacts/useCases/updateImportStatus/UpdateImportUseCase";

interface IData {
  file: string;
  user_id: string;
  import_id: string;
  columns_names: {
    name: string;
    email: string;
    phone: string;
    date_of_birth: string;
    address: string;
    credit_card: string;
  };
}

export default {
  key: "ContactSheetProcessing",
  async handle({ data }) {
    const { file, columns_names, user_id, import_id } = data as IData;
    let nImports = 0;
    let empty = true;

    const updateImportUseCase = container.resolve(UpdateImportUseCase);
    const createContactUseCase = container.resolve(CreateContactUseCase);
    const createFailureUseCase = container.resolve(CreateFailureUseCase);
    const deleteImportUseCase = container.resolve(DeleteImportUseCase);

    await updateImportUseCase.execute({
      import_id,
      status: "PROCESSING",
    });

    const stream = fs.createReadStream(file);
    const parseFile = csvParse({
      columns: true,
    });

    stream.pipe(parseFile);

    for await (const data of parseFile) {
      empty = false;

      const formattedData = {
        address: data[columns_names.address],
        credit_card: data[columns_names.credit_card],
        date_of_birth: data[columns_names.date_of_birth],
        email: data[columns_names.email],
        name: data[columns_names.name],
        owner_id: user_id,
        telephone: data[columns_names.phone],
      };

      try {
        await createContactUseCase.execute(formattedData);
        nImports += 1;
      } catch (err) {
        delete formattedData.credit_card;

        await createFailureUseCase.execute({
          import_id,
          owner_id: user_id,
          provided_data: {
            ...formattedData,
          },
          reason: err.message,
        });
      }
    }

    const status = nImports === 0 ? "FAILED" : "FINISHED";

    if (empty) {
      await deleteImportUseCase.execute({ import_id });
      return;
    }

    // TODO upload file to azure blob
    let downloadUrl = "";
    try {
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      );

      const containerName = "contacts-spreadsheets";

      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      const parsedFileName = path.basename(file);
      const blobName = `${uuidV1()}-${parsedFileName}`;

      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const uploadBlobResponse = await blockBlobClient.uploadFile(file);

      console.log(
        `Successfully finished request to azure: ${uploadBlobResponse.requestId}`
      );

      downloadUrl = blockBlobClient.url;
    } catch (error) {
      downloadUrl = null;
    }

    await updateImportUseCase.execute({
      import_id,
      status,
      download_url: downloadUrl,
    });

    await fs.promises.unlink(file);
  },
};
