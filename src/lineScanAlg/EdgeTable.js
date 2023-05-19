import {searchMinimum} from "./SearchMinimum";
import {tiltAngleSearch} from "./TiltAngleSearch";

export const edgeTable = (polygonTable) => {
    let eTable = []
    let startPoint
    let endPoint
    let minY
    let maxY
    let xOnMinY
    let yArr
    let xArr

    for (let i = 0; i < polygonTable.length; i++){
        for(let j = 0; j < Object.keys(polygonTable[i]).length - 3; j++){

            if(j !== Object.keys(polygonTable[i]).length - 4){
                startPoint = polygonTable[i]["point" + j]
                endPoint = polygonTable[i]["point" + (j + 1)]
            }else{
                startPoint = polygonTable[i]["point" + j]
                endPoint = polygonTable[i]["point" + 0]
            }

            yArr = [startPoint[1], endPoint[1]]
            xArr = [startPoint[0], endPoint[0]]
            minY = yArr[searchMinimum(yArr[0], yArr[1], yArr)]
            maxY = yArr[1 - searchMinimum(yArr[0], yArr[1], yArr)]
            let minX = xArr[searchMinimum(xArr[0], xArr[1], xArr)]
            let maxX = xArr[1 - searchMinimum(xArr[0], xArr[1], xArr)]
            xOnMinY = xArr[searchMinimum(yArr[0], yArr[1], yArr)]

            eTable.push({
                rectangleParentNum: polygonTable[i].polygonNum,
                startPoint: startPoint,
                endPoint: endPoint,
                minY: minY,
                maxY: maxY,
                maxX: maxX,
                minX: minX,
                xOnMinY: xOnMinY,
                tg: tiltAngleSearch(maxY, minY, maxX, minX, startPoint)
            })
        }
    }

    return eTable;
}