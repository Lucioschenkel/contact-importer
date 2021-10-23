/* eslint-disable import/no-extraneous-dependencies */
import { mocked } from "ts-jest/utils";

import queue from "@shared/infra/queue";

import { ImportContactsUseCase } from "./ImportContactsUseCase";

let importContactsUseCase: ImportContactsUseCase;

describe("ImportContactsUseCase", () => {
  beforeEach(() => {
    importContactsUseCase = new ImportContactsUseCase();
  });
  it("should add the data to the queue to be processed", (done) => {
    const mockedQueue = mocked(queue);

    const spy = jest.spyOn(mockedQueue, "add");

    importContactsUseCase.execute({
      file: { path: "some_path" } as Express.Multer.File,
      columns_names: {
        address: "",
        date_of_birth: "",
        credit_card: "",
        email: "",
        name: "",
        phone: "",
      },
      user_id: "some_user",
    });

    expect(spy).toHaveBeenCalled();
    done();
  });
});
