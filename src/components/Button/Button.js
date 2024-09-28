import './Button.css';

// Define o componente Button, que aceita uma função onClick, children e props
const Button = ({ onClick, children, ...props }) => {
    return (
        <button className={props.className} onClick={onClick}>
            {children} 
        </button>
    )
}

export default Button;