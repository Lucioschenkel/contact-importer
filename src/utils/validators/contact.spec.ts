import { AppError } from "@shared/errors/AppError";

import contactValidator from "./contact";

describe("contactValidator", () => {
  it("should throw if the provided address is empty", () => {
    expect(() => {
      contactValidator({
        address: "",
        credit_card: "4444444444444444",
        date_of_birth: "20201002",
        email: "contato@lucioschenkel.com",
        name: "A valid-name",
        telephone: "(+00) 000 000 00 00 00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);
  });

  it("should throw if the provided email is invalid", () => {
    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10-02",
        email: "@lucio.",
        name: "A valid-name",
        telephone: "(+00) 000 000 00 00 00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);
  });

  it("should throw if the provided date is invalid", () => {
    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10",
        email: "contato@lucioschenkel.com",
        name: "A valid-name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);

    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "202010",
        email: "contato@lucioschenkel.com",
        name: "A valid-name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);
  });

  it("should throw if the provided phone number is invalid", () => {
    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10",
        email: "contato@lucioschenkel.com",
        name: "A valid-name",
        telephone: "(+53) 999 000-00-777",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);
  });

  it("should throw if the provided owner id is invalid", () => {
    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10-02",
        email: "contato@lucioschenkel.com",
        name: "A valid-name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "my invalid owner id",
      });
    }).toThrow(AppError);
  });

  it("should throw if the provided name is invalid", () => {
    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "4444444444444444",
        date_of_birth: "2020-10-02",
        email: "contato@lucioschenkel.com",
        name: "A invalid name because of $this",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);
  });

  it("should throw if the provided credit card's length is invalid", () => {
    expect(() => {
      contactValidator({
        address: "A valid address",
        credit_card: "444455556666777",
        date_of_birth: "2020-10-02",
        email: "contato@lucioschenkel.com",
        name: "Valid name",
        telephone: "(+00) 000-000-00-00",
        owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
      });
    }).toThrow(AppError);
  });

  it("should not throw if the provided contact is valid", () => {
    const isContactValid = contactValidator({
      address: "A valid address",
      credit_card: "4444444444444444",
      date_of_birth: "2020-10-02",
      email: "contato@lucioschenkel.com",
      name: "Valid name",
      telephone: "(+00) 000-000-00-00",
      owner_id: "c9b5d808-0529-437e-94a9-ad0bbdac64e7",
    });

    expect(isContactValid).toBe(true);
  });
});
