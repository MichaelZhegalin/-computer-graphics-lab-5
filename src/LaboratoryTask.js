import {bezierCurveEquation} from "./bezierСurves/BezierCurveEquation";
import {brokenLine} from "./bezierСurves/BrokenLine";
import {FoolTest} from "./secondaryFunctions/FoolTest";
import {ExceedingCanvasCheck} from "./secondaryFunctions/ExceedingCanvasCheck ";
import {polygonTable} from "./lineScanAlg/PolygonTable";
import {edgeTable} from "./lineScanAlg/EdgeTable";
import {edgeGroupSortTable} from "./lineScanAlg/EdgeGroupSortTable";
import {lineScan} from "./lineScanAlg/LineScan";
import {intersectionLine} from "./lineScanAlg/IntersectionLine";
import {polygonSubdivision} from "./lineScanAlg/PolygonSubdivision";

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

    //let resultPolygon = polygonTable([[[10, -15, 6], [5, 5, 6], [20, 10, 6]], [[-6, -1, 4], [-5, -10, 8], [30, 5, 7]]], ["black", "red"])
    //let resultPolygon = polygonTable([[[10, 0, 0], [-15, -12, 25], [20, 10, 40]], [[-1, -1, 2], [-5, -10, 25], [12, 1.61, 40]]], ["black", "red"])
   // let resultPolygon = polygonTable([[[10, -20, 0], [20,0,-10], [15,6,19.2]], [[ 0,10,10], [-10, 0, 30], [ 20,0,10]]], ["black", "red"])
   //  let resultPolygon = polygonTable([[[10, 0, 25], [5, 5, 40], [20, 10, 2]], [[-1, -1, 2], [-5, -10, 25], [30.18, 11.53, 40]]], ["black", "red"])
    let polygonsCoordinate = []
    for(let i = 0; i < coordinateArr.length; i++){
        polygonsCoordinate.push([])
        for(let j = 0; j < coordinateArr[i].length; j++){
            polygonsCoordinate[i].push([Number(coordinateArr[i][j].xCoordinate) + 0.00001 * j, Number(coordinateArr[i][j].yCoordinate), Number(coordinateArr[i][j].zCoordinate)])
        }
    }
    //[10, 0, 25], [5, 5, 40], [20, 10, 2]
    // [-1, -1, 2], [-5, -10, 25], [30.18, 11.53, 40]
    //let resultPolygon = polygonTable([[[10, -15, 6], [5, 5, 6], [20, 10, 6]], [[-1, -1, 7], [-5, -10, 7], [30, 5, 7]], [[5, 15, 5], [30, 5, 5], [20, -5, 5]]], ["black", "white"])
    let resultPolygon = polygonTable(polygonsCoordinate, ["blue", "red", "yellow", "green"])
    let res;
    let save = resultPolygon.length;
    for(let i = 0; i < save - 1; i++){
        res = intersectionLine(resultPolygon[i].planeCoefficient, resultPolygon[i + 1].planeCoefficient,[resultPolygon[i].point0, resultPolygon[i].point1, resultPolygon[i].point2], [resultPolygon[i + 1].point0, resultPolygon[i + 1].point1, resultPolygon[i + 1].point2])
        console.log(res)
        if(res !== undefined && res.length !== 0){
            let newPolygon
            let subdivision = polygonSubdivision([resultPolygon[i].point0, resultPolygon[i].point1, resultPolygon[i].point2], res, resultPolygon)
            if(subdivision[0].length === 1){
                newPolygon = polygonTable([[subdivision[0][0], [res[0].x, res[0].y, res[0].z], [res[1].x, res[1].y, res[1].z]], [subdivision[1][0], [res[0].x, res[0].y, res[0].z], [res[1].x, res[1].y, res[1].z], subdivision[1][1]]], ["blue", "yellow"])
            }else{
                newPolygon = polygonTable([[subdivision[1][0], [res[0].x, res[0].y, res[0].z], [res[1].x, res[1].y, res[1].z]], [subdivision[0][0], subdivision[0][1], [res[0].x, res[0].y, res[0].z], [res[1].x, res[1].y, res[1].z]]], ["blue", "yellow"])
            }
            resultPolygon.splice(i, 1)
            newPolygon[0].polygonNum = i;
            if(newPolygon[resultPolygon.length] !== undefined){
                newPolygon[1].polygonNum = newPolygon[resultPolygon.length].polygonNum + 1;
            }else{
                newPolygon[1].polygonNum = 2;
            }
            resultPolygon.push(newPolygon[0])
            resultPolygon.push(newPolygon[1])
            console.log("Вывод результата", res, subdivision)
        }
        console.log("Вывод результата треугольник", resultPolygon)
    }

    console.log(resultPolygon)
    console.log("-------------------------------------------------------------")
    let resultEdge = edgeTable(resultPolygon)
    console.log(resultEdge)
    console.log("-------------------------------------------------------------")
    let sortEdge = edgeGroupSortTable(resultEdge)
    console.log("-------------------------------------------------------------")
    let lineScanRes = lineScan(sortEdge, resultPolygon)

    lineScanRes.sort((a, b) =>{
        return a.zCoordinate - b.zCoordinate
    })

    for(let i = 0; i < lineScanRes.length; i++){
        if(lineScanRes[i].numPolygon !== undefined){
            brokenLine(context, [[lineScanRes[i].endLine1, lineScanRes[i].tall], [lineScanRes[i].startLine1, lineScanRes[i].tall]], lineScanRes[i].color)
        }
    }

    for(let i = 0; i < resultEdge.length; i++){
        brokenLine(context, [[resultEdge[i].endPoint[0], resultEdge[i].endPoint[1]], [resultEdge[i].startPoint[0], resultEdge[i].startPoint[1]]])
        // brokenLine(context, [[resultEdge[i].startPoint[0], resultEdge[i].startPoint[1]], [resultEdge[i].endPoint[0], resultEdge[i].endPoint[1]]])
    }

    // brokenLine(context, [res[0], res[1]], "blue")

}