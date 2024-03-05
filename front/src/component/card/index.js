import "./index.css";

export default function Component ({ 
    transaction, 
    name, 
    time, 
    transType, 
    money,
    onClick,
 }) {

    let icon;
    if (name === 'Stripe') {
        icon = <img src="/svg/stripe-icon.svg" alt="S" className="card__icon" />;
    } else if (name === 'Coinbase') {
        icon = <img src="/svg/coinbase-icon.svg" alt="C" className="card__icon" />;
    } else if (name === 'Email') {
        icon = <img src="/svg/person-icon.svg" alt="E" className="card__icon" />;
    } else {
        icon = <img src="#" alt="Default" className="card__icon" />;
    }

    let moneyDisplay = money;
    let moneyColor = '';
    if (transaction.type === 'increment') {
        moneyDisplay = `+$${money}`;
        moneyColor = '#24B277';
    } else if (transaction.type === 'decrement') {
        moneyDisplay = `-$${money}`;
        moneyColor = 'black';
    }

    return (
            <button 
                transaction={transaction}
                className='card'
                onClick={() => onClick(transaction.id)}>
                
                    <div className="card__rightside">
                        {icon}
                        <div className="card__info">
                            <div className="card__name">{name}</div>
                            <div className="card__footer">
                                <span className="card__time">{time}</span>
                                <span className="card__point"></span>
                                <span className="card__time">{transType}</span>
                            </div>
                        </div>
                    </div>

                    <div style={{ color: moneyColor }} className="card__money">{moneyDisplay}</div>
            
            </button>
    );
}
