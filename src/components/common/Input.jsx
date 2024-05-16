import { Typography } from "@material-tailwind/react";

const fixedClass =
  "placeholder:text-slate-400 block bg-white border border-gray-400 rounded-md py-2 pl-3 pr-3 mt-1 shadow-sm focus:outline-none focus:border-blue-600 focus:ring-blue-600 focus:ring-1 sm:text-sm";

export default function Input({
  label,
  name,
  placeholder,
  handleChange,
  id,
  value,
  type,
  autoComplete,
  isRequired,
  disable,
  classExpand,
}) {
  return (
    <div className="mb-4">
      <Typography color="blue-gray" className="text-[14px]">
        {label}
      </Typography>
      <input
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        type={type}
        autoComplete={autoComplete}
        required={isRequired}
        className={`${fixedClass} ${classExpand}`}
        disabled={disable}
      />
    </div>
  );
}
