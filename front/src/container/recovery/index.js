import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title-big";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import FieldEmail from "../../component/field-email";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//==================================================

export default function Component () {
    const [email, setEmail] = useState('');
    const [isEmailValid, setEmailValid] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleEmailChange = (value) => {
        setEmail(value);
        setEmailValid(true);
    };
  
    const handleSubmit = async () => {
        const res = await fetch('http://localhost:4000/recovery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        });

        if(res.status === 400) {
            setError(true);
        }

        const data = await res.json();

        console.log("Data: ", data);

        if(res.ok) {
            navigate(`/recovery-confirm?code=${data.confirmationCode}`); 
        }
    };

    const isButtonActive = email !== '' && isEmailValid;


    return (
        <Page>
            <BackButton />
            <Title title={"Recover password"} paragraph={"Choose a recovery method"} />
            <div className="box">
                <FieldEmail 
                    label={"Email"}
                    placeholder={"example@gmail.com"}
                    type="email"
                    error_text="Помилка, введіть коректний email"
                    onChange={handleEmailChange}
                />

                <div>
                    <Button 
                        text={"Send code"}
                        style={{ backgroundColor: "#775CE5", color: "white" }}
                        condition={isButtonActive}
                        onClick={handleSubmit}
                    />
                   {error && <div className='block'><span className="error__icon"></span>   
                        Користувач з таким email не існує
                    </div>}
                    
                </div>
            </div>
        </Page>
    );
}