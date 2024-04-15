import React from "react";

function InputField({type, name, value, onChange, placeholder, ...rest}){
    return (
        <input
            className="form-control"
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}  
        />
    );
}
export default InputField;