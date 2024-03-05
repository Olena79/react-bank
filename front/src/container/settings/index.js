import './index.css';
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import { useAuth } from "../../page/AuthContext";
import TitleMedium from '../../component/title-medium';
import TitleSmall from '../../component/title-small';
import FieldEmail from '../../component/field-email';
import FieldPassword from '../../component/field-password';
import Button from '../../component/button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//====================================================

export default function Component () {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [oldPassword, setOldPassword] = useState(null);
    const [newPassword, setNewPassword] = useState(null);

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidOldPassword, setIsValidOldPassword] = useState(false);
    const [isValidNewPassword, setIsValidNewPassword] = useState(false);
    const [error1, setError1] = useState(false);
    const [error2, setError2] = useState(false);

    const { state, dispatch } = useAuth();
    const navigate = useNavigate();

    const handleEmail = async (e) => {
        const value = e;
        setEmail(value);
        setIsValidEmail(true);
    };

    const handlePassword = async (e) => {
        const value = e;
        setPassword(value);
        setIsValidPassword(true);
    };

    const handleOldPassword = async (e) => {
        const value = e;
        setOldPassword(value);
        setIsValidOldPassword(true);
    };

    const handleNewPassword = async (e) => {
        const value = e;
        setNewPassword(value);
        setIsValidNewPassword(true);
    };

    const isButtonEmailActive = email !== null && password !== null && isValidEmail !== false && isValidPassword !== false; 

    const isButtonPasswordActive = oldPassword !== null && newPassword !== null && isValidOldPassword !== false && isValidNewPassword !== false;

    const handleSubmitEmail = async () => {
        try {
            const signUpResponse = await fetch('http://localhost:4000/settings-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    newEmail: email,
                    password: password,
                    id: state.user.id,
                })
            });

            if(signUpResponse.status === 400) {
                setError1(true);
            }

            const data = await signUpResponse.json();

            if(signUpResponse.ok) {
                dispatch({ type: "LOGIN", token: state.token, user: data.user });
                alert("Email успішно змінено")
                window.location.reload();
            }
        }
        catch (er) {
                console.error('Помилка завантаження:', er);
            };
    };

    const handleSubmitPassword = async () => {
        try {
            const signUpResponse = await fetch('http://localhost:4000/settings-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    id: state.user.id,
                })
            });

            if(signUpResponse.status === 400) {
                setError2(true);
            }

            const data = await signUpResponse.json();

            if(signUpResponse.ok) {
                dispatch({ type: "LOGIN", token: state.token, user: data.user });
                alert("Password успішно змінено")
                window.location.reload();
            }
        }
        catch (er) {
                console.error('Помилка завантаження:', er);
            };
    };

    const handleLogout = () => {
        const isAgreed = window.confirm('Are you sure? You want to logout?');

        if(isAgreed) {
            dispatch({ type: 'LOGOUT', token: null, user: null });
            navigate('/')
        } else {
            console.log("Користувач не згодився виходити із системи")
        };
    };

    return (
        <Page>
            <BackButton />
            <TitleMedium name="Settings" />
            <div className='padding__box1'>
                <TitleSmall name='Change email' />
                <FieldEmail 
                    label={"New email"}
                    error_text='Помилка, введіть коректний email'
                    placeholder='example@gmail.com'
                    onChange={handleEmail}
                />
                <FieldPassword 
                    label='Password'
                    placeholder="Pass2000ID"
                    error_text="Пароль має складатися з щонайменше однієї цифри, однієї літери у нижньому регістрі, однієї літери у верхньому регістрі. Довжина не менше 8 символів"
                    onChange={handlePassword}
                />

                <Button
                    style={{ backgroundColor: "#775CE5", color: "white"}}
                    text="Save Email"
                    condition={isButtonEmailActive}
                    onClick={handleSubmitEmail}
                />
                {error1 && <span className='email__error'>Пароль не вірний</span>}
            </div>
            <div className='line'></div>
            <div className='padding__box2'>
                <TitleSmall name='Change password' />

                <FieldPassword 
                    label="Password"
                    placeholder="Pass2000ID"
                    error_text="Пароль має складатися з щонайменше однієї цифри, однієї літери у нижньому регістрі, однієї літери у верхньому регістрі. Довжина не менше 8 символів"
                    onChange={handleOldPassword}
                />
                <FieldPassword 
                    label="New Password"
                    placeholder="Pass2000ID"
                    error_text="Пароль має складатися з щонайменше однієї цифри, однієї літери у нижньому регістрі, однієї літери у верхньому регістрі. Довжина не менше 8 символів"
                    onChange={handleNewPassword}
                />
                <Button
                    style={{ backgroundColor: "#64D5DB", color: "white"}}
                    text="Save Password"
                    onClick={handleSubmitPassword}
                    condition={isButtonPasswordActive}
                />
                {error2 && <span className='password__error'>Пароль не вірний</span>}
            </div>
            <Button
                    style={{ border: "1px solid #F30284", color: "#F30284"}}
                    text="Logout"
                    condition="active"
                    onClick={handleLogout}
                />
        </Page>
    );
};