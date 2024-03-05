import './index.css';
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import { useAuth } from "../../page/AuthContext";
import TitleMedium from '../../component/title-medium';
import TitleSmall from '../../component/title-small';
import Input from '../../component/input';
import FieldEmail from '../../component/field-email';
import Button from '../../component/button';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//====================================================

export default function Component () {
    const [value, setValue] = useState("");
    const [sendingEmail, setSendingEmail] = useState('');
    const [error, setError] = useState(false);
    const [balance, setBalance] = useState('');

    const { state } = useAuth();
    const navigate = useNavigate();

    const handleChangeEmail = (e) => {
        setSendingEmail(e);
    };

    const handleChange = (e) => {
        const newValue = e.target.value.replace(/[^0-9.]/g, ''); // Видаляємо всі символи, крім цифр
        setValue(newValue);
    };

    const handleKeyDown = (e) => {
        // Блокуємо натискання клавіш, якщо вони не є цифрами
        if (!/^\d$/.test(e.key) && e.key !== '.' && e.key !== 'Backspace') {
          e.preventDefault();
        }
    };

    const handleSubmit = async () => {
        try {
            const signUpResponse = await fetch('http://localhost:4000/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: value,
                    paymentSystem: 'Email',
                    sendingEmail: sendingEmail,
                })
            });

            if(signUpResponse.status === 400) {
                const data = await signUpResponse.json();
                setError(true);
                setBalance(data.message)
            };

            if(signUpResponse.ok) {
                navigate(`/balance/${state.user.id}`);
            } else {
                console.error(error);
            }

        } catch (er) {
            console.error('Помилка завантаження:', er);
        };
    };

    return (
        <Page>
            <BackButton />
            <TitleMedium name="Send" />
            <div className='padding'>
                <FieldEmail
                    label='Email'
                    placeholder='example@gmail.com'
                    onChange={handleChangeEmail}
                    type="email"
                    error_text="Помилка, введіть коректний email"
                />

                <div>
                    <TitleSmall name='Sum' />
                    <Input
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                    />
                    
                </div>
                
                <Button
                    text="Send"
                    style={{ backgroundColor: '#775CE5', color: 'white' }}
                    condition='active'
                    onClick={handleSubmit}
                />

                {error && <div className='block'><span className="error__icon"></span>   
                    {balance}
                </div>}
               

            </div>
        </Page>
    );
};