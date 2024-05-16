const fixedInputClass =
  "rounded-md appearance-none relative block w-full px-4 py-3 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 sm:text-sm";

export default function Input({
  handleChange,
  value,
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  customClass,
}) {
  return (
    <div className="my-5">
      <label htmlFor={labelFor} className="sr-only">
        {labelText}
      </label>
      <input
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={`${fixedInputClass} + ${customClass}`}
        placeholder={placeholder}
      />
    </div>
  );
}
