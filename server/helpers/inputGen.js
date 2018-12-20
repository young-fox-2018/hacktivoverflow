module.exports ={
    inputGen: function(input){
        for(key in input){
            if(input[key] === null || input[key] === undefined){
                delete input[key]
            }
        }
        return input
    }
}