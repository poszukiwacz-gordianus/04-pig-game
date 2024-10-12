"use client";
import Image from "next/image";
import Button from "./_components/Button";
import Card from "./_components/Card";
import { useGame } from "./_context/GameContext";

export default function Page() {
  const {
    state: { playerOne, playerTwo, dice, isPlaying, winner },
    dispatch,
  } = useGame();

  const isWinner = winner != "";

  return (
    <div className=" grid grid-cols-2 lg:w-3/4 h-screen mx-auto lg:py-2 relative">
      <Card player={playerOne} winner={winner} />

      <Card player={playerTwo} winner={winner} />

      <Button
        content="🔁 new game"
        className="top-10 left-1/2 -translate-x-1/2"
        onClick={() => dispatch({ type: "newGame" })}
      />
      <Button
        content="🎲 roll dice"
        className="bottom-36 left-1/2 -translate-x-1/2"
        onClick={() => dispatch({ type: "rollDice" })}
        disabled={isWinner}
      />
      <Button
        content="📥 hold"
        className="bottom-20 left-1/2 -translate-x-1/2"
        onClick={() => dispatch({ type: "holdScore" })}
        disabled={isWinner}
      />

      {isPlaying ? (
        <Image
          src={dice}
          alt="dice X"
          className="top-1/3 left-1/2 -translate-x-1/2 absolute w-24 h-24"
          sizes="20vw"
        />
      ) : null}
    </div>
  );
}
