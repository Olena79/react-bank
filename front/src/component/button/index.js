import './index.css';

export default function Component({ text, style, condition, onClick }) {

    return (
        <div 
            style={style} 
            className={`button ${condition ? 'active' : 'passive'}`} 
            onClick={condition ? onClick : null}
        >
            {text}
        </div>
    );
}
