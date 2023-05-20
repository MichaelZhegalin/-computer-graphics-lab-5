import {tiltAngleSearch} from "./TiltAngleSearch";

export const changeXOnMinY = (tableActiveEdge, currentEdgeY) => {
    for(let i = 0; i < tableActiveEdge.length; i++){
        if(currentEdgeY > tableActiveEdge[i].maxY){
            tableActiveEdge.splice(i, 1);
        }else {
            let b = tableActiveEdge[i].startPoint[1] - tableActiveEdge[i].startPoint[0] * tableActiveEdge[i].tg
            if(currentEdgeY === tableActiveEdge[i].startPoint[1]){
                tableActiveEdge[i].xOnMinY = tableActiveEdge[i].startPoint[0]
            }else{
                tableActiveEdge[i].xOnMinY = (currentEdgeY - b)/tableActiveEdge[i].tg
            }

            // if(tableActiveEdge[i].tg <= 0){
            //     tableActiveEdge[i].xOnMinY = tableActiveEdge[i].xOnMinY - tiltAngleSearch(tableActiveEdge[i].maxY, currentEdgeY, tableActiveEdge[i].maxX, tableActiveEdge[i].xOnMinY, [tableActiveEdge[i].xOnMinY, currentEdgeY]);
            //     // tableActiveEdge[i].xOnMinY = (tableActiveEdge[i].maxY - currentEdgeY) * tableActiveEdge[i].tg;
            // }else{
            //     tableActiveEdge[i].xOnMinY = tableActiveEdge[i].xOnMinY - tiltAngleSearch(tableActiveEdge[i].maxY, currentEdgeY, tableActiveEdge[i].xOnMinY, tableActiveEdge[i].minX, [tableActiveEdge[i].xOnMinY, currentEdgeY]);
            //     // tableActiveEdge[i].xOnMinY = (tableActiveEdge[i].maxY - currentEdgeY) * tableActiveEdge[i].tg;
            // }
        }
    }
}