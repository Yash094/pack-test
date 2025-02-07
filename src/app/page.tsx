"use client";
import { getContract, Hex } from "thirdweb";
import { client } from "./client";
import { avalancheFuji } from "thirdweb/chains";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount
} from "thirdweb/react";
import { createNewPack } from "thirdweb/extensions/pack";
import { approve } from "thirdweb/extensions/erc721";

export default function Home() {
  const account = useActiveAccount();
  const contractPack = getContract({
    chain: avalancheFuji,
    client,
    address: "0xcE3Cd68aADc8D7D8672673e1A61F293B4aE7B42C"
  })
  const contractNFT = getContract({
    chain: avalancheFuji,
    client,
    address: "0x1A67396f0f77d4000BB81242Eaa005b7C032A444"
  })


  const transaction = createNewPack({
    client,
    contract: contractPack,
    recipient: account?.address as Hex,
    tokenOwner: account?.address as Hex,
    packMetadata: {
      name: "Pack #1",
      image: "image-of-pack-1",
    },
    openStartTimestamp: new Date(),
    erc20Rewards: [],
    erc721Rewards: [
      {
        contractAddress: "0x1A67396f0f77d4000BB81242Eaa005b7C032A444",
        tokenId: 1n,
      },
    ],
    erc1155Rewards: [],
    amountDistributedPerOpen: 1n
  });

  const approvalTransaction = approve({
    contract: contractNFT,
    to: contractPack.address,
    tokenId: 1n,
  });

  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold mb-4">Wallet Connection</h1>

      <div className="flex flex-col items-center gap-4">
        <ConnectButton
          client={client}
          chain={avalancheFuji}
        />
        <TransactionButton
          transaction={async () => {
            // Create a transaction object and return it


            return approvalTransaction;
          }}
          onTransactionSent={(result) => {
            console.log("Transaction submitted", result.transactionHash);
          }}
          onTransactionConfirmed={(receipt) => {
            console.log("Transaction confirmed", receipt.transactionHash);
          }}
          onError={(error) => {
            console.error("Transaction error", error);
          }}
        >
          Approve Transaction
        </TransactionButton>

        <TransactionButton
          transaction={async () => {
            // Create a transaction object and return it


            return transaction;
          }}
          onTransactionSent={(result) => {
            console.log("Transaction submitted", result.transactionHash);
          }}
          onTransactionConfirmed={(receipt) => {
            console.log("Transaction confirmed", receipt.transactionHash);
          }}
          onError={(error) => {
            console.error("Transaction error", error);
          }}
        >
          Confirm Transaction
        </TransactionButton>

      </div>
    </main>
  );
}



