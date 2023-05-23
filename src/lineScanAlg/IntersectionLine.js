export const intersectionLine = (coef1, coef2, ps1, ps2) => {
    let A1 = coef1[0]
    let B1 = coef1[1]
    let C1 = coef1[2]
    let D1 = coef1[3]

    let A2 = coef2[0]
    let B2 = coef2[1]
    let C2 = coef2[2]
    let D2 = coef2[3]

    if (A2 === 0 || B2 === 0 || C2 === 0){
        A2 += 0.000001
        B2 += 0.000001
        C2 += 0.000001

        A1 += 0.000001
        B1 += 0.000001
        C1 += 0.000001
        console.log("Не надо, дядя, на 0 делить")
    }

    let p1 = [A1, B1, C1]
    let p2 = [A2, B2, C2]

    let t0 = p1[0] / p2[0];
    let t1 = p1[1] / p2[1];
    let t2 = p1[2] / p2[2];

    if ((t0 === t1) && (t1 === t2)){
        console.log("Плоскости параллельны")
    }else{
        let det = [[1, 1, 1],
            [A1, B1, C1],
            [A2, B2, C2]]
        let l = det[1][1] * det[2][2] - det[1][2] * det[2][1]
        let m = det[1][2] * det[2][0] - det[1][0] * det[2][2]
        let n = det[1][0] * det[2][1] - det[1][1] * det[2][0]
        console.log(l, m, n)

        let xl = 0
        let zl = (D1 * B2 / B1 - D2 + 0.00001) / (C2 - C1 * B2 / B1 + 0.00001)
        let yl = (-C1 * zl - D1) / B1 + 0.00001
        console.log(xl, yl, zl)
        // # Тогда получаем уравнение прямой параметричекое:
        //         #x = xl + l * t
        //     #y = yl + m * t
        //     #z = zl + n * t
        // # t - любое число
        let normVec = [l,m,n]
        let startPoint = [xl,yl,zl]
        let resObj = {
            normVec: normVec,
            startPoint: startPoint,
        }
        findIntersectPoint(ps1, ps2, resObj.normVec, resObj.startPoint)
        return findIntersectPoint(ps1, ps2, resObj.normVec, resObj.startPoint)
    }
}

function findIntersectPoint(ps1,ps2,normVec, lstP){ //#lstP- line start point
    let sgmt1 = []
    let sgmt2 = []

    for(let i = 0; i < ps1.length; i++){
        if (i === ps1.length - 1){
            sgmt1.push({
                stP: ps1[0],
                l: ps1[i][0] - ps1[0][0],
                m: ps1[i][1] - ps1[0][1],
                n: ps1[i][2] - ps1[0][2],
            })
        }else{
            sgmt1.push({
                stP: ps1[i],
                l: ps1[i + 1][0] - ps1[i][0],
                m: ps1[i + 1][1] - ps1[i][1],
                n: ps1[i + 1][2] - ps1[i][2],
            })
        }
    }

    for(let j = 0; j < ps2.length; j++){
        if(j === ps2.length - 1){
            sgmt2.push({
                stP: ps2[0],
                l: ps2[j][0] - ps2[0][0],
                m: ps2[j][1] - ps2[0][1],
                n: ps2[j][2] - ps2[0][2],
            })
        }else{
            sgmt2.push({
                stP: ps2[j],
                l: ps2[j + 1][0] - ps2[j][0],
                m: ps2[j + 1][1] - ps2[j][1],
                n: ps2[j + 1][2] - ps2[j][2],
            })
        }
    }

    let arr1_t = []
    let arr1_s = []
    let arr2_t = []
    let arr2_s = []
    let Intersect1 = []
    let Intersect2 = []
    let flag1=[]
    let flag2=[]

    for(let i = 0; i < ps1.length; i++){
        arr1_t.push((sgmt1[i].stP[1] - lstP[1] + (sgmt1[i].m * (lstP[0]-sgmt1[i].stP[0]))/sgmt1[i].l + 0.00001)/(normVec[1] - (sgmt1[i].m*normVec[0])/sgmt1[i].l + 0.00001))
        arr1_s.push((lstP[0] + arr1_t[i]*normVec[0]-sgmt1[i].stP[0])/sgmt1[i].l + 0.00001)
        if ((arr1_s[i] < 0) || (arr1_s[i] > 1)){
            flag1.push(0)
        }else{
            flag1.push(1)
            Intersect1.push({
                x:lstP[0] + normVec[0]*arr1_t[i],
                y:lstP[1] + normVec[1]*arr1_t[i],
                z:lstP[2] + normVec[2]*arr1_t[i],
            })
        }
    }

    for(let j = 0; j < ps2.length; j++){
        arr2_t.push((sgmt2[j].stP[1] - lstP[1] - (sgmt2[j].m * (lstP[0]-sgmt2[j].stP[0]))/sgmt2[j].l + 0.00001)/(normVec[1] - (sgmt2[j].m*normVec[0])/sgmt2[j].l + 0.00001))
        arr2_s.push((lstP[0] + arr2_t[j]*normVec[0]-sgmt2[j].stP[0])/sgmt2[j].l + 0.00001)
        if ((arr2_s[j] < 0) || (arr2_s[j] > 1)){
            flag2.push(0)
        }else{
            flag2.push(1)
            Intersect2.push({
                x:sgmt2[j].stP[0] + sgmt2[j].l * arr2_s[j],
                y:sgmt2[j].stP[1] + sgmt2[j].m * arr2_s[j],
                z:sgmt2[j].stP[2] + sgmt2[j].n * arr2_s[j],
            })
        }
    }

    return Intersect1
}