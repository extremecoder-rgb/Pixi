import crypto from "crypto";

const algorithm = "aes-256-cbc";
const iv = crypto.randomBytes(16); 


export async function generateEncryptedEncryptionKey(
  key: CryptoKey,
  encryptionKey: Uint8Array
): Promise<{ iv: Uint8Array; encryptedKey: Uint8Array }> {
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const encryptedKey = await crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptionKey
  );

  return {
    iv: iv,
    encryptedKey: new Uint8Array(encryptedKey),
  };
}


export async function decryptEncryptedEncryptionKey(
  key: CryptoKey,
  iv: Uint8Array,
  encryptedKey: Uint8Array
): Promise<Uint8Array> {
  const decryptedKey = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encryptedKey 
  );

  return new Uint8Array(decryptedKey);
}

export async function generateAESKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true, 
    ["encrypt", "decrypt"]
  );
}
