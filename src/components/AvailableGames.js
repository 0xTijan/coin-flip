import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BannerStrip, Button, getEllipsisTxt, Select, Icon } from "web3uikit";
import { ABI, ADDRESS } from "../contract";
import { getItem, OPTIONS, renderAddress } from "../helpers";

const AvailableGames = ({ refresh, games, loading }) => {
  const { Moralis, user } = useMoralis();
  const [option, setOption] = useState(null);

  const joinGame = async(game) => {
    try{
      console.log("Joining Game:");
      console.log(game);

      if(option == null) return alert("Please select your item!")
      if(game.player1.toLowerCase() == user.get("ethAddress").toLowerCase()) return alert("Cannot join the game you created!");

      const readOptions = {
        contractAddress: ADDRESS,
        functionName: "joinGame",
        abi: ABI,
        msgValue: Moralis.Units.ETH(game.prize),
        params: {
          _gameId: game.id,
          option: option
        }
      };
      console.log(readOptions)
      const tx = await Moralis.executeFunction(readOptions);
      console.log(tx)
      let receipt = await tx.wait();
      console.log(receipt)

      console.log("joined")
      alert("Joined Successfuly!")
    }catch(err){
      console.log(err)
    }
  }

  const deleteGame = async(game) => {
    try{
      console.log("deleting game")
      console.log(game)
    }catch(err){
      console.log(err)
    }
  }

  const getOptions = (player1Option) => {
    let toReturn = [];
    OPTIONS.map(option => {
      if(option.id != player1Option) {
        toReturn.push(option)
      }
    }); 
    return toReturn;
  }

  return(
    <div style={{ maxWidth: "50%" }}>
      <h1>Available Games</h1>
      <div>
        {games.map(game => {
          let bool = game.player1.toLowerCase() == user.get("ethAddress").toLowerCase();
          return(
            <div style={{ border: "1px solid blue" }}>
              <p>Creator: {renderAddress(bool, game.player1)}</p>
              <p>Prize: {game.prize} BNB</p>
              <p>Creator's Item: {getItem(game.player1Option)}</p>
              {!bool ? (
                <Select
                  label="You Item"
                  onBlurTraditional={function noRefCheck(){}}
                  onChange={(event) => setOption(event.id)}
                  onChangeTraditional={function noRefCheck(){}}
                  options={getOptions(game.player1Option)}
                />
              ):null}
              <Button
                text={bool ? "Delete" : "Join"}
                onClick={!bool ? (() => joinGame(game)) : (() => deleteGame(game))}
                theme="primary"
                type="button"
              />
            </div>
          )
        })}
        {loading ? (
          <div>
            <p>Loading . . . Please wait!</p>
          </div>
        ):(
          games.length == 0 ? (
            <div>
              <p>There are no games open currently, but you can create one yourself!</p> 
            </div>
          ):null
        )}
      </div>
    </div>
  )
}

export default AvailableGames;