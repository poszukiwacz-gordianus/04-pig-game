export default function Card({
  player: { number, score, current, active },
  isWinner,
}) {
  return (
    <>
      <div
        className={` flex flex-col ${
          !active && isWinner
            ? " bg-green-700"
            : active && !isWinner
            ? "bg-pink-200"
            : "bg-pink-400 opacity-60"
        }  items-center py-24 transition-all duration-500 ${
          number === 1 ? "lg:rounded-s-lg" : " lg:rounded-e-lg"
        } `}
      >
        <h1
          className={`${
            current === 1 ? "font-semibold" : ""
          } text-4xl uppercase mb-6`}
        >{`Player ${number}`}</h1>
        <h2 className=" text-7xl text-pink-600 mb-32">{score}</h2>
        <div className=" flex flex-col gap-4 bg-pink-600 px-16 py-4 text-white text-center rounded-lg">
          <h3 className="text-xl uppercase">Current</h3>
          <h4 className="text-4xl mb-3">{current}</h4>
        </div>
      </div>
    </>
  );
}
