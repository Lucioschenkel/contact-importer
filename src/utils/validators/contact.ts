import { Joi } from "celebrate";
import creditCardType from "credit-card-type";
import dateIsValid from "date-fns/isValid";

import patterns from "@config/patterns";
import { AppError } from "@shared/errors/AppError";

interface IContact {
  address: string;
  credit_card: string;
  date_of_birth: string;
  email: string;
  name: string;
  owner_id: string;
  telephone: string;
}

const addressSchema = Joi.string().required().min(1);
const emailSchema = Joi.string().required().email();
const ownerIdSchema = Joi.string().required().uuid();
const nameSchema = {
  validate(name: string): { error: AppError } {
    const formattedName = name.replace(/ /g, "");

    return {
      error: patterns.name.test(formattedName)
        ? null
        : new AppError("Invalid name"),
    };
  },
};
const dateSchema = {
  validate(date: string): { error: AppError } {
    const isBasicDate = patterns.date["%Y%m%d"].test(date);
    const isExtendedDate = patterns.date["%F"].test(date);

    if (!isBasicDate && !isExtendedDate) {
      return { error: new AppError("Invalid date format.") };
    }

    let formattedDate = date;

    if (isBasicDate) {
      formattedDate = `${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(
        6,
        8
      )}`;
    }

    return {
      error: dateIsValid(new Date(formattedDate))
        ? null
        : new AppError("Invalid date"),
    };
  },
};
const phoneSchema = {
  validate(phone: string): { error: AppError } {
    const isLongerPhoneNumber =
      patterns.phone["(+00) 000 000 00 00 00"].test(phone);
    const isShorterPhoneNumber =
      patterns.phone["(+00) 000-000-00-00"].test(phone);

    return {
      error:
        isLongerPhoneNumber || isShorterPhoneNumber
          ? null
          : new AppError("Invalid phone number"),
    };
  },
};
const creditCardSchema = {
  validate(credit_card: string): { error: AppError } {
    const type = creditCardType(credit_card);

    if (!type || type.length === 0) {
      return { error: new AppError("Invalid credit card number") };
    }

    return {
      error:
        type[0].lengths.indexOf(credit_card.length) !== -1
          ? null
          : new AppError("Invalid credit card length"),
    };
  },
};

export default function contactValidator({
  address,
  credit_card,
  date_of_birth,
  email,
  name,
  owner_id,
  telephone,
}: IContact): boolean {
  try {
    const { error: addressError } = addressSchema.validate(address);

    if (addressError) {
      throw new AppError("Invalid address");
    }

    const { error: emailError } = emailSchema.validate(email);

    if (emailError) {
      throw new AppError("Invalid e-mail");
    }

    const { error: dateError } = dateSchema.validate(date_of_birth);

    if (dateError) {
      throw dateError;
    }

    const { error: phoneError } = phoneSchema.validate(telephone);

    if (phoneError) {
      throw phoneError;
    }

    const { error: ownerIdError } = ownerIdSchema.validate(owner_id);

    if (ownerIdError) {
      throw new AppError("Invalid owner id");
    }

    const { error: nameError } = nameSchema.validate(name);

    if (nameError) {
      throw nameError;
    }

    const { error: creditCardError } = creditCardSchema.validate(credit_card);

    if (creditCardError) {
      throw creditCardError;
    }

    return true;
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(`Validation failed ${err.message}`);
  }
}
