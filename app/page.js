"use client";
import Image from "next/image";
import Button from "./_components/Button";
import Card from "./_components/Card";
import { useGame } from "./_context/GameContext";

export default function Page() {
  const {
    state: { playerOne, playerTwo, dice, altDice, winner, isPlaying },
    dispatch,
  } = useGame();

  const isWinner = winner != "";

  return (
    <>
      <div className=" grid grid-cols-2 lg:w-3/4 h-screen mx-auto lg:py-2 relative">
        <Card player={playerOne} isWinner={isWinner} />
        <Card player={playerTwo} isWinner={isWinner} />

        <Button
          content="🔁 new game"
          className="top-10 left-1/2 -translate-x-1/2"
          onClick={() => dispatch({ type: "newGame" })}
          ariaLabel="new game"
        />
        <Button
          content="🎲 roll dice"
          className="bottom-36 left-1/2 -translate-x-1/2"
          onClick={() => dispatch({ type: "rollDice" })}
          ariaLabel="roll dice"
          disabled={isWinner}
        />
        <Button
          content="📥 hold"
          className="bottom-20 left-1/2 -translate-x-1/2"
          onClick={() => dispatch({ type: "holdScore" })}
          ariaLabel="hold score"
          disabled={isWinner}
        />

        {isPlaying ? (
          <Image
            src={dice}
            alt={`Dice ${altDice}`}
            className="top-1/3 left-1/2 -translate-x-1/2 absolute w-24 h-24"
            sizes="20vw"
          />
        ) : null}
      </div>

      <div aria-live="polite" className="sr-only">
        {isWinner
          ? `${winner} has won the game!`
          : isPlaying
          ? `Current roll: ${altDice}. Your current points are ${
              playerOne.active ? playerOne.current : playerTwo.current
            }`
          : 'Welcome to the game! Click "New Game" to start.'}
      </div>
    </>
  );
}
