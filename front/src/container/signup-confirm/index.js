import "./index.css";
import Page from "../../component/page";
import Title from "../../component/title-big";
import Button from "../../component/button";
import BackButton from "../../component/back-button";
import FieldCode from '../../component/field-code';
import { useAuth } from '../../page/AuthContext';

import { useState, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';

//==========================================================

export default function Component () {
    const { state, dispatch } = useAuth();
    const [receivedCode, setReceivedCode] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleResendCode = async () => {
        try {
            setLoading(true)
            const res = await fetch('http://localhost:4000/signup-confirm-new-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: state.user.email,
            }),
          });
      
          if (res.ok) {
            const data = await res.json();
            setConfirmationCode(data.confirmationCode);
            alert('Новий код підтвердження відправлено');
          } else {
            const errorData = await res.json();
            alert(errorData.message);
          }
        } catch (error) {
          console.error('Помилка при відправленні запиту на створення нового коду підтвердження:', error);
        }
        finally {
            setLoading(false); // Позначаємо завершення процесу завантаження
        }
      };

    useEffect(() => {
        const handleCode = async () => {
            try{

            const confirmRes = await fetch('http://localhost:4000/signup-confirm-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: state.user.email,
                })
            });

            const data = await confirmRes.json();

            setConfirmationCode(data.confirmationCode);

            }catch (er) {
                console.error('Помилка завантаження:', er);
            }
        }
        handleCode();

    }, [state.user.email]);

    const handleCodeChange = (value) => {
        setReceivedCode(value);
    };

    const handleSubmit = async () => {
        try {
            if(Number(receivedCode) === Number(confirmationCode)) {
                const signUpResponse = await fetch('http://localhost:4000/signup-confirm', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        confirmationCode: confirmationCode
                    })
                });

                const signUpData = await signUpResponse.json();

                if (signUpResponse.ok) {
                    dispatch({ type: 'LOGIN', token: signUpData.session.token, user: signUpData.session.user });
                    
                    navigate(`/balance/${state.user.id}`);
                }
            } else {
                alert('Невірний код');
            }
        } catch (er){
            console.error('Помилка завантаження:', er);
        }
    };

    const isButtonActive = receivedCode.length === 6;

    return (
        <Page>
            <BackButton />
            <Title title={"Confirm account"} paragraph={"Write the code you received"} />
            <div className="box">
                <FieldCode
                    label={"Code"}
                    placeholder={"example: 123456"}
                    error_text="Помилка, код не вірний"
                    style={{ border: "1px solid #775CE5"}}
                    value={receivedCode}
                    onChange={handleCodeChange}
                />
                    <Button 
                        text={"Continue"}
                        style={{ 
                            backgroundColor: "#775CE5", 
                            color: "white"
                        }}
                        condition={isButtonActive}
                        onClick={handleSubmit}
                    />
                    <button style={{ 
                        border: "1px solid #775CE5", 
                        color: "#775CE5",
                        borderRadius: "12px",
                        padding: '10px'
                    }}
                        onClick={handleResendCode}
                    >
                        Send code again
                    </button>
            </div>
            <span className="code">Code:   {confirmationCode}</span>
        </Page>
    );
}
