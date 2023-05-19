export const tiltAngleSearch = (yMax, yMin, xMax, xMin, startPoint) => {
    let tg;
    if(yMax !== yMin ){
        tg = (xMax - xMin)/(yMax - yMin)
    }else{
        tg = 0
    }


    if((startPoint[0] === xMin && startPoint[1] === yMin) || (startPoint[0] === xMax && startPoint[1] === yMax)){
        tg = -tg
    }

    return tg
}