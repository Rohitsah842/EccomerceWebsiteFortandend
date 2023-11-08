import React from 'react'
import style from './Input.css'

function Input({ id, type, placeholder, value, onChange, onBlur, title, warningMessage, hasError }) {
    return (
        <>
            <div class="form-group">
                <label for={id}>{title
                }</label>
                <input type={type}
                    className={`form-control ${hasError && 'error_class'}`}
                    id={id}
                    aria-describedby="emailHelp"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur} />
                {hasError && <p style={{ color: "red" }}>{warningMessage}</p>}
            </div>
        </>
    )
}
// Input.propTypes = {
//     value: PropTypes.string,
//     label: PropTypes.string,
//     placeholder: PropTypes.string,
//     type: PropTypes.string,
//     warningMessage: propTypes.string,
//     onChange: PropTypes.func.isRequired,
//     onBlur: propTypes.func.isRequired
// };

// Input.defaultProps = {
//     type: 'text',
//     value: '',
//     label: '',
//     placeholder: '',
//     warningMessage: '',

// };

export default Input
