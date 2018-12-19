module.exports=function(){
    let someDate = new Date();
    let numberOfDaysToAdd = 7;
    someDate.setDate(someDate.getDate() + numberOfDaysToAdd)
    let dd = someDate.getDate();
    let mm = someDate.getMonth() + 1;
    let y = someDate.getFullYear();
    let closed = dd + '/'+ mm + '/'+ y;
    
    return closed
}