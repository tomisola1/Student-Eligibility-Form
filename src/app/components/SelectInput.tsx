import React from "react";

const SelectInput: React.FC<SelectProps> = ({ ...props }) => {
  const {
    label,
    name,
    className,
    placeholder,
    type = "text",
    required = false,
    defaultValue,
    id,
    onChange,
    data,
    value,
    autoComplete,
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
          className="border-solid border border-slate-300 rounded-lg py-3 px-3.5 shadow focus:outline-none focus:border-primary w-full mt-2 bg-transparent text-#667085]"
          required={required}
        >
          <option value="">{placeholder}</option>
          {data &&
            data.map((item: any, index) => (
              <option key={index} value={item.value}>
                {item.option}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default SelectInput;

interface SelectProps extends React.InputHTMLAttributes<any> {
  label?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  required?: boolean;
  data: Array<{
    option: string;
    value: string;
  }>;
}
