
import { useEffect, useState } from 'react';
import './Moviestyle.css'
import Card from './Card'

function Movielist(){

    const[search,setSearch]=useState("");
    const[movies,setMovies]=useState([]);
    const[query,setQuery]=useState("");
    const[language,setLanguage]=useState("");
    const[genre,setGenre]=useState("");

    function handleSearch(e){
        e.preventDefault();
        setQuery(search);
    }

    useEffect(()=>{
        if(query!==""){
            fetch(`http://www.omdbapi.com/?s=${search}&apikey=200d2e40`)
            .then(res=>res.json())
            .then(data=>{
                if(data.Search){
                    let filteredMovies=data.Search;
                    if(genre){
                        filteredMovies=filteredMovies.filter(movie=>(
                            movie.Genre && movie.Genre.toLowerCase().includes(genre.toLowerCase())
                        ));
                    }
                    if(language){
                        filteredMovies=filteredMovies.filter(movie=>(
                            movie.Language && movie.Language.toLowerCase().includes(language.toLowerCase())
                        ))
                    }
                    setMovies(filteredMovies)
                }
                else{
                    setMovies([])
                }
            })
            .catch(err=>{
                console.log('Error');
            })
        }
    },[query]);

    return(
        <>
            <div className="main">
                <header>
                    Movie Search Application
                </header>
                <div className="search-div">
                    <input type="text" placeholder="Search for the Movies"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}></input>
                </div>
                <div className='genre'>
                    <label>Genre</label>
                    <select value={genre} onChange={(e)=>setGenre(e.target.value)}>
                    <option value="">All</option>
                        <option value="Action">Action</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Drama">Drama</option>
                        <option value="Horror">Horror</option>
                        <option value="Romance">Romance</option>
                    </select>
                </div>
                <div className='language'>
                    <label>Language</label>
                    <select value={language} onChange={(e)=>setLanguage(e.target.value)}>
                    <option value="">All</option>
                        <option value="English">English</option>
                        <option value="French">French</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </div>
                <div className="search-btn">
                    <button className="btn" onClick={handleSearch}>Search</button>
                </div>
                <div className='render'>
                    {movies.length>0 ?(
                        movies.map(movie=>(
                            <Card key={movie.imdbID} movie={movie} />
                        ))
                    ):(
                        <p>No Movies Found</p>
                    )}
                </div>
            </div>
        </>
    )
}

export default Movielist;