import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BannerStrip, Button, getEllipsisTxt, Select, Tag } from "web3uikit";
import { ABI, ADDRESS } from "../contract";
import { getItem, getState, OPTIONS, renderAddress } from "../helpers";

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
      await refresh();
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

      const readOptions = {
        contractAddress: ADDRESS,
        functionName: "deleteGame",
        abi: ABI,
        params: {
          _gameId: game.id,
        }
      };
      console.log(readOptions)
      const tx = await Moralis.executeFunction(readOptions);
      console.log(tx)
      let receipt = await tx.wait();
      console.log(receipt)

      alert("Game Deleted!")
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
    <div className="subtitle" style={{ maxWidth: "50%" }}>
      <h1>Available Games</h1>
      <div>
        {games.filter(game => {
          if(game.state == 0) return game;
        }).map(game => {
          let bool = game.player1.toLowerCase() == user.get("ethAddress").toLowerCase();
          return(
            <div className="game">
              <p><b>Creator:</b> {renderAddress(bool, game.player1)}</p>
              <p><b>Prize:</b> {game.prize} BNB</p>
              <p><b>Creator's Item:</b> {getItem(game.player1Option)}</p>
              {!bool ? (
                <Select
                  label="You Item"
                  onChange={(event) => setOption(event.id)}
                  options={getOptions(game.player1Option)}
                />
              ):null}
              <Button
                text={bool ? "Delete" : "Join"}
                onClick={!bool ? (() => joinGame(game)) : (() => deleteGame(game))}
                theme="primary"
                type="button"
              />
              <Tag
                color="blue"
                text={getState(0)}
              />
            </div>
          )
        })}
        {loading ? (
          <div>
            <p>Loading . . . Please wait! <br/> Try refreshing if nothing shows!</p>
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