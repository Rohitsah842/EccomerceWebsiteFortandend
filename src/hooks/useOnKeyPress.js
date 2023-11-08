import { useEffect } from "react";

export const useOnKeyPress = (callBack, targetKey) => {

    useEffect(() => {

        const keyPressHandler = (event) => {
            if (event.key === targetKey) {
                callBack();
            }
        }

        window.addEventListener('keypress', keyPressHandler);
        return () => {
            window.removeEventListener('keypress', keyPressHandler);
        }
    }, [callBack, targetKey])
}