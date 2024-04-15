import React from "react";

function TextAreaField({ name, value, onChange, placeholder, ...rest}){
    return (
        <textarea
            className="form-control"
            rows="1"
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            {...rest}  
        />
    );
}
export default TextAreaField;