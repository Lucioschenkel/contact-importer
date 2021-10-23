import { CreateContactUseCase } from "@modules/contacts/useCases/createContact/CreateContactUseCase";
import csvParse from "csv-parse";
import fs from "fs";
import { container } from "tsyringe";

interface IData {
  file: string;
  user_id: string;
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
    const { file, columns_names, user_id } = data as IData;

    const createContactUseCase = container.resolve(CreateContactUseCase);

    const stream = fs.createReadStream(file);
    const parseFile = csvParse({
      columns: true,
    });

    stream.pipe(parseFile);

    parseFile
      .on("data", async (data) => {
        try {
          await createContactUseCase.execute({
            address: data[columns_names.address],
            credit_card: data[columns_names.credit_card],
            date_of_birth: data[columns_names.date_of_birth],
            email: data[columns_names.email],
            name: data[columns_names.name],
            owner_id: user_id,
            telephone: data[columns_names.phone],
          });
        } catch (err) {
          console.log(err);
        }
      })
      .on("end", () => {
        fs.promises.unlink(file);
      })
      .on("error", (err) => {
        throw err;
      });
  },
};
