export const findZ = (planeCoefficient, x, y) =>{
    let A = planeCoefficient[0];
    let B = planeCoefficient[1];
    let C = planeCoefficient[2];
    let D = planeCoefficient[3];
    let z = (-D - A*x * B*y)/C
    return z
}