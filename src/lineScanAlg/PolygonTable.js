import {findPlaneCoefficient} from "./FindPlaneCoefficient";

export const polygonTable = (polygonsCoordinate, colorArr) =>{
    let pTable = []

    for(let i = 0; i < polygonsCoordinate.length; i++){
        pTable.push({
            polygonNum: i,
            color: colorArr[i],
            planeCoefficient: findPlaneCoefficient(polygonsCoordinate[i]),
        })
        for(let j = 0; j < polygonsCoordinate[i].length; j++){
            pTable[i]["point" + j] = polygonsCoordinate[i][j];
        }
    }

    return pTable;
}