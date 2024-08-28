import React, { useEffect, useReducer } from 'react'
import { todoReducer } from '../todoReducer';

const initialState = []

/**
 * Aqui se va a leer el localStorage para obtener los todos guardados en el navegador
 */
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    // El useReducer lo usamos para manejar el estado de los TODOS
    // es decir aqui es donde tenemos alojado el state
    const [todos, dispatch] = useReducer( todoReducer, initialState, init );

    // Este useEffect lo utilizamos para guardar los TODOS en el localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])

    // AÑADIR TAREA
    // Este handleTodo es el que se va a encargar de agregar un nuevo TODO
    const handleNewTodo = (newTodo) => {
        // console.log({newTodo})

        const action = {
            type: 'Add Todo',
            payload: newTodo
        }
        dispatch(action);
    }

    // BORRAR TAREA
    const handleDeleteTodo = (todoId) => {
        // console.log(todoId)

        // Se puede usar esta sintaxis directamente en lugar de hacer el action y luego llamar al dispatch
        dispatch({
            type: 'Delete Todo',
            payload: todoId
        })
    }

    // MODIFICAR TAREA A COMPLETADO O PENDIENTE
    const handleModifyTodo = (todo) => {
        // console.log(todo)

        // Se puede usar esta sintaxis directamente en lugar de hacer el action y luego llamar al dispatch
        dispatch({
            type: 'Modify Todo',
            payload: todo
        })
    }

    const todoCount = () => {
        return todos.length
    }

    const todoCountPending = () => {
        return todos.filter(todo => !todo.done).length
    }


    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleModifyTodo,
        todoCount,
        todoCountPending
    }
}
