import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title-big";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import FieldEmail from "../../component/field-email";
import FieldPassword from "../../component/field-password";
import { useAuth } from "../../page/AuthContext";

import { useState  } from "react";
import { useNavigate } from 'react-router-dom';

//==================================================

export default function Component () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isEmailValid, setEmailValid] = useState(false);
    const [isPasswordValid, setPasswordValid] = useState(false);
    const [userExists, setUserExists] = useState(false);
    const [error, setError] = useState(false);

    const navigate = useNavigate();
    const { state, dispatch } = useAuth();

    const handleEmailChange = (value, isValid) => {
        setEmail(value);
        setEmailValid(isValid);
    };

    const handlePasswordChange = (value, isValid) => {
        setPassword(value);
        setPasswordValid(isValid);
    };
    
    const handleSubmit = async () => {
        try {
            const signUpRes = await fetch('http://localhost:4000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if(signUpRes.status === 400) {
                setError(true);
            }

            const data = await signUpRes.json();

            console.log('Data: ', data)

            if(signUpRes.ok) {
                dispatch({ type: 'LOGIN', token: data.session.token, user: data.session.user });
                return navigate(`/signup-confirm?id=${data.session.user.id }`);
            };

        } catch (error) {
            console.error('2Помилка завантаження:', error);
        }
    };

    const isButtonActive = email !== '' && password !== '' && isEmailValid && isPasswordValid;


    return (
        <Page>
            <BackButton />
            <Title title={"Sign up"} paragraph={"Choose a registration method"} />
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
                    error_text="Пароль має складатися з щонайменше однієї цифри, однієї літери у нижньому регістрі, однієї літери у верхньому регістрі. Довжина не менше 8 символів"
                    style={{ border: "1px solid #E9E8EB"}}
                    onChange={handlePasswordChange}
                />

                <div className="span">
                    Already have an account?
                    <a className="anchor" href="/signin">Sign In</a>
                </div>

                <div>
                    <Button 
                        text={"Continue"}
                        style={{ backgroundColor: "#775CE5", color: "white" }}
                        condition={isButtonActive}
                        onClick={handleSubmit}
                    />
                   {error && <span 
                        className='block'
                    >
                        <span className="error__icon"></span>   
                        Користувач з таким email вже існує
                    </span>}
                </div>
            </div>
        </Page>
    );
}
