import { getEllipsisTxt } from "web3uikit";

export const getItem = (id) => {
  if(id == 0) return "😎 Head";
  if(id == 1) return "🐈 Tail";
  if(id == 2) return "Not set";
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
    label: 'Head',
    prefix: '😎'
  },
  {
    id: 1,
    label: 'Tail',
    prefix: '🐈'
  }
];


/**
 * GAME_STATE:
 *  OPEN - 0
 *  CLOSED - 1
 *  GETTING_WINNER - 2
 */

/**
 * GAME_OPTIONS:
 *  HEAD - 0
 *  TAIL - 1
 *  NOT_SET - 2
 */