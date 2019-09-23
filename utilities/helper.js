class Helper {
  constructor(){}
  
  sortObjects(objectsArray, comparatorFunction){
    const oThis = this;
    
    oThis.quickSort(objectsArray, 0 , objectsArray.length - 1, comparatorFunction);
  }
  
  quickSort(objectsArray, startingIndex, endingIndex, comparatorFunction){
    const oThis = this;
    if(startingIndex == endingIndex || startingIndex > endingIndex){
      return;
    }
    let pivot = Math.floor((startingIndex + endingIndex) / 2);
  
    let i = startingIndex,
      j = pivot+1;
    while(i <= pivot){
      if(comparatorFunction(objectsArray[i], objectsArray[pivot])){
        while(j <= endingIndex){
          if(comparatorFunction(objectsArray[pivot], objectsArray[j])){
            oThis.swap(objectsArray, i, j);
            break;
          }
          j++;
        }
      }
      i++
    }
  
    while(i <= pivot){
      if(comparatorFunction(objectsArray[i], objectsArray[pivot])){
        let temp = objectsArray[i];
        for(let index = i ; index < pivot ;index){
          objectsArray[index] = objectsArray[index + 1];
        }
        objectsArray[pivot] = temp;
        pivot--;
      }
      i++;
    }
  
    while(j <= endingIndex){
      if(comparatorFunction(objectsArray[pivot], objectsArray[j])){
        let temp = objectsArray[j];
        for(let index = j ; index > pivot ;index--){
          objectsArray[index] = objectsArray[index - 1];
        }
        objectsArray[pivot] = temp;
        pivot++;
      }
      j++;
    }
  
    oThis.quickSort(objectsArray,i,pivot-1, comparatorFunction);
    oThis.quickSort(objectsArray,pivot+1,objectsArray.length - 1, comparatorFunction);
  }
  
  swap(objectsArray, index1, index2){
    let temp = objectsArray[index1];
    objectsArray[index1] = objectsArray[index2];
    objectsArray[index2] = temp;
  }
}

module.exports = new Helper();