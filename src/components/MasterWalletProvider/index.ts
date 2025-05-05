import { ethers } from "ethers";
import FMT from "@/artifacts/FMT.json";


const providerUrl = "https://4201.rpc.thirdweb.com/";
const privateKey =
  "0xed9f33686e286892181a2e05a03d52995c29605b1df17bcc184ebe50ca8aaeee";
const FMT_TOKEN_CONTRACT_ADDRESS = "0x0C5a06045b52d1Abf51e81066033DC86D6A9Cd03";
const provider = new ethers.providers.JsonRpcProvider(providerUrl);
const wallet = new ethers.Wallet(privateKey, provider);

export const FMTContract = new ethers.Contract(
  FMT_TOKEN_CONTRACT_ADDRESS,
  FMT.abi,
  wallet
);
