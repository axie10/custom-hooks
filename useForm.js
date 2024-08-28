import { useState } from "react";


export const useForm = ( inicialForm = {} ) => {

    const [formState, setFormState] = useState(inicialForm);

    const handleOnChange = ({ target }) => {

        const { name, value } = target;
        // console.log({ name, value})
        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleOnDelete = () => {
        setFormState({
            ...inicialForm
        })
        // console.log(formState)
    }

    return {
        ...formState,
        handleOnChange,
        handleOnDelete,
    }
}
