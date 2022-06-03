import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BannerStrip, getEllipsisTxt } from "web3uikit";
import { ABI, ADDRESS } from "../contract";
import { getItem } from "../helpers";

const AvailableGames = () => {
  const [games, setGames] = useState([]);
  const { Moralis } = useMoralis();

  const getGames = async() => {
    try{
      const readOptions = {
        contractAddress: ADDRESS,
        functionName: "getLastId",
        abi: ABI,
      };
      const lastId = await Moralis.executeFunction(readOptions);

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

        if(result.state != 1) {
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
      }
      console.log(_games);
      setGames(_games);
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getGames();
  }, [])

  return(
    <div style={{ maxWidth: "50%" }}>
      {/*<BannerStrip
          buttonConfig={{
            onClick: () => console.log("refresh"),
            text: 'Refresh'
          }}
          buttonDisplayed
        text="Available Games to Join"
        type="standard"
        />>*/}
        <h1>Available Games</h1>
        <div>
          {games.map(game => {
            return(
              <div>
                <p>Creator: {getEllipsisTxt(game.player1)}</p>
                <p>Prize: {game.prize} ETH</p>
                <p>Creator's Item: {getItem(game.player1Option)}</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default AvailableGames;