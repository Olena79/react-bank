import './index.css';
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import { useAuth } from "../../page/AuthContext";
import TitleMedium from '../../component/title-medium';
import TitleSmall from '../../component/title-small';
import Input from '../../component/input';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//====================================================

export default function Component () {
    const [value, setValue] = useState(0);

    const { state } = useAuth();
    const navigate = useNavigate();

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

    const handleSubmitStripe = async () => {
        try {
            const signUpResponse = await fetch('http://localhost:4000/receive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: value,
                    paymentSystem: 'Stripe',
                })
            });

            const data = await signUpResponse.json();

            // console.log("pageReceive Data: ", data);

            if(signUpResponse.ok) {
                navigate(`/balance/${state.user.id}`);
            }

        } catch (er) {
            console.error('Помилка завантаження:', er);
        };
    };

    const handleSubmitCoinbase = async () => {
        try {
            const signUpResponse = await fetch('http://localhost:4000/receive', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    value: value,
                    paymentSystem: 'Coinbase',
                })
            });

            const data = await signUpResponse.json();

            if(signUpResponse.ok) {
                navigate(`/balance/${state.user.id}`);
            }

        } catch (er) {
            console.error('Помилка завантаження:', er);
        };
    };

    return (
        <Page>
            <BackButton />
            <TitleMedium name="Receive" />
            <div className='padding'>
                <TitleSmall name='Receive amount' />
                <Input
                    onKeyDown={handleKeyDown}
                    onChange={handleChange}
                />
                <span className='for__input'>$</span>
                <div className='line'></div>
                <TitleSmall name='Payment system' />
                
                <div className='box'>
                    <div onClick={handleSubmitStripe} className='card'>
            
                        <div className="card__rightside">
                            <span className="card__icon1"></span>
                            <div className="card__info">
                                <div className="card__name">Stripe</div>
                    
                            </div>
                        </div>

                        <div className="box__ofIcons1"></div>
                    </div>

                    <div onClick={handleSubmitCoinbase} className='card'>
                
                        <div className="card__rightside">
                            <span className="card__icon2"></span>
                            <div className="card__info">
                                <div className="card__name">Coinbase</div>
                                
                            </div>
                        </div>

                        <div className="box__ofIcons2"></div>
                    </div>
                </div>

            </div>
        </Page>
    );
};