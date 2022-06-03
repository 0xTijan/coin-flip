import React from "react";
import { useChain, useMoralis } from "react-moralis";
import { Button, ConnectButton } from "web3uikit";
import AvailableGames from "./AvailableGames";
import CreateGame from "./CreateGame";
import History from "./History";

const Home = () => {
  const { user, isWeb3Enabled, authenticate } = useMoralis();
  const { chainId, switchNetwork } = useChain();

  const KOVAN_CHAIN_ID = "0x2a";

  const switchToKovan = async() => {
    try{
      await switchNetwork(KOVAN_CHAIN_ID)
    }catch(err){
      console.log(err)
    }
  }

  return(
    <>
      {!user || !isWeb3Enabled ? (
        <div>
          <h1>Connect your wallet to continue:</h1>
          <ConnectButton />
        </div>
      ):(
        chainId == KOVAN_CHAIN_ID ? (
          <>
          <div style={{ display: "flex", flexDirection: "row", maxHeight: "70vw", justifyContent: "space-evenly" }}>
            <AvailableGames />
            <History />
          </div>
          <div>
            <CreateGame />
          </div>
          </>
        ):(
          <div>
            <h1>Worng Network, please switch to Kovan!</h1>
            <Button
              text="Switch Chain"
              onClick={() => switchToKovan()}
            />
          </div>
        )
      )}
    </>
  )
}

export default Home;