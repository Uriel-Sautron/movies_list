const API = "https://www.omdbapi.com/?apikey=e5f20042&"
const show = document.getElementById("movie");


const showMovies = (poster, title, released, movieId) => {

    show.innerHTML += `
      <div id="movie-item" class="show-movie">
      <img class="poster" src=${poster} onclick="fetchMovieMore('${movieId}')">
          <h2>${title}</h2>
          <p>${released} </p>
      </div>
  `
}

const showMovieModal = (poster, title, released, plot) => {
    const showModal = document.getElementById("modal");
    const modal = document.getElementById("modal");
    showModal.innerHTML = ""
    modal.classList.remove("hidden");
    showModal.innerHTML += `
    <div class="modal-content">
    <span class="close">&times;</span>
      <img src=${poster}>
          <h2>${title}</h2>
          <p>${released} </p>
          <p>${plot} </p>
      </div>
  `
    document.addEventListener("click", () => {
        modal.classList.add("hidden");
    })
}

const fetchMovies = (movieName) => {
    let movieCleaned = movieName.replace(/\s/g, "+");
    fetch(API + "s=" + movieCleaned)
        .then(response => response.json())
        .then(response => {
            let movies = response.Search
            show.innerHTML = ""

            movies.forEach(movie => {
                const poster = movie.Poster;
                const title = movie.Title;
                const released = movie.Year;
                const movieId = movie.imdbID
                showMovies(poster, title, released, movieId)
            });
        })
        .then(() => {
            let observer = new IntersectionObserver(observables => {
                observables.forEach(observable => {
                    if (observable.intersectionRatio > 0.5) {
                        observable.target.classList.remove("invisible")
                        observer.unobserve(observable.target);
                    }
                })
            }, {
                threshold: [0.5]
            })

            let items = document.querySelectorAll("#movie-item")
            items.forEach(item => {
                item.classList.add('invisible')
                observer.observe(item)
            })
        })
        .catch(error => {
            console.log(error);
        })



}

const fetchMovieMore = (movieId) => {
    fetch(API + "i=" + movieId.toString())
        .then(response => response.json())
        .then(movie => {

            const poster = movie.Poster;
            const title = movie.Title;
            const released = movie.Released;
            const plot = movie.Plot;
            showMovieModal(poster, title, released, plot)
        })
        .catch(error => {
            console.log(error);
        })
}