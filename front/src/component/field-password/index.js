import { useState } from "react";
import { REG_EXP_PASSWORD } from "../reg-exp";
import "./index.css";
import Input from "../input";

export default function Component({ label, error_text, style, placeholder, onChange  }) {
    const [error, setError] = useState(null);

    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        return REG_EXP_PASSWORD.test(password);
    };

    const handleInputChange = (event) => {
        const { value } = event.target;
        const isValidPassword = validatePassword(value);
        
        onChange(value, isValidPassword);
        setError(isValidPassword ? null : error_text);
    };

    const toggleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className="field">
            <label>{label}</label>
            <div className="field__wrapper">
                <Input 
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder} 
                    onChange={handleInputChange}
                />
                <button 
                    className="field__icon" 
                    onClick={toggleShowPassword} 
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    show={showPassword ? "show" : null}
                />
            </div>
            {error && <span className="error">{error}</span>}
        </div>
    );
}
