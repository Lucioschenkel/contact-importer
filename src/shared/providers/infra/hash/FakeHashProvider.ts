import { IHashProvider } from "@shared/providers/domain/hash/IHashProvider";

export class FakeHashProvider implements IHashProvider {
  async hash(input: string): Promise<string> {
    return input;
  }

  async verify(raw: string, encryptedPayload: string): Promise<boolean> {
    return raw === encryptedPayload;
  }
}
