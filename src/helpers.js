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