import { useFormContext, RegisterOptions } from 'react-hook-form';

type FormInputProps = {
  name: string;
  placeholder: string;
  type?: string;
  registerOptions?: RegisterOptions;
};

const defaultInputClass = 'border-2 border-black';

const FormInput = ({
  name,
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
    <div>
      <label>{name}</label>
      <input
        className={defaultInputClass}
        placeholder={placeholder}
        type={type}
        {...register(name, registerOptions)}
        {...props}
      />
      {errors[name] && <p className="text-red-600"> {errors[name]?.message as string}</p>}
    </div>
  );
};

export default FormInput;
