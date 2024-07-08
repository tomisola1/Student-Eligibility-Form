"use client";

import React, { useState } from "react";

export const InputField: React.FC<InputProps> = ({ ...props }) => {
  const {
    label,
    name,
    className,
    placeholder,
    type,
    required = false,
    minLength,
    defaultValue,
    id,
    onChange,
    error,
    ...rest
  } = props;

  return (
    <div className="">
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
      <div className="relative">
        <input
          name={name}
          className={`input ${error && 'border-red-500'} border-slate-300 input-primary placeholder-[#75838D] rounded-lg placeholder-opacity-50 w-full mb-1.5 mt-2 font-light text-sm shadow-sm ${className}`}
          placeholder={placeholder}
          type={type}
          onChange={onChange}
          id={id}
          required={required}
          minLength={minLength}
          defaultValue={defaultValue}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default InputField;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}
