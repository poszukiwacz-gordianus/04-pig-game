export default function Button({ content, className, onClick, disabled }) {
  return (
    <button
      className={`${className} absolute font-semibold bg-pink-100 opacity-75 text-base lg:text-lg uppercase rounded-full py-3 px-8 shadow-lg active:shadow-sm active:translate-y-1 transition-all duration-300`}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
