const rootPrefix = "../..";

class UserMovieReview {
  constructor(params) {
    const oThis = this;
    
    oThis.userName = params.userName;
    oThis.movieName = params.movieName;
    oThis.ratings = params.ratings;
    oThis.userType = params.userType;
  }
}

module.exports = UserMovieReview;