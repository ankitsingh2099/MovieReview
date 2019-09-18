const rootPrefix = "../..";

class Movie {
  constructor(params) {
    const oThis = this;
    
    oThis.name = params.name;
    oThis.genres = params.genres;
    oThis.year = params.year;
    
    oThis.viewerRating = 0;
    oThis.criticRating = 0;
  }
  
  addRatings(rating, userType) {
    const oThis = this;
    if(userType == 'viewer'){
      oThis.viewerRating += rating
    } else if(userType == 'critic'){
      oThis.criticRating += rating;
    } else {
      throw "Invalid user type";
    }
  }
}

module.exports = Movie;