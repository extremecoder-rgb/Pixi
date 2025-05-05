import crypto, { createHash, createDecipheriv } from "crypto";

export async function generateEncryptionKey(
  encryptionKey: string
): Promise<Uint8Array> {
  const hash = createHash("sha256");
  hash.update(encryptionKey);
  return hash.digest();
}

export async function encryptFile(
  file: File,
  encryptionKey: Uint8Array
): Promise<Uint8Array> {
 
  const fileBuffer = await file.arrayBuffer();

 
  const iv = crypto.getRandomValues(new Uint8Array(16));

  
  const key = await crypto.subtle.importKey(
    "raw",
    encryptionKey,
    "AES-CBC",
    false,
    ["encrypt"]
  );

  
  const encryptedData = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv },
    key,
    fileBuffer
  );

 
  return new Uint8Array([...iv, ...new Uint8Array(encryptedData)]);
}

export async function decryptFile(
  encryptedData: Uint8Array,
  encryptionKey: Uint8Array
): Promise<Buffer> {
  
  const iv = encryptedData.slice(0, 16);
  const encryptedContent = encryptedData.slice(16);
  const decipher = createDecipheriv("aes-256-cbc", encryptionKey, iv);

 
  let decryptedData = decipher.update(encryptedContent);
  decryptedData = Buffer.concat([decryptedData, decipher.final()]);

 
  return decryptedData;
}
