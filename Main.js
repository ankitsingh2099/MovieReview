const rootPrefix = '.',
  User = require(rootPrefix + '/app/models/User'),
  Movie = require(rootPrefix + '/app/models/Movie'),
  UserMovieReview = require(rootPrefix + '/app/models/UserMovieReview'),
  helper = require(rootPrefix + '/utilities/helper');

const CURRENT_YEAR = 2019;

class Main{
  constructor(){
    const oThis = this;
    
    oThis.users = {};
    oThis.movies = {};
    oThis.userMovieReviews = {};
    oThis.movieReviews = {};
  }
  
  perform() {
    const oThis = this;
    
    oThis.addUser('SRK');
    oThis.addUser('Salman');
    oThis.addUser('Deepika');
    
    oThis.addMovie('DON',2006,['Action','Comedy']);
    oThis.addMovie('Tiger',2008,['Drama']);
    oThis.addMovie('Padmaavat',2006,['Comedy']);
    oThis.addMovie('Lunchbox',2020,['Drama']);
    oThis.addMovie('Guru',2006,['Drama']);
    oThis.addMovie('Metro',2006,['Romance']);
    
    oThis.addReview('SRK', 'DON', 2);
    oThis.addReview('SRK', 'Padmaavat', 8);
    oThis.addReview('Salman', 'DON', 5);
    oThis.addReview('Deepika', 'DON', 9);
    oThis.addReview('Deepika', 'Guru', 6);
    //oThis.addReview('SRK', 'DON', 10);
    //oThis.addReview('Deepika', 'Lunchbox', 5);
    oThis.addReview('SRK', 'Tiger', 5);
    oThis.addReview('SRK', 'Metro', 7);
    
    oThis.listTopNMoviesByYear(1, 'viewer', 2006);
    oThis.listTopNMoviesByGenre(1, 'viewer', 'Romance');
    
    //oThis.printCompleteState();
  }
  
  /**
   * Print complete state
   */
  printCompleteState() {
    const oThis = this;
    
    console.log('\n\n--Users--',oThis.users);
    console.log('\n\n--Movies--', oThis.movies);
  }
  
  /**
   * Add User
   *
   * @param userName
   */
  addUser(userName) {
    const oThis = this;
    if(oThis.users[userName]){
      throw "UserName already used";
    }
    oThis.users[userName] = new User({name: userName});
  }
  
  /**
   * Add Movie
   *
   * @param movieName
   * @param releaseYear
   * @param genres
   */
  addMovie(movieName, releaseYear, genres){
    const oThis = this;
    if(oThis.movies[movieName]){
      throw "Movie already exists"
    }
    oThis.movies[movieName] = new Movie({name: movieName, year: releaseYear, genres: genres});
  }
  
  /**
   * Add Review
   *
   * @param userName
   * @param movieName
   * @param rating
   */
  addReview(userName, movieName, rating){
    const oThis = this;
    
    let userMovieName = userName + '.' + movieName;
    if(oThis.userMovieReviews[userMovieName]){
      throw "Movie already rated by user " + `${userMovieName}`;
    }
    
    if(!oThis.users[userName]){
      throw "Invalid User";
    }
    
    if(!oThis.movies[movieName]){
      throw 'Invalid Movie Name';
    }
    
    if(oThis.movies[movieName].year > CURRENT_YEAR){
      throw 'Not allowed to review unreleased movie.';
    }
    
    let newUserMovieReview = new UserMovieReview({
      userName: userName,
      movieName: movieName,
      rating:rating,
      userType: oThis.users[userName].type
    });
    oThis.users[userName].incrementRatingCount();
  
    oThis.userMovieReviews[userMovieName] = newUserMovieReview;
    
    oThis.movies[movieName].addRatings(rating, oThis.users[userName].type);
  }
  
  /**
   * List top n movies by year.
   *
   * @param num
   * @param userType
   * @param year
   */
  listTopNMoviesByYear(num, userType, year){
    const oThis = this;
    
    let filteredMovies = {},
      topNMoviesArray = [];
    
    for(let movie in oThis.movies){
      if(oThis.movies[movie].year == year){
        filteredMovies[movie] = oThis.movies[movie];
      }
    }
    
    if(userType == 'viewer'){
      topNMoviesArray = oThis.sortMovieByViewer(filteredMovies);
    } else if(userType == 'critic'){
      topNMoviesArray = oThis.sortMovieByCritic(filteredMovies);
    }
    console.log('\n--topNMoviesByYear---\n',topNMoviesArray);
  }
  
  /**
   * List top n movies by genre.
   *
   * @param num
   * @param userType
   * @param genre
   */
  listTopNMoviesByGenre(num, userType, genre) {
    const oThis = this;
  
    let filteredMovies = {},
      topNMovies = {};
  
    for(let movie in oThis.movies){
      if(oThis.movies[movie].genres.includes(genre)){
        filteredMovies[movie] = oThis.movies[movie];
      }
    }
  
    if(userType == 'viewer'){
      topNMovies = oThis.sortMovieByViewer(filteredMovies);
    } else if(userType == 'critic'){
      topNMovies = oThis.sortMovieByCritic(filteredMovies);
    }
    
    console.log('\n--topNMoviesByGenre---\n',topNMovies);
  }
  
  /**
   * Sort movie by viewer ratings.
   *
   * @param movies
   * @returns {unknown[]}
   */
  sortMovieByViewer(movies){
    const oThis = this;
    let moviesArray = Object.values(movies);
  
    helper.sortObjects(moviesArray, oThis.compareViewerRating);
    
    return moviesArray;
  }
  
  /**
   * Sort movie by critic ratings.
   *
   * @param movies
   * @returns {unknown[]}
   */
  sortMovieByCritic(movies){
    const oThis = this;
    let moviesArray = Object.values(movies);
  
    helper.sortObjects(moviesArray, oThis.compareCriticRating);
  
    return moviesArray;
  }
  
  /**
   * Compare viewer rating
   *
   * @param movie1
   * @param movie2
   * @returns {boolean}
   */
  compareViewerRating(movie1, movie2){
    return movie1.viewerRating < movie2.viewerRating ? true : false
  }
  
  /**
   * Compare critic rating
   *
   * @param movie1
   * @param movie2
   * @returns {boolean}
   */
  compareCriticRating(movie1, movie2){
    return movie1.criticRating < movie2.criticRating ? true : false
  }
}
new Main().perform();