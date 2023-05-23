import {changeXOnMinY} from "./ChangeXOnMinY";
import {pushNewActiveEdge} from "./PushNewActiveEdge";
import {sortByXOnMinY} from "./SortByXOnMinY";
import {findZ} from "./FindZ";

export const lineScan = (groupSortTableEdge, polygonTable) =>{
    let tableActiveEdge = [];
    let currentEdgeY = groupSortTableEdge[0].minY;
    let colorLine = []
    let resArr = [];
    let stopFlag = false;
    let extrimStop = 0;

    while (!stopFlag){
        extrimStop += 1;
        if(tableActiveEdge.length !== 0){
            currentEdgeY = currentEdgeY + 0.1;
            changeXOnMinY(tableActiveEdge, currentEdgeY)
        }

        pushNewActiveEdge(groupSortTableEdge, tableActiveEdge, currentEdgeY);

        if(tableActiveEdge.length < 2){
            stopFlag = true;
        }
        if(extrimStop === 10000){
            stopFlag = true;
            console.log("Экстренная остановка программы, попали в бесконечный цикл")
            console.log("высота", currentEdgeY)
            console.log("Результаты, которые удалось получить: ", tableActiveEdge)
        }

        sortByXOnMinY(tableActiveEdge);

        for(let i = 0; i < polygonTable.length; i++){
            colorLine.push({
                startLine1: undefined,
                endLine1: undefined,
                color: undefined,
                numPolygon: undefined,
                zCoordinate: undefined,
                lineCounter: 1,
                tall: undefined,
                special: undefined,
                nullCounter: undefined,
                start: undefined,
            })
        }

        let useEdgeArr = []
        let counter = 1;
        for(let i = 0; i < tableActiveEdge.length; i++){
            if(i === 0){
                colorLine[tableActiveEdge[i].rectangleParentNum].startLine1 = tableActiveEdge[i].xOnMinY
                useEdgeArr.push(tableActiveEdge[i].rectangleParentNum)
                colorLine[tableActiveEdge[i].rectangleParentNum].numPolygon = tableActiveEdge[i].rectangleParentNum;
                colorLine[tableActiveEdge[i].rectangleParentNum].tall = currentEdgeY;
                colorLine[tableActiveEdge[i].rectangleParentNum].start = "yes";
                colorLine[tableActiveEdge[i].rectangleParentNum].color = polygonTable[tableActiveEdge[i].rectangleParentNum].color;
                colorLine[tableActiveEdge[i].rectangleParentNum].zCoordinate = findZ(polygonTable[tableActiveEdge[i].rectangleParentNum].planeCoefficient, tableActiveEdge[i].xOnMinY, currentEdgeY);
            }else{
                if(counter !== 0){
                    let saveCounter = counter;
                    for(let j = 0; j < useEdgeArr.length; j++){
                        if(useEdgeArr[j] === tableActiveEdge[i].rectangleParentNum){
                            useEdgeArr.splice(j, 1)
                            counter -= 1
                            colorLine[tableActiveEdge[i].rectangleParentNum]["endLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter] = tableActiveEdge[i].xOnMinY
                            colorLine[tableActiveEdge[i].rectangleParentNum].numPolygon = tableActiveEdge[i].rectangleParentNum;
                            colorLine[tableActiveEdge[i].rectangleParentNum].tall = currentEdgeY;
                        }
                    }
                    if(saveCounter === counter
                        ||
                        (findZ(polygonTable[tableActiveEdge[i].rectangleParentNum].planeCoefficient, tableActiveEdge[i].xOnMinY, currentEdgeY)
                            >
                            findZ(polygonTable[tableActiveEdge[i - 1].rectangleParentNum].planeCoefficient, tableActiveEdge[i - 1].xOnMinY, currentEdgeY) || useEdgeArr.length === 0)){
                        counter += 1
                        if(colorLine[tableActiveEdge[i].rectangleParentNum]["startLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter]  !== undefined){
                            // console.log(tableActiveEdge[i], "Проверочка")
                            colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter += 1;
                            colorLine[tableActiveEdge[i].rectangleParentNum]["startLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter] = tableActiveEdge[i].xOnMinY
                            colorLine[tableActiveEdge[i].rectangleParentNum].special = "Yes";
                            colorLine[tableActiveEdge[i].rectangleParentNum].color = polygonTable[tableActiveEdge[i].rectangleParentNum].color;
                            colorLine[tableActiveEdge[i].rectangleParentNum].zCoordinate = findZ(polygonTable[tableActiveEdge[i].rectangleParentNum].planeCoefficient, tableActiveEdge[i].xOnMinY, currentEdgeY);
                        }else{
                            colorLine[tableActiveEdge[i].rectangleParentNum]["startLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter] = tableActiveEdge[i].xOnMinY
                            colorLine[tableActiveEdge[i].rectangleParentNum].numPolygon = tableActiveEdge[i].rectangleParentNum;
                            colorLine[tableActiveEdge[i].rectangleParentNum].tall = currentEdgeY;
                            colorLine[tableActiveEdge[i].rectangleParentNum].special = "Yes";
                            colorLine[tableActiveEdge[i].rectangleParentNum].color = polygonTable[tableActiveEdge[i].rectangleParentNum].color;
                            colorLine[tableActiveEdge[i].rectangleParentNum].zCoordinate = findZ(polygonTable[tableActiveEdge[i].rectangleParentNum].planeCoefficient, tableActiveEdge[i].xOnMinY, currentEdgeY);
                        }
                        useEdgeArr.push(tableActiveEdge[i].rectangleParentNum)
                    }
                }else{
                    counter = 1
                    if(colorLine[tableActiveEdge[i].rectangleParentNum]["startLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter]  !== undefined){
                        colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter += 1;
                        colorLine[tableActiveEdge[i].rectangleParentNum]["startLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter] = tableActiveEdge[i].xOnMinY
                        colorLine[tableActiveEdge[i].rectangleParentNum].nullCounter = "Yes";
                        colorLine[tableActiveEdge[i].rectangleParentNum].color = polygonTable[tableActiveEdge[i].rectangleParentNum].color;
                        colorLine[tableActiveEdge[i].rectangleParentNum].zCoordinate = findZ(polygonTable[tableActiveEdge[i].rectangleParentNum].planeCoefficient, tableActiveEdge[i].xOnMinY, currentEdgeY);
                    }else{
                        colorLine[tableActiveEdge[i].rectangleParentNum]["startLine" + colorLine[tableActiveEdge[i].rectangleParentNum].lineCounter] = tableActiveEdge[i].xOnMinY
                        colorLine[tableActiveEdge[i].rectangleParentNum].numPolygon = tableActiveEdge[i].rectangleParentNum;
                        colorLine[tableActiveEdge[i].rectangleParentNum].tall = currentEdgeY;
                        colorLine[tableActiveEdge[i].rectangleParentNum].nullCounter = "Yes";
                        colorLine[tableActiveEdge[i].rectangleParentNum].color = polygonTable[tableActiveEdge[i].rectangleParentNum].color;
                        colorLine[tableActiveEdge[i].rectangleParentNum].zCoordinate = findZ(polygonTable[tableActiveEdge[i].rectangleParentNum].planeCoefficient, tableActiveEdge[i].xOnMinY, currentEdgeY);
                    }
                    useEdgeArr.push(tableActiveEdge[i].rectangleParentNum)
                }
            }
        }
        for(let k = 0; k < colorLine.length; k++){
            if(colorLine[k].endLine1 === undefined){
                colorLine.splice(k, 1)
            }
        }
        resArr = resArr.concat(colorLine);
        colorLine.length = 0;
    }
    console.log("Результатище ", resArr)
    return resArr
}