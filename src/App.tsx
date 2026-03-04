
import { useState, useRef } from 'react'

interface Movie {
  title: string;
  year: number;
  genero: string;
  director: string;
  image: string;
}

function App() {
  const [movies] = useState<Movie[]>([
    { title: 'Spider-Man: No Way Home', year: 2021, genero: 'Acción, Fantasia', director: 'Jon Watts', image: 'https://www.mubis.es/media/articles/31403/305111/spider-man-no-way-home-vuelve-a-los-cines-con-escenas-ineditas-original.jpg' },
    {
      title: 'Barbie',
      year: 2023,
      genero: 'Comedia, Drama',
      director: 'Greta Gerwig',
      image: 'https://es.web.img2.acsta.net/pictures/23/07/20/11/29/5479684.jpg'
    },
    {
      title: 'Oppenheimer',
      year: 2023,
      genero: 'Biografía, Historia',
      director: 'Christopher Nolan',
      image: 'https://img2.elyerromenu.com/images/magna-multimedia/oppenheimer-2023/img.webp'
    },
    {
      title: 'Wonka',
      year: 2023,
      genero: 'Fantasía, Aventura',
      director: 'Paul King',
      image: 'https://pics.filmaffinity.com/Wonka-476523968-large.jpg'
    },
    {
      title: 'Ant-Man y la Avispa: Quantumania',
      year: 2023,
      genero: 'Superhéroes, Acción',
      director: 'Peyton Reed',
      image: 'https://sm.ign.com/t/ign_es/screenshot/default/imagen-2023-01-18-134415503_fa8w.1080.jpg'
    },
    { title: 'The Shawshank Redemption', year: 1994, genero: 'Drama', director: 'Frank Darabont', image: 'https://w0.peakpx.com/wallpaper/546/10/HD-wallpaper-shawshank-redemption-robbins.jpg' },
    {
      title: 'Guardianes de la Galaxia Vol. 3',
      year: 2023,
      genero: 'Ciencia Ficción, Acción',
      director: 'James Gunn',
      image: 'https://pics.filmaffinity.com/Guardianes_de_la_galaxia_Vol_3-734578362-large.jpg'
    },
    {
      title: 'Casa blanca',
      year: 1942,
      genero: 'Romance, Drama, Guerra',
      director: 'Michael Curtiz',
      image: 'https://play-lh.googleusercontent.com/dEWagoCb89gu98ZNV3JaykNXybT-4kAF_9zuXReYBEXa5XSa8g06BF9mPgW72pZcy4CaprVoPXcGqZp5auA=w240-h480-rw'
    },
    {
      title: 'El Padrino ',
      year: 1972,
      genero: 'Drama, Crimen',
      director: 'Francis Ford Coppola',
      image: 'https://www.deusnews.com/src/news/00/00/8B/9A/la-trilogia-el-padrino-por-primera-vez-en-4k-ultra-hd-por-sus-50-anos.jpg'
    },
    {
      title: 'Citizen Kane',
      year: 1941,
      genero: 'Drama',
      director: 'Orson Welles',
      image: 'https://i.pinimg.com/736x/fb/31/80/fb3180b87a94211e0e474ce20d06ad49.jpg'
    }
  ]);

  const [displayedMovies, setDisplayedMovies] = useState<Movie[]>(movies);
  const [activeView, setActiveView] = useState<'new' | 'old'>('new');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const newMovies = movies.filter(movie => movie.year >= 2021);
  const oldMovies = movies.filter(movie => movie.year < 2021);

  const showNewMovies = () => {
    setActiveView('new');
    setDisplayedMovies(newMovies);
  };

  const showOldMovies = () => {
    setActiveView('old');
    setDisplayedMovies(oldMovies);
  };

  const filterMovies = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (searchInputRef.current?.value || '').toLowerCase();
    const filteredMovies = movies.filter(movie =>
      Object.values(movie).some(value => value.toString().toLowerCase().includes(query))
    );
    setDisplayedMovies(filteredMovies);
  };

  return (
    <>
      <div className="title">
        <h1>69 CINE</h1>
      </div>
      <div className="content">
        <header>
          <h2><strong>Welcome to 69 CINE</strong></h2>
          <h3>69 CINE | ENTRADAS</h3>
          <aside>
            <form onSubmit={filterMovies}>
              <label htmlFor="search-input">Search:</label>
              <input 
                type="text" 
                id="search-input" 
                ref={searchInputRef}
                name="query" 
                placeholder='Nombre, Género, Director, Año...'
              />
              <button type='submit'>Search</button>
            </form>
          </aside>
        </header>

        <nav>
          <button onClick={showNewMovies}>New Movies</button>
          <button onClick={showOldMovies}>Old Movies</button>
        </nav>

        <div id="newMovies" style={{ display: activeView === 'new' ? 'grid' : 'none' }} className="movies-grid">
          {activeView === 'new' && displayedMovies.map((movie) => (
            <div key={movie.title} className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <h2><strong>{movie.title}</strong></h2>
              <p><strong>Género:</strong> {movie.genero}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Año:</strong> {movie.year}</p>
            </div>
          ))}
        </div>

        <div id="oldMovies" style={{ display: activeView === 'old' ? 'grid' : 'none' }} className="movies-grid">
          {activeView === 'old' && displayedMovies.map((movie) => (
            <div key={movie.title} className="movie-card">
              <img src={movie.image} alt={movie.title} />
              <h2><strong>{movie.title}</strong></h2>
              <p><strong>Género:</strong> {movie.genero}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Año:</strong> {movie.year}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
