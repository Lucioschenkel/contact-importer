import { hash, compare } from "bcrypt";

import { IHashProvider } from "../../domain/hash/IHashProvider";

export class BcryptHashProvider implements IHashProvider {
  async hash(input: string): Promise<string> {
    return hash(input, 8);
  }

  async verify(raw: string, encryptedPayload: string): Promise<boolean> {
    return compare(raw, encryptedPayload);
  }
}
