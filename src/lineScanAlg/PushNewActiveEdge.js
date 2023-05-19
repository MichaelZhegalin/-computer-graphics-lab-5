export const pushNewActiveEdge = (groupSortTableEdge, tableActiveEdge, currentEdgeY) =>{
    let flagActiveEdge = true;
    let i = 0;
    while(flagActiveEdge){
        let dontPushFlag = false;
        if(currentEdgeY >= groupSortTableEdge[i].minY && currentEdgeY <= groupSortTableEdge[i].maxY){
            if(tableActiveEdge.length === 0){
                tableActiveEdge.push(groupSortTableEdge[i]);
            }else{
                for(let j = 0; j < tableActiveEdge.length; j++){
                    if(groupSortTableEdge[i].startPoint === tableActiveEdge[j].startPoint
                        && groupSortTableEdge[i].endPoint === tableActiveEdge[j].endPoint
                        && groupSortTableEdge[i].rectangleParentNum === tableActiveEdge[j].rectangleParentNum){
                        dontPushFlag = true;
                    }
                }
                if(!dontPushFlag){
                    tableActiveEdge.push(groupSortTableEdge[i]);
                }else{
                    dontPushFlag = false
                }
            }

        }

        i++

        if(i === groupSortTableEdge.length){
            flagActiveEdge = false;
        }
    }
}