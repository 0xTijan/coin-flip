import React, { useEffect, useState } from "react";
import { BannerStrip, Select, Button, Tag } from "web3uikit";
import { useMoralis } from "react-moralis";
import { renderAddress } from "../helpers";
import { getItem } from "../helpers";

const History = ({ refresh, games, loading }) => {
  const { user } = useMoralis();

  return(
    <div style={{ maxWidth: "50%" }}>
      <h1>Games History</h1>
      {games.map(game => {
        let bool1 = game.player1.toLowerCase() == user.get("ethAddress").toLowerCase();
        let bool2 = game.player2.toLowerCase() == user.get("ethAddress").toLowerCase();
        let bool3 = game.winner.toLowerCase() == user.get("ethAddress").toLowerCase();
        return(
          <div style={{ border: "1px solid blue" }}>
            <p>PLayer 1: {renderAddress(bool1, game.player1)}</p>
            <p>Player 2: {renderAddress(bool2, game.player1)}</p>
            <p>Prize: {game.prize} BNB</p>
            <p>Winner: {renderAddress(bool3, game.player1)}</p>
            <Tag
              active
              text="Finished"
              theme="status"
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
  )
}

export default History;