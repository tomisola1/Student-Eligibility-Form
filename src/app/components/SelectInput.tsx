import React from "react";

const SelectInput: React.FC<SelectProps> = ({ ...props }) => {
  const {
    label,
    name,
    className,
    required = false,
    defaultText,
    defaultValue,
    id,
    onChange,
    data,
    value,
    autoComplete,
    error,
    ...rest
  } = props;

  return (
    <div>
      {label && (
        <label className={"text-sm text-[#464646]"} htmlFor={name}>
          {label}
          &nbsp;
        </label>
      )}
      {required === true ? (
        <span className="text-red-500">*</span>
      ) : (
        <span className="text-slate-400 text-sm">(optional)</span>
      )}
      <div>
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className={`border-solid border ${error && "border-red-500"} border-slate-300 rounded-lg py-3 px-3.5 shadow focus:outline-none focus:border-primary w-full mb-1.5 mt-2 bg-transparent text-zinc-400 text-sm ${className}`}
          required={required}
        >
          <option value="">{defaultText}</option>
          {data &&
            data.map((item, index) => (
              <option key={index} value={item.value}>
                {item.option}
              </option>
            ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default SelectInput;

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  className?: string;
  onChange: React.ChangeEventHandler<HTMLSelectElement | HTMLInputElement>;
  required?: boolean;
  data: Array<{
    option: string;
    value: string;
  }>;
  error?: string;
  defaultText: string;
}
