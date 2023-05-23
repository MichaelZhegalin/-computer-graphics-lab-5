export const polygonSubdivision = (polygonCoord, lineCoord, polygonAllInfo) => {
    let lineStartPoint = [lineCoord[0].x, lineCoord[0].y, lineCoord[0].z]
    let lineEndPoint = [lineCoord[1].x, lineCoord[1].y, lineCoord[1].z]

    let leftGroup = []
    let rightGroup = []

    let l = lineStartPoint[0] - lineEndPoint[0] + 0.000001
    let m = lineStartPoint[1] - lineEndPoint[1] + 0.000001
    let n = lineStartPoint[2] - lineEndPoint[2] + 0.000001
    //self.n = N.z-M.z
    //console.log(lineStartPoint, lineEndPoint, polygonAllInfo, l, m)
    console.log(polygonCoord.length)
    //let yPoint = 0
    for(let i = 0; i < polygonCoord.length; i++){
       for(let j = 0; j < polygonCoord[i].length; j++){
            console.log(polygonCoord[i][j])}
    }
    for(let i = 0; i < polygonCoord.length; i++){
        if ((polygonCoord[i][0] - lineStartPoint[0]) / l === (polygonCoord[i][1] - lineStartPoint[1]) / m) {
            console.log("Принадлежит прямой")
        }
        /*yPoint = m * (polygonCoord[i][0] - lineStartPoint[0]) / l + lineStartPoint[1]
        if (yPoint > lineStartPoint[1]) {
            console.log("Лежит выше")
        } else {
            console.log("Лежит ниже")
        }*/

        let res = (polygonCoord[i][0] - lineStartPoint[0]) * (lineEndPoint[1] - lineStartPoint[1]) - (polygonCoord[i][1]- lineStartPoint[1]) * (lineEndPoint[0] - lineStartPoint[0])
        if (res === 0) {
            console.log("Принадлежит прямой")
        }
        if (res < 0) {
            console.log("Лежит левее")
            leftGroup.push(polygonCoord[i])
        }
        if (res > 0){
            console.log("Лежит правее")
            rightGroup.push(polygonCoord[i])
        }
        }

    return [leftGroup, rightGroup]
    /*for(let i = 0; i < polygonCoord.length; i++) {
        if ((polygonCoord[i].x - lineStartPoint[0]) / l === (polygonCoord[i].y - lineStartPoint[1]) / m) {
            console.log("Принадлежит прямой")
        }
        yPoint = m * (polygonCoord[i].x - lineStartPoint[0]) / l + lineStartPoint[1]
        if (yPoint > lineStartPoint[1]) {
            console.log("Лежит правее")
        } else {
            console.log("Лежит левее")
        }
    }*/
}