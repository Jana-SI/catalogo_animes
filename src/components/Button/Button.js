import './Button.css';

const Button = ({onClick, children, ...props}) => {
    return (
        <button className={props.className} onClick={onClick}>{children}</button>
    )
}

export default Button;