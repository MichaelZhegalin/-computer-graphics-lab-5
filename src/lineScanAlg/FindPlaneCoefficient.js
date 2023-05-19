export const findPlaneCoefficient = (polygonCoordinate) =>{
    let firstPoint = polygonCoordinate[0];
    let secondPoint = polygonCoordinate[1];
    let thirdPoint = polygonCoordinate[2];

    let det = [
        [0, secondPoint[0] - firstPoint[0], thirdPoint[0] - firstPoint[0]],
        [0, secondPoint[1] - firstPoint[1], thirdPoint[1] - firstPoint[1]],
        [0, secondPoint[2] - firstPoint[2], thirdPoint[2] - firstPoint[2]]
    ]
    let A = det[1][1] * det[2][2] - det[2][1] * det[1][2]
    let B = (det[0][1] * det[2][2] - det[2][1] * det[0][2]) * (-1)
    let C = det[0][1] * det[1][2] - det[1][1] * det[0][2]
    let D = -firstPoint[0] * A -firstPoint[1] * B - firstPoint[2] * C
    let Coefficient = [A,B,C,D]
    return Coefficient
}