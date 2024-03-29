type ErrorTextProps = {
  text: string;
};

const ErrorText = ({ text }: ErrorTextProps) => {
  return (
    <small className="self-end p-2 text-error-red font-light font-Cafe24SurroundAir text-xs">
      {text}
    </small>
  );
};

export default ErrorText;
