import React from "react";

const RadioInput:React.FC<RadioProps> = ({ ...props }) => {
    const {
		label,
		name,
		className,
		type="text",
		required = false,
		id,
		onChange,
        value,
        radioOptions,
        error,
		...rest
	} = props;
    
  return (
    <div>
      <label htmlFor={name} className="text-sm text-[#464646]">
        {label}
      </label>
      {required === true ?  (
                <span className='text-red-500'>*</span>
            ): (
                <span className='text-slate-400 text-sm'>(optional)</span>
            )
}
      <div className="flex gap-10 mt-2">
        {
            radioOptions.map((option, index)=>(
                <div className="form-control" key={index}>
                <label className="flex items-center gap-2">
                    <span className="">{option.option}</span>
                    <input type="radio" name={name} value={option.value} className={`${error && 'radio-error'} radio ${className}`} onChange={onChange} required={required} />
                </label>
                </div>
            ))
        }
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default RadioInput;

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	className?: string;
	onChange?:
	| React.ChangeEventHandler<HTMLInputElement>;
	required?: boolean;
    radioOptions: Array<{
        option: string, value: string
    }>
    error?: string
}
