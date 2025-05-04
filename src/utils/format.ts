import { ethers } from "ethers";
import { ERC725 } from "@erc725/erc725.js";
import LSP3Schema from "@erc725/erc725.js/schemas/LSP3ProfileMetadata.json";
import { format } from "date-fns";

interface LSP3Profile {
  name: string;
  description: string;
  profileImage?: { url: string }[];
  backgroundImage?: { url: string }[];
  tags?: string[];
  links?: string[];
}

interface DecodedProfileMetadata {
  value: {
    LSP3Profile: LSP3Profile;
  };
}

export async function getUniversalProfileCustomName(
  address: string
): Promise<{ profileName: string; cid: string }> {
  const erc725js = new ERC725(
    LSP3Schema,
    address,
    process.env.NEXT_PUBLIC_MAINNET_URL,
    {
      ipfsGateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY,
    }
  );
  // Fetch the LSP3 profile metadata
  const profileData = await erc725js.fetchData("LSP3Profile");
  const decodedProfileMetadata =
    profileData as unknown as DecodedProfileMetadata;
  const addressPrefix = address.slice(0, 4);
  const profile: LSP3Profile = decodedProfileMetadata.value.LSP3Profile;
  const profileName = `@${profile.name}#${addressPrefix}`;
  const cid = profile?.profileImage ? profile.profileImage[0]?.url : "";

  // Return the Universal Profile name
  return { profileName, cid };
}

export function generateProfileName(name: string, address: string): string {
  // Extract the first 4 characters of the address
  const addressPrefix = address.slice(0, 4);

  // Generate the formatted string
  return `@${name}#${addressPrefix}`;
}

export function bytes32ToAddress(bytes32: string): string {
  // Ensure the input is a valid bytes32 string
  if (!ethers.utils.isHexString(bytes32) || bytes32.length !== 66) {
    throw new Error("Invalid bytes32 string");
  }

  // Extract the last 40 characters (20 bytes) and prepend '0x'
  const address = "0x" + bytes32.slice(-40);
  return address;
}

/**
 * Convert a Unix timestamp to a custom formatted date string.
 * @param unixTimestamp - The Unix timestamp to convert.
 * @param dateFormat - The format string for the date.
 * @returns A formatted date string.
 */
export function convertUnixTimestampToCustomDate(
  unixTimestamp: number,
  dateFormat: string
): string {
  const date = new Date(unixTimestamp * 1000);
  return format(date, dateFormat);
}

/**
 * Convert a hexadecimal string to a decimal number.
 * @param hexString - The hexadecimal string to convert.
 * @returns The decimal number.
 */
export function hexToDecimal(hexString: string): number {
  // Use parseInt with base 16 to convert hex to decimal
  return parseInt(hexString, 16);
}

/**
 * Converts an IPFS URI to a URL using a specified gateway.
 *
 * @param {string} ipfsUri - The IPFS URI, e.g., "ipfs://Qm...".
 * @param {string} gateway - The gateway URL to use, e.g., "https://ipfs.io/ipfs/".
 * @returns {string} - The full URL to access the resource.
 */
export function convertIpfsUriToUrl(
  ipfsUri: string,
  gateway: string = "https://ipfs.io/ipfs/"
): string {
  // Check if the IPFS URI starts with "ipfs://"
  if (ipfsUri.startsWith("ipfs://")) {
    // Remove the "ipfs://" prefix and append the hash to the gateway URL
    const ipfsHash = ipfsUri.substring(7); // "ipfs://" is 7 characters long
    return `${gateway}${ipfsHash}`;
  }

  // If the IPFS URI doesn't have the "ipfs://" prefix, return it as-is or handle it accordingly
  throw new Error("Invalid IPFS URI");
}

// Convert Uint8Array to bytes
export function uint8ArrayToHexString(array: Uint8Array): string {
  return (
    "0x" +
    Array.from(array)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  );
}

// Retrieving and Converting Back to Uint8Array
export function hexStringToUint8Array(hexString: string): Uint8Array {
  hexString = hexString.replace(/^0x/, "");
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return bytes;
}