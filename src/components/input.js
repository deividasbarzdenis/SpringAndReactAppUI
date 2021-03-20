
const Input = (props) => {

    let inputClassname = 'form-control';

    if (props.hasError !== undefined){
        inputClassname += props.hasError ? ' is-invalid' : ' is-valid';
    }

    return (
        <div>
            {props.label && <label>{props.label}</label>}
            <input
                className={inputClassname}
                type={props.type || "text"}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.onChange}
            />
            {props.hasError && <span className="invalid-feedback">{props.error}</span>}
        </div>
    );
}

Input.defaultProps = {
    onChange: () => {

    }
}

export default Input;