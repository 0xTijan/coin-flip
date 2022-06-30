import React, { useEffect, useState } from "react";
import { useChain, useFiatBuy, useMoralis } from "react-moralis";
import { Button, ConnectButton } from "web3uikit";
import AvailableGames from "./AvailableGames";
import CreateGame from "./CreateGame";
import History from "./History";
import { ABI, ADDRESS } from "../contract";

const Home = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isWeb3Enabled, authenticate, Moralis } = useMoralis();
  const { chainId, switchNetwork } = useChain();

  const CHAIN_ID = "0x61";

  const switchToKovan = async() => {
    try{
      await switchNetwork(CHAIN_ID)
    }catch(err){
      console.log(err)
    }
  }


  const getGames = async() => {
    try{
      const readOptions = {
        contractAddress: ADDRESS,
        functionName: "getLastId",
        abi: ABI,
      };
      const lastId = await Moralis.executeFunction(readOptions);
      console.log("Last ID: " + lastId)
      let _games = [];
      for(let i = 0; i < lastId.toNumber(); i++) {
        const readOptions = {
          contractAddress: ADDRESS,
          functionName: "getGameForId",
          abi: ABI,
          params: {
            id: i
          }
        };
        
        const result = await Moralis.executeFunction(readOptions);

        _games.push({
          id: result.id.toNumber(),
          player1: result.player1,
          player2: result.player2,
          player1Option: result.player1Option,
          player2Option: result.player2Option,
          winner: result.winner,
          prize: Moralis.Units.FromWei(result.prize),
          state: result.state
        })
      }
      console.log(_games);
      setGames(_games);
      setLoading(false)
    }catch(err){
      console.log(err)
    }
  }

  const refresh = async() => {
    if(isWeb3Enabled) await getGames();
  }

  useEffect(() => {
    if(isWeb3Enabled) refresh();
  }, [])

  useEffect(() => {
    if(isWeb3Enabled) refresh();
  }, [isWeb3Enabled])


  return(
    <>
      <div>
        <h1 className="title">Mulitplayer Decentralized CoinFlip Game</h1>
      </div>
      {!user || !isWeb3Enabled ? (
        <div className="connect-div">
          <h1>Connect your wallet to continue:</h1>
          <div className="balance"><ConnectButton /></div>
        </div>
      ):(
        chainId == CHAIN_ID ? (
          <>
          <div>
            <div className="balance">
              <ConnectButton />
            </div>
            <div className="btns">
              <Button
                text="Refresh"
                onClick={() => refresh()}
                theme="secondary"
                type="button"
                size="large"
                icon="reload"
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", minHeight: "50vh", justifyContent: "space-evenly" }}>
            <AvailableGames refresh={refresh} games={games} loading={loading} />
            <History refresh={refresh} games={games} loading={loading} />
          </div>
          <CreateGame refresh={refresh} />
          </>
        ):(
          <div className="connect-div">
            <h1>Worng Network, please switch to BSC Testnet!</h1>
            <div className="balance">
              <Button
                text="Switch Chain"
                icon="bnb"
                size="large"
                type="secondary"
                onClick={() => switchToKovan()}
              />
            </div>
          </div>
        )
      )}
    </>
  )
}

export default Home;