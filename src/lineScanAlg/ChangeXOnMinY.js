import {tiltAngleSearch} from "./TiltAngleSearch";

export const changeXOnMinY = (tableActiveEdge, currentEdgeY) => {
    for(let i = 0; i < tableActiveEdge.length; i++){
        if(currentEdgeY > tableActiveEdge[i].maxY){
            tableActiveEdge.splice(i, 1);
        }else {
            if(tableActiveEdge[i].tg <= 0){
                tableActiveEdge[i].xOnMinY = tableActiveEdge[i].xOnMinY - tiltAngleSearch(tableActiveEdge[i].maxY, currentEdgeY, tableActiveEdge[i].maxX, tableActiveEdge[i].xOnMinY, [tableActiveEdge[i].xOnMinY, currentEdgeY]);
                // tableActiveEdge[i].xOnMinY = (tableActiveEdge[i].maxY - currentEdgeY) * tableActiveEdge[i].tg;
            }else{
                tableActiveEdge[i].xOnMinY = tableActiveEdge[i].xOnMinY - tiltAngleSearch(tableActiveEdge[i].maxY, currentEdgeY, tableActiveEdge[i].xOnMinY, tableActiveEdge[i].minX, [tableActiveEdge[i].xOnMinY, currentEdgeY]);
                // tableActiveEdge[i].xOnMinY = (tableActiveEdge[i].maxY - currentEdgeY) * tableActiveEdge[i].tg;
            }
        }
    }
}