"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

const importAll = (requireContext) => requireContext.keys().map(requireContext);
const images = importAll(
  require.context("@/public/img", false, /\.(png|jpe?g|svg)$/)
);
const dices = images.map((image) => image.default);

const diceRoll = () => Math.trunc(Math.random() * 6);

const GameContext = createContext();

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
  isPlaying: false,
  winner: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "newGame":
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

      if (roll === 0)
        return {
          ...state,
          playerOne: {
            ...state.playerOne,
            current: 0,
            active: !state.playerOne.active,
          },
          playerTwo: {
            ...state.playerTwo,
            current: 0,
            active: !state.playerTwo.active,
          },
          dice: dices[roll],
          isPlaying: true,
        };
      else
        return {
          ...state,
          playerOne: state.playerOne.active
            ? {
                ...state.playerOne,
                current: (state.playerOne.current += currentScore),
              }
            : { ...state.playerOne },
          playerTwo: state.playerTwo.active
            ? {
                ...state.playerTwo,
                current: (state.playerTwo.current += currentScore),
              }
            : { ...state.playerTwo },
          dice: dices[roll],
          isPlaying: true,
        };

    case "holdScore":
      if (
        (state.playerOne.active && state.playerOne.current === 0) ||
        (state.playerTwo.active && state.playerTwo.current === 0)
      )
        return { ...state };
      else
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
          winner:
            state.playerOne.score + state.playerOne.current >= 100
              ? "Player One"
              : state.playerTwo.score + state.playerTwo.current >= 100
              ? "Player Two"
              : "",
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
