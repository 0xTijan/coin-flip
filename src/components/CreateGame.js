import React, { useState, useEffect } from "react";
import { OPTIONS } from "../helpers";
import { Button, Select, Input } from "web3uikit";
import { ADDRESS, ABI } from "../contract";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";

const CreateGame = () => {
  const [option, setOption] = useState(null);
  const [bet, setBet] = useState(null);
  const [ok, setOk] = useState(null);
  const { Moralis } = useMoralis();

  const Web3Api = useMoralisWeb3Api();

  const fetchTokenPrice = async () => {
    const options = {
      address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
      chain: "bsc",
      exchange: "PancakeSwapv2",
    };
    const price = await Web3Api.token.getTokenPrice(options);
    return price;
  };

  const createGame = async() => {
    try{
      console.log("Creating Game:");

      if(option == null) return alert("Please select your item!")

      const readOptions = {
        contractAddress: ADDRESS,
        functionName: "createGame",
        abi: ABI,
        msgValue: Moralis.Units.ETH(bet),
        params: {
          option: option
        }
      };
      console.log(readOptions)
      const tx = await Moralis.executeFunction(readOptions);
      console.log(tx)
      let receipt = await tx.wait();
      console.log(receipt)
      alert("Created Successfuly!")
    }catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    (async function a() {
      if(bet) {
        let price = await fetchTokenPrice();
        if(price.usdPrice * bet >= 6) {
          setOk(true);
        }else{
          setOk(false);
        }
      }
    })(); 
  }, [bet]);

  const getState = () => {
    if(ok == null) return "initial";
    if(ok == true) return "confirmed";
    if(ok == false) return "error";
  }

  return(
    <div style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
      <h1>Create your Game:</h1>
      <p>If you create your game than other people will be able to join it and play with you.</p>
      <Input
        style={{ marginBottom: "0.5vh" }}
        label="Your Bet"
        name="Your Bet Value"
        prefixIcon="bnb"
        onChange={e => setBet(e.target.value)}
        type="number"
        state={getState()}
        errorMessage={!ok ? "Bet value must be greater than 5$":null}
      />
      <Select
        style={{ marginBottom: "0.5vh" }}
        label="You Item"
        onChange={(event) => setOption(event.id)}
        options={OPTIONS}
      />
      <Button
        text="Create"
        onClick={() => createGame()}
        theme="primary"
        type="button"
      />
    </div>
  )
}

export default CreateGame;