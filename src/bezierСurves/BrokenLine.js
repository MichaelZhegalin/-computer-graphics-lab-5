import {circle} from "../geometry/Сircle";

export const brokenLine = (context, coordinateArr, color = "black") => {
    context.beginPath();
    if(color == "blue"){
        context.strokeStyle = color
        context.moveTo(coordinateArr[0].y * 10, coordinateArr[0].x * 10)
        context.lineTo(coordinateArr[1].y * 10, coordinateArr[1].x * 10)
        context.stroke();
    }
    context.strokeStyle = color
    context.moveTo(coordinateArr[0][1] * 10, coordinateArr[0][0] * 10)
    context.lineTo(coordinateArr[1][1] * 10, coordinateArr[1][0] * 10)
    context.stroke();

    // for(let i = 0; i < coordinateArr.length; i++){
    //     circle(context, coordinateArr[i].xCoordinate, coordinateArr[i].yCoordinate, 0.5, 'orange')
    // }

}