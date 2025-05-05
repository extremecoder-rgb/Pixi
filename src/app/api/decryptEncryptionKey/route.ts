import { NextResponse, NextRequest } from "next/server";
import { generateEncryptionKey, encryptFile } from "@/utils/upload";
import { generateEncryptedEncryptionKey, generateAESKey } from "@/utils/encryptKey";
import { hexToDecimal, uint8ArrayToHexString } from "@/utils/format";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;



