import React, {Component} from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./common/pagination";
import {paginate} from "../util/paginate";
import ListGroup from "./common/listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "./moviesTable";
import _ from "lodash";

class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: 4 ,
        currentPage: 1,
        sortColumn: {path: "title", order: "asc"}
    }

    componentDidMount() {
        const genres = [{_id: "", name: "All Genres"}, ...getGenres()]
        this.setState({movies: getMovies(), genres})
    }

    handleGenres = (genre) => {
        this.setState({selectedGenres: genre, currentPage: 1}) 
    }


    handleDelete = (m) => {
      const movies = this.state.movies.filter(movie => movie._id !== m._id);
      this.setState({movies});     
    }

    handleLike = (m) => {
        const movies = [...this.state.movies];
        const index = movies.indexOf(m);
        movies[index] = {...movies[index]};
        movies[index].liked = !movies[index].liked;
        this.setState({movies});
    };

    handlePageChange = (page) => {
        this.setState({currentPage: page});
    }

    handleSort = sortColumn => {
       
        this.setState({sortColumn})
    }

    getPagedData = () => {
        const {
            currentPage, 
            pageSize, 
            selectedGenres, 
            sortColumn, 
            movies: allMovies
        } = this.state;


        const filtered = selectedGenres && selectedGenres._id ? allMovies.filter(m => m.genre._id === selectedGenres._id) : allMovies;
        
        const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
        
        const movies = paginate(sorted, currentPage, pageSize);

        return {totalCount: filtered.length, data: movies}
    }

    render() {
        const count = this.state.movies.length;
        const {
            currentPage, 
            pageSize, 
            selectedGenres, 
            sortColumn, 
        } = this.state;

        if (count === 0) {return <p>There are no movies in the database.</p>};
        
        const {totalCount, data: movies} = this.getPagedData();


        return (<div className="row">
           <div className="col-2">
              <ListGroup 
                 items={this.state.genres} 
                 onItemSelect={this.handleGenres}
                 selectedItem={selectedGenres}
              />
            </div>
           <div className="col">    
             <p>Showing {totalCount} movies in the database.</p>   
             <MoviesTable 
                movies={movies} 
                sortColumn={sortColumn}
                onDelete={this.handleDelete} 
                onLike={this.handleLike}
                onSort={this.handleSort}

             /> 
             <Pagination 
                itemCount={totalCount} 
                currentPage={currentPage} 
                pageSize={pageSize} 
                onPageChange={this.handlePageChange}

             />
         </div>
        </div>
        );
    }

}

export default Movies;
