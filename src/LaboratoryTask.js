import {bezierCurveEquation} from "./bezierСurves/BezierCurveEquation";
import {brokenLine} from "./bezierСurves/BrokenLine";
import {FoolTest} from "./secondaryFunctions/FoolTest";
import {ExceedingCanvasCheck} from "./secondaryFunctions/ExceedingCanvasCheck ";
import {polygonTable} from "./lineScanAlg/PolygonTable";
import {edgeTable} from "./lineScanAlg/EdgeTable";
import {edgeGroupSortTable} from "./lineScanAlg/EdgeGroupSortTable";
import {lineScan} from "./lineScanAlg/LineScan";

export const LaboratoryTask = (context, coordinateArr) =>{

    let bezierDotsX = [];
    let bezierDotsY = [];

    let bezierDotsXForTest = [];
    let bezierDotsYForTest = [];

    for(let i = 0; i < coordinateArr.length; i++){
        bezierDotsXForTest[i] = [coordinateArr[i].xCoordinate];
        bezierDotsYForTest[i] = [coordinateArr[i].yCoordinate];
        bezierDotsX[i] = Number(coordinateArr[i].xCoordinate)
        bezierDotsY[i] = Number(coordinateArr[i].yCoordinate)
    }

    if(!FoolTest(bezierDotsXForTest, bezierDotsYForTest)){
        return
    }

    if(!ExceedingCanvasCheck(bezierDotsX, bezierDotsY)){
        return
    }
    // bezierCurveEquation(bezierDotsX, bezierDotsY, context)


    let resultPolygon = polygonTable([[[10, 0, 0], [5, 5, 25], [20, 10, 40]], [[-1, -1, 2], [-5, -10, 25], [20, 5, 40]]], ["black", "white"])
    console.log(resultPolygon)
    console.log("-------------------------------------------------------------")
    let resultEdge = edgeTable(resultPolygon)
    console.log(resultEdge)
    console.log("-------------------------------------------------------------")
    let sortEdge = edgeGroupSortTable(resultEdge)
    console.log("-------------------------------------------------------------")
    let lineScanRes = lineScan(sortEdge, resultPolygon)
    for(let i = 0; i < resultEdge.length; i++){
        brokenLine(context, [[resultEdge[i].endPoint[0], resultEdge[i].endPoint[1]], [resultEdge[i].startPoint[0], resultEdge[i].startPoint[1]]])
    }
    console.log(lineScanRes)
    for(let i = 0; i < lineScanRes.length; i++){
        if(lineScanRes[i].numPolygon === 1){
            brokenLine(context, [[lineScanRes[i].endLine1, lineScanRes[i].tall], [lineScanRes[i].startLine1, lineScanRes[i].tall]], "red")
        }else if(lineScanRes[i].numPolygon === 0){
            brokenLine(context, [[lineScanRes[i].endLine1, lineScanRes[i].tall], [lineScanRes[i].startLine1, lineScanRes[i].tall]], "blue")
        }
    }
}