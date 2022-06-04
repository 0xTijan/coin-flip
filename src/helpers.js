import { getEllipsisTxt } from "web3uikit";

export const getItem = (id) => {
  if(id == 0) return "Rock";
  if(id == 1) return "Paper";
  if(id == 2) return "Scissors";
  if(id == 3) return "Not set";
}

export const getState = (id) => {
  if(id == 0) return "OPEN";
  if(id == 1) return "CLOSED";
  if(id == 2) return "GETTING WINNER";
}

export const renderAddress = (user, address) => {
  if(user) return `You (${getEllipsisTxt(address)})`;
  else return getEllipsisTxt(address);
}

export const OPTIONS = [
  {
    id: 0,
    label: 'Rock',
    prefix: '⛰'
  },
  {
    id: 1,
    label: 'Paper',
    prefix: '🍃'
  },
  {
    id: 2,
    label: 'Scissors',
    prefix: "✂"
  }
];