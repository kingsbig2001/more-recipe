function aritGeo(arr){
  if(!arr){
    return -1;
  }
  //check if arguement parsed is an array
  if(!Array.isArray(arr)){
    return -1;
  }
  //check for empty array
  if(arr.length < 1){
  return 0;
  }
  //make sure array has
  else if(arr.length > 2 ){
    const diff = arr[2] -arr[1];
    
    for(let i = 0; i < arr.length; i++){
      //make sure only numbers are in array
      console.log(arr[i]);
      if(typeof arr[i] !== 'number'){
      return -1;
      }
  
      else if(Math.pow(arr[1], 2) === arr[0]*arr[2]){
       return 'Geometric';
       }
      else if(arr[i] === (arr[1] + ((i -1) * diff))){
       return 'Arithmethic';
       } // {a[n]=a[1]+(n-1)d},
    else{
     return -1;
   }
    }
  
}
}
module.exports = aritGeo;