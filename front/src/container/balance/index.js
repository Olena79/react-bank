import './index.css';
import Page from "../../component/page";
import Card from "../../component/card";
import { useAuth } from "../../page/AuthContext";

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//==================================

export default function Component () {
    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const balanceResponce = await fetch('http://localhost:4000/balance', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    })
                });
    
                const data = await balanceResponce.json();
                setBalance(data.balance);
                setTransactions(data.transactions)
            } catch(er){
                console.error(er);
            }
        };
        fetchData();
    }, []);

    const { state } = useAuth();
    const navigate = useNavigate();

    const handleReseive = () => {
        navigate(`/receive/${state.user.id}`)
    };

    const handleSend = () => {
        navigate(`/send/${state.user.id}`)
    };

    const handleNotifications = () => {
        navigate(`/notifications/${state.user.id}`)
    };

    const handleSettings = () => {
        navigate(`/settings/${state.user.id}`)
    };

    const handleCard = (transactionId) => {
        navigate(`/transaction/${transactionId}`);
    };

    const currentBalance = Number(balance).toFixed(2);

    return (
        <div>
            <Page>
                <div className='fon'></div>

                <div className='fon__header'>
                    <button onClick={handleSettings} className='fon__settings'></button>
                    <h3 className='fon__title'>Main wallet</h3>
                    <button onClick={handleNotifications} className='fon__notifications'></button>
                </div>

                <h1 className='main__title'>{currentBalance}</h1>

                <div className='fon__buttons'>
                    <div className='each__button'>
                        <button onClick={handleReseive} className='fon__receive'></button>
                        <span className='fon__button-span'>Receive</span>
                    </div>
                    <div className='each__button'>
                        <button onClick={handleSend} className='fon__send'></button>
                        <span className='fon__button-span'>Send</span>
                    </div>
                </div>

                <div className='cards'>
                    {transactions.map((transaction) => (
                        <Card 
                            key={transaction.id} 
                            transaction={transaction}
                            money={transaction.sum}
                            name={transaction.paymentSystem}
                            transType={transaction.transType}
                            time={transaction.time}
                            onClick={handleCard}
                        />
                    )).reverse()}
                </div>
            </Page>
        </div>
    );
}