console.log('contains supporting function');
//what ever we write here the calling call wont get them directly 
//we need to add the var,fun in module.export so that they are assessible outside
//module.expoert is written in end of the file
var age = 24;

/*function addNumb(a,b){
    return a+b;
}*/

module.exports = {
    age,
    addNumb(a,b){
        return a+b;
    }
    //we can declare the function inline aslo or externally
}