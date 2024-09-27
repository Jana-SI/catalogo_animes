import "./Input.css";

const Input = ({ type, ...props }) => {
  const id = `floatingInput-${props.name}`
  return (
    <>
      {type === "textarea" ? (
        <>
          <textarea
            className="form-control"
            id="floatingTextarea"
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder=" "
          ></textarea>
          <label htmlFor="floatingTextarea">{props.label}</label>
        </>
      ) : (
        <>
          <input
            className="form-control"
            id={id}
            type={type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder=" "
          />
          <label htmlFor={id}>{props.label}</label>
        </>
      )}
    </>
  );
};

export default Input;
