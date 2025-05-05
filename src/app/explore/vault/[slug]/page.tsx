"use client";

import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import ForeverMemoryCollection from "@/artifacts/Vault.json";
import { ethers } from "ethers";
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers5/react";
import { bytes32ToAddress, hexToDecimal } from "@/utils/format"; 
import { ERC725 } from "@erc725/erc725.js";
import lsp4Schema from "@erc725/erc725.js/schemas/LSP4DigitalAsset.json";
import { ERC725YDataKeys } from "@lukso/lsp-smart-contracts";
import { generateEncryptionKey, decryptFile } from "@/utils/upload";
import VaultFactoryABI from "@/artifacts/VaultFactory.json";
import MomentCard from "@/components/MomentCard";
import toast, { Toaster } from "react-hot-toast";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface Moment {
  name: string;
  description: string;
  cid: string;
  likes: number;
  comments: number;
  owner: string;
  momentAddress: string;
}

interface TokenData {
  cid: string;
  tokenSymbol: string;
  tokenName: string;
  tokenId: string;
}

type URLDataWithHash = {
  url: string;
  hash: string;
};

type Data = string | number | boolean | URLDataWithHash | Data[];


function hasUrlProperty(value: any): value is URLDataWithHash {
  return value && typeof value === "object" && "url" in value;
}

export default function Page({ params }: { params: { slug: string } }) {
  const vaultAddress = params.slug;

  const [tokenDataArray, setTokenDataArray] = useState<TokenData[]>([]);
  const [vaultTitle, setVaultTitle] = useState<string>();
  const [vaultDescription, setVaultDescription] = useState<string>();
  const [vaultMembers, setVaultMembers] = useState<string>();
  const [vaultMoments, setVaultMoments] = useState<string>();
  const { address, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
   
    const moments_: Moment[] = [];
    moments_.push({
      name: "Living my best life",
      description:
        "Feeling joyful and full of life! This moment is everything. #happyvibes #bestlife #2024",
      cid: "Qme3CmGpot61Rr2YVWVhFU6e23hZMiXziof5g8quUnMGcq",
      likes: 24,
      comments: 78,
      owner: "0xDCAaff67152D85BFbC8ABD1e649f9C515a417398",
      momentAddress: "0x87B7f2A55b427e326C01f40bD070DAc219D0963C",
    });
    moments_.push({
      name: "Living my best life",
      description:
        "Feeling joyful and full of life! This moment is everything. #happyvibes #bestlife #2024",
      cid: "Qme3CmGpot61Rr2YVWVhFU6e23hZMiXziof5g8quUnMGcq",
      likes: 24,
      comments: 78,
      owner: "0xDCAaff67152D85BFbC8ABD1e649f9C515a417398",
      momentAddress: "0x87B7f2A55b427e326C01f40bD070DAc219D0963C",
    });
    moments_.push({
      name: "Living my best life",
      description:
        "Feeling joyful and full of life! This moment is everything. #happyvibes #bestlife #2024",
      cid: "Qme3CmGpot61Rr2YVWVhFU6e23hZMiXziof5g8quUnMGcq",
      likes: 24,
      comments: 78,
      owner: "0xDCAaff67152D85BFbC8ABD1e649f9C515a417398",
      momentAddress: "0x87B7f2A55b427e326C01f40bD070DAc219D0963C",
    });
    setMoments(moments_);
    setIsDownloading(true);
  }, [isConnected]);

  const fetchNFT = async () => {
    if (walletProvider) {
      const encryptionKey = await generateEncryptionKey(
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY!
      );

      const ethersProvider = new ethers.providers.Web3Provider(
        walletProvider,
        "any"
      );
      const signer = ethersProvider.getSigner(address);

      const VaultFactoryContract = new ethers.Contract(
        process.env.NEXT_PUBLIC_VAULT_FACTORY_CONTRACT_ADDRESS as string,
        VaultFactoryABI.abi,
        signer
      );

      const data = await VaultFactoryContract.getVaultMetadata(vaultAddress);

    }
  };

  const handleJoinVault = async () => {
    if (walletProvider) {
      toast.success("Joint to vault successfully.");
    } else {
      toast.error("Please connect the wallet.");
    }
  };

  return !isDownloading ? (
    <div className="flex space-x-2 justify-center items-center bg-gray-200 h-screen dark:invert">
      <span className="sr-only">Loading...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
    </div>
  ) : (
    <div className="px-6 bg-white pt-10 h-[800px]">
      <div className="font-bold text-3xl">Daily Selfie</div>
      <div className="pt-3 h-[50px]">
        A public collection of daily selfies and moments shared by the
        community. More info
      </div>

      <div className="flex justify-between">
        <div className="flex justify-between gap-4 items-center">
          <div className="flex items-center max-w-sm mx-auto">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search 740 moments"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>

          <div className="max-w-md">224 members</div>
        </div>
        <div className="flex justify-between gap-4 items-center">
          <button
            type="button"
            onClick={() => handleJoinVault()}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Join vault
          </button>
          <button
            onClick={() => setOpenModal(true)}
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            ...
          </button>
        </div>
      </div>

      <div className="py-10 grid grid-cols-3 gap-4">
        {moments.map((moment, index) => (
          <div key={index}>
            <MomentCard moment={moment} />
          </div>
        ))}
      </div>
      <Toaster />
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to leave this vault? You will no longer have
              access to the moments in this vault.
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className="bg-red-500"
                onClick={() => setOpenModal(false)}
              >
                Yes, I'm sure
              </Button>
              <Button
                className="bg-white text-black"
                onClick={() => setOpenModal(false)}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
