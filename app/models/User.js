const rootPrefix = "../..";

class User {
  constructor(params) {
    const oThis = this;
    
    oThis.name = params.name;
    oThis.type = params.type || 'viewer';
    oThis.ratingsGiven = 0;
  }
  
  incrementRatingCount(){
    const oThis = this;
    oThis.ratingsGiven++;
    if(oThis.ratingsGiven > 3) {
      oThis.type = 'critic'
    }
  }
}

module.exports = User;