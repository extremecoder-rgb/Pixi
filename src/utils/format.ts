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
  
  const profileData = await erc725js.fetchData("LSP3Profile");
  const decodedProfileMetadata =
    profileData as unknown as DecodedProfileMetadata;
  const addressPrefix = address.slice(0, 4);
  const profile: LSP3Profile = decodedProfileMetadata.value.LSP3Profile;
  const profileName = `@${profile.name}#${addressPrefix}`;
  const cid = profile?.profileImage ? profile.profileImage[0]?.url : "";
  return { profileName, cid };
}

export function generateProfileName(name: string, address: string): string {
 
  const addressPrefix = address.slice(0, 4);

 
  return `@${name}#${addressPrefix}`;
}

export function bytes32ToAddress(bytes32: string): string {
 
  if (!ethers.utils.isHexString(bytes32) || bytes32.length !== 66) {
    throw new Error("Invalid bytes32 string");
  }

  
  const address = "0x" + bytes32.slice(-40);
  return address;
}


export function convertUnixTimestampToCustomDate(
  unixTimestamp: number,
  dateFormat: string
): string {
  const date = new Date(unixTimestamp * 1000);
  return format(date, dateFormat);
}


export function hexToDecimal(hexString: string): number {
 
  return parseInt(hexString, 16);
}

export function convertIpfsUriToUrl(
  ipfsUri: string,
  gateway: string = "https://ipfs.io/ipfs/"
): string {
  
  if (ipfsUri.startsWith("ipfs://")) {
    
    const ipfsHash = ipfsUri.substring(7);
    return `${gateway}${ipfsHash}`;
  }

  
  throw new Error("Invalid IPFS URI");
}


export function uint8ArrayToHexString(array: Uint8Array): string {
  return (
    "0x" +
    Array.from(array)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("")
  );
}


export function hexStringToUint8Array(hexString: string): Uint8Array {
  hexString = hexString.replace(/^0x/, "");
  const bytes = new Uint8Array(hexString.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hexString.substr(i * 2, 2), 16);
  }
  return bytes;
}
