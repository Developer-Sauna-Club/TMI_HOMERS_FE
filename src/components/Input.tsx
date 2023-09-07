type InputProps = {
  placeholder: string;
};

const Input = ({ placeholder }: InputProps) => {
  return (
    <input
      className="w-[18rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir"
      placeholder={placeholder}
    />
  );
};

export default Input;
