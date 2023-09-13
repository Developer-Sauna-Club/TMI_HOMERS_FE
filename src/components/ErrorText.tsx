type ErrorTextProps = {
  text: string;
};

const ErrorText = ({ text }: ErrorTextProps) => {
  return (
    <small className="self-end p-1 text-error-red font-light font-Cafe24SurroundAir text-xs">
      {text}
    </small>
  );
};

export default ErrorText;
