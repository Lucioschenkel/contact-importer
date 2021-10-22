export interface IHashProvider {
  hash(input: string): Promise<string>;
  verify(raw: string, encryptedPayload: string): Promise<boolean>;
}
