import { RegisterOptions, useFormContext } from 'react-hook-form';
import ErrorText from './ErrorText';

type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  registerOptions?: RegisterOptions;
};

const defaultInputClass =
  'w-[18.325rem] p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray rounded font-Cafe24SurroundAir';

const FormInput = ({
  name,
  label,
  placeholder,
  type = 'text',
  registerOptions,
  ...props
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="font-Cafe24Surround text-footer-icon p-2">
        {label}
      </label>
      <input
        className={`${defaultInputClass}
            ${errors[name] ? 'border-error-red' : ''}`}
        id={name}
        placeholder={placeholder}
        type={type}
        {...register(name, registerOptions)}
        {...props}
      />
      {errors[name] && <ErrorText text={errors[name]?.message as string} />}
    </div>
  );
};

export default FormInput;
