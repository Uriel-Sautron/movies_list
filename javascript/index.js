const formSearch = document.querySelector("form");


formSearch.addEventListener("submit", (e) => {
    const movieSearch = document.getElementById("searchbar").value;
    e.preventDefault();
    fetchMovies(movieSearch)



})