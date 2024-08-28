import { useState } from "react"


export const useCounter = ( valorInicial = 10 ) => {

    const [counter, setCounter] = useState(valorInicial);

    const handleAdd = ( value = 1) => {
        // console.log(counter)
        setCounter(counter + value);
        // console.log(counter)
    }
    const handleLess = ( value = 1 ) => {
        if(counter === 0 || counter === 1) return;
        setCounter(counter - value);
    }

    const handleReset = () => {
        setCounter(valorInicial);
    }

    return {
        counter,
        handleAdd,
        handleLess,
        handleReset
    }


}
