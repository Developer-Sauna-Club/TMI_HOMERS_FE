import { RegisterOptions, useFormContext } from 'react-hook-form';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ErrorText from './ErrorText';

type FormInputProps = {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  registerOptions?: RegisterOptions;
  isPassword?: boolean;
  toggleShowPassword?: () => void;
  showPassword?: boolean;
  showToggleButton?: boolean;
};

const defaultInputClass =
  'max-w-[18.325rem] w-full  p-3.5 bg-input-white outline-none border border-lazy-gray placeholder:text-lazy-gray dark:text-wall-street rounded font-Cafe24SurroundAir font-normal';

const FormInput = ({
  name,
  label,
  placeholder,
  type = 'text',
  registerOptions,
  isPassword = false,
  toggleShowPassword,
  showPassword = false,
  showToggleButton = false,
  ...props
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="w-full flex flex-col justify-center">
      <label
        htmlFor={name}
        className="font-Cafe24Surround text-footer-icon dark:text-lazy-gray p-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={`${defaultInputClass}
            ${errors[name] ? 'border-error-red' : ''}`}
          id={name}
          placeholder={placeholder}
          type={type}
          {...register(name, registerOptions)}
          {...props}
        />
        {isPassword && showToggleButton && (
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2"
            onClick={toggleShowPassword}
            type="button"
            aria-label={label}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        )}
      </div>
      {errors[name] && <ErrorText text={errors[name]?.message as string} />}
    </div>
  );
};

export default FormInput;
