import "./index.css";

import { useState } from 'react';
import Input from "../input";

const FieldCode = ({ label, error_text, placeholder, onChange }) => {
    const [error, setError] = useState(null);
    const [value, setValue] = useState("");
    const [isValidCode, setIsValidCode] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setValue(inputValue); 
    
        if (inputValue.length === 6) {
            setIsValidCode(true);
            setError(null);
        } else {
            setIsValidCode(false);
            setError(error_text);
        }

        onChange(inputValue);
    };

    return (
        <div className="field">
            <label>{label}</label>
            <Input 
                value={value}
                placeholder={placeholder} 
                onChange={(e) => handleInputChange(e)}
                maxLength={6}
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
};

export default FieldCode;
