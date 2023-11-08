import React, { useState, useEffect } from 'react'


export const useInput = (validateValue) => {
    const [value, setValue] = useState("");
    const [isVisited, setIsVisited] = useState(false);

    let valueIsValid = validateValue(value);
    let hasError = !valueIsValid && isVisited;


    const valueChangeHandler = (event) => {
        setValue(event.target.value);
        valueIsValid = validateValue(event.target.value);
    }

    const blurHandler = () => {
        setIsVisited(true);
    }

    const reset = () => {
        setValue('');
        setIsVisited(false)
    }

    return {
        value: value,
        isValid: valueIsValid,
        hasError,
        valueChangeHandler,
        blurHandler,
        reset
    };
};


