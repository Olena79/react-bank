import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title-big";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import FieldCode from '../../component/field-code';
import FieldPassword from "../../component/field-password";
import { useAuth } from "../../page/AuthContext";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//==================================================

export default function Component () {
    const [password, setPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const [isCodeValid, setIsCodeValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [error, setError] = useState(false);


    const navigate = useNavigate();
    const { state, dispatch } = useAuth();

    const handleCodeChange = (value) => {
        setConfirmationCode(value);
        setIsCodeValid(true);
    };

    const handlePasswordChange = (value) => {
        setPassword(value);
        setPasswordValid(true);
    };

    const handleSubmit = async () => {
        try{
            const res = await fetch('http://localhost:4000/recovery-confirm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    confirmationCode: confirmationCode,
                    password: password,

                })
            });

            if(res.status === 400) {
                setError(true);
            };

            if(res.status === 403) {
                alert('Ваш пароль змінено, але Ви не підтвердили свою пошту. Вас буде перенаправлено на сторінку підтвердження пошти.');
                navigate(`/signup-confirm?id=${state.user.id }`)
            };

            const data = await res.json();

            if(res.ok) {
                dispatch({ type: 'LOGIN', token: state.token, user: data.user });
                navigate(`/balance/${data.user.id}`);
            };

        } catch (error) {
            console.error('Помилка завантаження:', error);
        }
    };
    

    const isButtonActive = confirmationCode !== '' && password !== '' && isCodeValid && isPasswordValid;


    return (
        <Page>
            <BackButton />
            <Title title={"Recover password"} paragraph={"Write the code you received"} />
            <div className="box">
                <FieldCode
                    label={"Code"}
                    placeholder={"example: 123456"}
                    error_text="Помилка, код не вірний"
                    style={{ border: "1px solid #775CE5"}}
                    onChange={handleCodeChange}
                />
                <FieldPassword
                    label={" New password"}
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
                   {error && <div className='block'><span className="error__icon"></span>Не вірний код</div>}
                    
                </div>
            </div>
        </Page>
    );
}