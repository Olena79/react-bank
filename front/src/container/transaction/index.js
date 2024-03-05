import './index.css';
import Page from "../../component/page";
import BackButton from "../../component/back-button";
import TitleMedium from '../../component/title-medium';


import { useState, useEffect } from 'react';
import { useParams  } from 'react-router-dom';

//====================================================

export default function Component () {
    const [transaction, setTransaction] = useState(null);
    const { transactionId } = useParams();

    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const response = await fetch(`http://localhost:4000/transaction/${transactionId}`);
                if (response.ok) {
                    const { transaction } = await response.json();
                    setTransaction(transaction);
                } else {
                    console.error('Failed to fetch transaction data');
                }
            } catch (error) {
                console.error('Error fetching transaction data:', error);
            }
        };

        fetchTransaction();
    }, [transactionId]);

    let money = '';
    let moneyColor = '';

    if (transaction === null) {
        return (
            <Page>
                <BackButton />
                <TitleMedium name="Transaction" />
                <div className='loading'>Loading...</div>
            </Page>
        );
    }

    if(transaction !== null) {
        money = transaction.sum;

        if (transaction.type === 'increment') {
            money = `+$${money}`;
            moneyColor = '#24B277';
        } else if (transaction.type === 'decrement') {
            money = `-$${money}`;
            moneyColor = 'black';
        }
    }   

    return (
        <Page>
            <BackButton />
            <TitleMedium name="Transaction" />
            <div className='padding'>
                {transaction !== null && (
                    <>
                        <h1 style={{ color: moneyColor }} className='trans__sum'>
                            {money}
                        </h1>

                        <section className='section'>
                            <div className='section__single'>
                                <span>Date</span>
                                <span>{transaction.date}/ {transaction.time}</span>
                            </div>
                            <div className='section__single'>
                                <span>Address</span>
                                <span>{transaction.paymentSystem}</span>
                            </div>
                            <div className='section__single'>
                                <span>Type</span>
                                <span>{transaction.transType}</span>
                            </div>
                        </section>
                    </>
                )}
            </div>
        </Page>
    );
};