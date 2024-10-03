import './Cardstyle.css'

function Card({movie}){

    return(
        <>
        <div className="mainDiv">
            <div className="movie-result">
                <img src={movie.Poster} alt='Movie Poster'></img>
                <h2>{movie.Title}</h2>
                <h2>Year:{movie.Year}</h2>
            </div>
        </div>
        </>
    )
}

export default Card;