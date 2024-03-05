import "./index.css";

import { useState } from "react";
import { REG_EXP_EMAIL } from "../reg-exp";
import Input from "../input";

export default function Component ({ label, error_text, placeholder, onChange }) {
    const [error, setError] = useState(null);
    
    const validateEmail = (email) => {
        return REG_EXP_EMAIL.test(email);
    };

    const handleInputChange = (e) => {
        const { value } = e.target;
        const isValidEmail = validateEmail(value);
        
        onChange(value, isValidEmail);
        setError(!isValidEmail ? error_text : null);
    };

    return (
        <div className="field">
            <label>{label}</label>
            <Input  
                placeholder={placeholder} 
                onChange={handleInputChange} 
            />
            {error && <span className="error">{error}</span>}
        </div>
    );
}
