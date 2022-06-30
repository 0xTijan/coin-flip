import React, { useEffect, useState } from "react";
import { BannerStrip, Select, Button, Tag } from "web3uikit";
import { useMoralis } from "react-moralis";
import { getState, renderAddress } from "../helpers";
import { getItem } from "../helpers";

const History = ({ refresh, games, loading }) => {
  const { user } = useMoralis();

  return(
    <div className="subtitle" style={{ maxWidth: "50%" }}>
      <h1>Activity</h1>
      {games.filter(game => {
        if(game.state != 0) return game;
      }).map(game => {
        let bool1 = game.player1.toLowerCase() == user.get("ethAddress").toLowerCase();
        let bool2 = game.player2.toLowerCase() == user.get("ethAddress").toLowerCase();
        let bool3 = game.winner.toLowerCase() == user.get("ethAddress").toLowerCase();
        let winnerSide = game.player1 == game.winner ? game.player1Option : game.player2Option;
        return(
          <div className="game">
            <p><b>PLayer 1:</b> {renderAddress(bool1, game.player1)} - {getItem(game.player1Option)}</p>
            <p><b>Player 2:</b> {renderAddress(bool2, game.player2)} - {getItem(game.player2Option)}</p>
            <p><b>Prize:</b> {game.prize} BNB</p>
            <p><b>Winner:</b> {game.winner == "0x0000000000000000000000000000000000000000" ? "Getting . . . Refresh in a bit!" : (`${renderAddress(bool3, game.winner)} - ${getItem(winnerSide)}`)}</p>
            <RenderTag state={game.state} />
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
            <p>No games were played yet!</p> 
          </div>
        ):null
      )}
    </div>
  )
}

const RenderTag = ({ state }) => {
  console.log(state)
  if(state == 1) {
    return(
    <Tag
      active
      text="Game Finished"
      theme="status"
    />)
  }else if(state == 2) {
    return( 
    <Tag
      color="blue"
      text="Getting Winner"
    />)
  }else if(state == 3) {
    return(
    <Tag
      color="red"
      text="Game Deleted"
    />)
  }
}

export default History;