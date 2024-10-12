"use client";

import { createContext, useContext, useReducer } from "react";

// Load all dice images
const importAll = (requireContext) => requireContext.keys().map(requireContext);
const images = importAll(
  require.context("@/public/img", false, /\.(png|jpe?g|svg)$/)
);
const dices = images.map((image) => image.default);

// Functions
const diceRoll = () => Math.trunc(Math.random() * 6);

function playerScore(player) {
  return player.score + player.current;
}

// Consts
const WINNING_SCORE = 100;
const PLAYER_ONE = "Player One";
const PLAYER_TWO = "Player Two";

// Create game context
const GameContext = createContext();

// InitialState
const initialState = {
  playerOne: {
    number: 1,
    score: 0,
    current: 0,
    active: true,
  },
  playerTwo: {
    number: 2,
    score: 0,
    current: 0,
    active: false,
  },
  dice: null,
  altDice: null,
  isPlaying: false,
  winner: "",
};

function reducer(state, action) {
  const activePlayer = state.playerOne.active ? "playerOne" : "playerTwo";
  const inactivePlayer = state.playerOne.active ? "playerTwo" : "playerOne";

  switch (action.type) {
    case "newGame":
      // Reset state to initial because reset is shallow nested objects are need to be resetet manually
      return {
        ...initialState,
        playerOne: {
          ...initialState.playerOne,
          score: 0,
          current: 0,
          active: true,
        },
        playerTwo: {
          ...initialState.playerTwo,
          score: 0,
          current: 0,
          active: false,
        },
      };

    case "rollDice":
      const roll = diceRoll();
      const currentScore = roll + 1;

      // If the roll is 0, change the turn to the other player and reset the current score
      if (roll === 0)
        return {
          ...state,
          [activePlayer]: {
            ...state[activePlayer],
            current: 0,
            active: false,
          },
          [inactivePlayer]: {
            ...state[inactivePlayer],
            active: true,
          },
          dice: dices[roll],
          altDice: `One! You loose your turn. Turn ${inactivePlayer}. Your score is ${state[inactivePlayer].score}`,
          isPlaying: true,
        };

      // Update the current score for the active player
      return {
        ...state,
        [activePlayer]: {
          ...state[activePlayer],
          current: state[activePlayer].current + currentScore,
        },
        dice: dices[roll],
        altDice: roll + 1,
        isPlaying: true,
      };

    case "holdScore":
      // Prevent active player from loosing thei turn if current point is 0
      if (state[activePlayer].active && state[activePlayer].current === 0)
        return { ...state };

      // Checks if is already a winner
      const isWinner =
        playerScore(state.playerOne) >= WINNING_SCORE
          ? PLAYER_ONE
          : playerScore(state.playerTwo) >= WINNING_SCORE
          ? PLAYER_TWO
          : "";

      return {
        ...state,
        playerOne: {
          ...state.playerOne,
          score: state.playerOne.score + state.playerOne.current,
          current: 0,
          active: !state.playerOne.active,
        },
        playerTwo: {
          ...state.playerTwo,
          score: state.playerTwo.score + state.playerTwo.current,
          current: 0,
          active: !state.playerTwo.active,
        },
        winner: isWinner,
        altDice: `Your score is ${state[inactivePlayer].score} Please roll the dice`,
      };
    default:
      return { ...state };
  }
}

function GameProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

function useGame() {
  const context = useContext(GameContext);
  if (context === undefined)
    throw new Error("GameContext used outside of Provider");
  return context;
}

export { GameProvider, useGame };
