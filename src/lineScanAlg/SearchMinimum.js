export const searchMinimum = (numOne, numTwo, yArr) => {
    if(numOne <= numTwo){
        if(numOne === yArr[0]){
            return 0
        }else{
            return 1
        }
    }else{
        if(numTwo === yArr[0]){
            return 0
        }else{
            return 1
        }
    }
}