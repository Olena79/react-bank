import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title-big";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import FieldEmail from "../../component/field-email";
import FieldPassword from "../../component/field-password";
import { useAuth } from "../../page/AuthContext";

import { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

//==================================================

export default function Component () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);

    const navigate = useNavigate();
    const { state } = useAuth();

    const handleEmailChange = (value, isValid) => {
        setEmail(value);
        setEmailValid(isValid);
    };

    const handlePasswordChange = (value, isValid) => {
        setPassword(value);
        setPasswordValid(isValid);
    };

    const handleSubmit = async () => {
        try{

            const res = await fetch('http://localhost:4000/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if(res.status === 400) {
                setErrorEmail(true);
            };

            if(res.status === 401) {
                setErrorPassword(true);
            };

            if(res.status === 403) {
                alert('Ви не підтвердили свою пошту. Вас буде перенаправлено на сторінку підтвердження пошти.');
                navigate(`/signup-confirm?id=${state.user.id }`)
            };

            const data = await res.json();

            console.log('Data: ', data)

            if(res.ok) {
                navigate(`/balance/${data.id}`);
            }

        } catch (er) {
            console.error(er);
        }
    };
    
    const isButtonActive = email !== '' && password !== '' && isEmailValid && isPasswordValid;


    return (
        <Page>
            <BackButton />
            <Title title={"Sign in"} paragraph={"Select login method"} />
            <div className="box">
                <FieldEmail 
                    label={"Email"}
                    placeholder={"example@gmail.com"}
                    type="email"
                    error_text="Помилка, введіть коректний email"
                    onChange={handleEmailChange}
                />
                <FieldPassword
                    label={"Password"}
                    placeholder={"11qqQQ11"}
                    error_text="Пароль має скадатися з щонайменше однієї цифри, однієї літери у нижньому регістрі, однієї літери у верхньому регістрі. Довжина не менше 8 символів"
                    style={{ border: "1px solid #E9E8EB"}}
                    onChange={handlePasswordChange}
                />

                <div className="span">
                    Forgot your password?
                    <a className="anchor" href="/recovery">Restore</a>
                </div>

                <div>
                    <Button 
                        text={"Continue"}
                        style={{ backgroundColor: "#775CE5", color: "white" }}
                        condition={isButtonActive}
                        onClick={handleSubmit}
                    />
                   
                    {errorEmail && <div className="block"><span className="error__icon"></span>Користувач з таким email не існує</div>}
                    
                
                    {errorPassword && <div className="block"><span className="error__icon"></span>Не дійсний пароль</div>}   
                        
                    
                    
                </div>
            </div>
        </Page>
    );
}