import {bezierCurveEquation} from "./bezierСurves/BezierCurveEquation";
import {brokenLine} from "./bezierСurves/BrokenLine";
import {FoolTest} from "./secondaryFunctions/FoolTest";
import {ExceedingCanvasCheck} from "./secondaryFunctions/ExceedingCanvasCheck ";
import {polygonTable} from "./lineScanAlg/PolygonTable";
import {edgeTable} from "./lineScanAlg/EdgeTable";
import {edgeGroupSortTable} from "./lineScanAlg/EdgeGroupSortTable";
import {lineScan} from "./lineScanAlg/LineScan";

export const LaboratoryTask = (context, coordinateArr) =>{

    // let bezierDotsX = [];
    // let bezierDotsY = [];
    //
    // let bezierDotsXForTest = [];
    // let bezierDotsYForTest = [];
    //
    // for(let i = 0; i < coordinateArr.length; i++){
    //     bezierDotsXForTest[i] = [coordinateArr[i].xCoordinate];
    //     bezierDotsYForTest[i] = [coordinateArr[i].yCoordinate];
    //     bezierDotsX[i] = Number(coordinateArr[i].xCoordinate)
    //     bezierDotsY[i] = Number(coordinateArr[i].yCoordinate)
    // }
    //
    // if(!FoolTest(bezierDotsXForTest, bezierDotsYForTest)){
    //     return
    // }
    //
    // if(!ExceedingCanvasCheck(bezierDotsX, bezierDotsY)){
    //     return
    // }
    // bezierCurveEquation(bezierDotsX, bezierDotsY, context)


    // let resultPolygon = polygonTable([[[10, 0, 0], [5, 5, 25], [20, 10, 40]], [[-1, -1, 2], [-5, -10, 25], [20, 5, 40]]], ["black", "white"])
    let polygonsCoordinate = []
    for(let i = 0; i < coordinateArr.length; i++){
        polygonsCoordinate.push([])
        for(let j = 0; j < coordinateArr[i].length; j++){
            polygonsCoordinate[i].push([Number(coordinateArr[i][j].xCoordinate), Number(coordinateArr[i][j].yCoordinate), Number(coordinateArr[i][j].number)])
        }
    }
    // let resultPolygon = polygonTable([[[10, -15, 3], [5, 5, 3], [20, 10, 3]], [[-1, -1, 2], [-5, -10, 2], [30, 5, 2]]], ["black", "white"])
    let resultPolygon = polygonTable(polygonsCoordinate, ["black", "white"])
    console.log(resultPolygon)
    console.log("-------------------------------------------------------------")
    let resultEdge = edgeTable(resultPolygon)
    console.log(resultEdge)
    console.log("-------------------------------------------------------------")
    let sortEdge = edgeGroupSortTable(resultEdge)
    console.log("-------------------------------------------------------------")
    let lineScanRes = lineScan(sortEdge, resultPolygon)

    let i = 0;
    let flagStopSort = false
    let save;
     while (!flagStopSort){
        let test1 = lineScanRes[i].zCoordinate
        let test2 = lineScanRes[i + 1].zCoordinate
        console.log(test1 > test2)
        // console.log("Сортирую", lineScanRes[i].zCoordinate, lineScanRes[i+1].zCoordinate, typeof lineScanRes[i].zCoordinate, typeof lineScanRes[i+1].zCoordinate, Number(lineScanRes[i].zCoordinate) === Number(lineScanRes[i].zCoordinate[i+1]))
        if(test1 > test2){
            console.log("Сортирую")
            save = lineScanRes[i]
            lineScanRes[i] = lineScanRes[i + 1]
            lineScanRes[i + 1] = save
            i = -1
        }

        if(i === lineScanRes.length - 2){
            flagStopSort = true
        }

        i++
    }

    console.log(lineScanRes)
    for(let i = 0; i < lineScanRes.length; i++){
        if(lineScanRes[i].numPolygon === 1){
            brokenLine(context, [[lineScanRes[i].endLine1, lineScanRes[i].tall], [lineScanRes[i].startLine1, lineScanRes[i].tall]], "red")
            // brokenLine(context, [[lineScanRes[i].startLine1, lineScanRes[i].tall], [lineScanRes[i].endLine1, lineScanRes[i].tall]], "red")
        }else if(lineScanRes[i].numPolygon === 0){
            brokenLine(context, [[lineScanRes[i].endLine1, lineScanRes[i].tall], [lineScanRes[i].startLine1, lineScanRes[i].tall]], "blue")
            // brokenLine(context, [[lineScanRes[i].startLine1, lineScanRes[i].tall], [lineScanRes[i].endLine1, lineScanRes[i].tall]], "blue")
        }
    }

    for(let i = 0; i < resultEdge.length; i++){
        brokenLine(context, [[resultEdge[i].endPoint[0], resultEdge[i].endPoint[1]], [resultEdge[i].startPoint[0], resultEdge[i].startPoint[1]]])
        // brokenLine(context, [[resultEdge[i].startPoint[0], resultEdge[i].startPoint[1]], [resultEdge[i].endPoint[0], resultEdge[i].endPoint[1]]])
    }

}