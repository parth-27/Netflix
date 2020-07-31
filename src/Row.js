import React, { useState, useEffect } from 'react';

import axios from './axios';    // default import from our file axios.



function Row({ title,fetchUrl }) {
    
    // using react hooks.
    const [movies, setMovies] = useState([]);

    // pulling the information from api when the row loads.
    useEffect(() => {
        // if [](empty array) run once when the row loads and don't run it again.
        async function fetchData() {
            // the value of request will be https://api.themoviedb.org/3/fetchUrl
            const request = await axios.get(fetchUrl);
            console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();

        // when we use any variable in async which is outside of the block we have to include it in the brackets.
    }, [fetchUrl]);
    

    console.log(movies);


    return (
        <div>
            {/* title */}
            <h2>{title}</h2>

            {/* container -> posters */}
        </div>
    )
}

export default Row
