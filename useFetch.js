import { useEffect, useState } from "react"


const localCache = {};

export const useFetch = ( url ) => {

    const [allPokemon, setAllPokemon] = useState([])

    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null,
        hasError: false
    })

    useEffect(() => {
        fetchData();
        // fetchAllPokemon();
    },[url])

    const setloadingState = () => {
        setState({
            data: null,
            loading: true,
            error: null,
            hasError: false
    })}

    const fetchAllPokemon = async () => {

        const resp2 = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
        const data2 = await resp2.json();
        // setAllPokemon(data2.results)
    }

    const fetchData = async () => {

        /** Verificar si los datos estan en el cache, si estan se guardan 
        en el estado y no continua con la peticion */
        if( localCache[url] ) {
            console.log('Datos desde el cache')
            setState({
                data: localCache[url],
                loading: false,
                error: null,
                hasError: false
            })
            return;
        }

        // Funcion para resetear el estado
        setloadingState();

        // Hacemos la petición
        const resp = await fetch(url);
        // console.log(url)

        // sleep, para simular un tiempo de carga
        await new Promise(resolve => setTimeout(resolve, 600));

        // Verificar si la petición fue exitosa
        if(!resp.ok) {
            setState({
                data: null,
                loading: false,
                error: {
                    status: resp.status,
                    statusText: resp.statusText
                },
                hasError: true
            })
            return;
        }
        // Si la petición fue exitosa, obtenemos los datos
        const data = await resp.json();
        // Cambiamos el estado
        setState({
            data: data,
            loading: false,
            error: null,
            hasError: false
        })

        // Manejo del cache, guardar los datos en el cache
        localCache[url] = data;
    }

    return {
        data: state.data,
        loading: state.loading,
        error: state.error,
        hasError: state.hasError,
        allPokemon,
        fetchData
    }
}

