type ErrorTextProps = {
  text: string;
};

const ErrorText = ({ text }: ErrorTextProps) => {
  return <small className="text-red-600 p-2">{text}</small>;
};

export default ErrorText;
