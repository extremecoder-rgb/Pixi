
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

const projectId = "a1bda241f0519c5d662bd07e0705acaf";

const walletConnectMetadata = {
  name: "Ferever Memory",
  description: "dApp using Wallet Connect",
  url: "https://forever-memory.vercel.app/",
  icons: ["https://my.dapp.domain/icon.svg"],
};


const walletConnectConfig = defaultConfig({
  metadata: walletConnectMetadata,
});


const supportedChains = [
  {
    chainId: 4021,
    name: "LUKSO Testnet",
    currency: "LYXt",
    explorerUrl: "https://explorer.execution.testnet.lukso.network/",
    rpcUrl: "https://4201.rpc.thirdweb.com/",
  },
  {
    chainId: 42,
    name: "LUKSO Mainnet",
    currency: "LYX",
    explorerUrl: "https://explorer.lukso.network",
    rpcUrl: "https://42.rpc.thirdweb.com/",
  },
];


const walletConnectChainImages = {
  42: "https://my.dapp.domain/lyx_symbol.svg",
  4201: "https://my.dapp.domain/lyx_symbol.svg",
};


export const walletConnectInstance = createWeb3Modal({
  ethersConfig: walletConnectConfig,
  chains: supportedChains,
  projectId,
  chainImages: walletConnectChainImages,
  featuredWalletIds: ["NONE"], 
});
