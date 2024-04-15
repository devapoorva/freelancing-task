import React from "react";

function SelectField({ value, options, onChange, placeholder, ...rest }){

    return (
        <select value={value} onChange={onChange} className="form-select" {...rest}  >
            {placeholder && <option value="" disabled>{placeholder}</option>}
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    );
}
export default SelectField;