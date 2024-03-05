import "./index.css";

export default function Component ({ 
    type, 
    name, 
    time, 
    id,
 }) {

    let icon;
        
    if(type === 'Announcement') {
        icon = <img src='/svg/notific-bell.svg' alt="bell" className='notific__icon' />
    } else if(type === 'Warning') {
        icon = <img src='/svg/notific-warn.svg' alt="warn" className='notific__icon' />
    } else {
        icon = <img src="#" alt="Default" className="notific__icon" />;
    }

    return (
            
        <div className='notific__block' key={id}>
            <span>{icon}</span>
            <div className='notific__info'>
                <span className='notific__name'>{name}</span>
                <div className='notific__type'>
                    <span>{time}</span>
                    <span className="notific__point"></span>
                    <span>{type}</span>
                </div>
                
            </div>
        </div>

    );
}
