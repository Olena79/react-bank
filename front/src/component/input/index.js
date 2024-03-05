import "./index.css";
import { useState } from "react";

export default function Component ({ placeholder, onChange, type, maxLength, onInput, onKeyDown }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    return (
        <div className={`${isFocused ? 'focused' : 'unfocused'}`}>
            <input
                className="input"
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={onChange}
                type={type}
                maxLength={maxLength}
                onInput={onInput}
                onKeyDown={onKeyDown}
            />
        </div>
    );
}
