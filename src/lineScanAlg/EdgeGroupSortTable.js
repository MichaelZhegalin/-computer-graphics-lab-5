export const edgeGroupSortTable = (edgeTable) =>{

    let EGSTable = []
    let sortFlag = true;
    let i = 0;
    let edgeSave;

    for(let i = 0; i < edgeTable.length; i++){
        EGSTable[i] = edgeTable[i]
    }

    while(sortFlag){
        if(i < (EGSTable.length - 1) && EGSTable[i].minY >= EGSTable[i + 1].minY){
            if(EGSTable[i].minY > EGSTable[i + 1].minY){
                edgeSave = EGSTable[i + 1];
                EGSTable[i + 1] = EGSTable[i]
                EGSTable[i] = edgeSave
                sortFlag = false
            }else{
                if(EGSTable[i].xOnMinY > EGSTable[i + 1].xOnMinY){
                    edgeSave = EGSTable[i + 1];
                    EGSTable[i + 1] = EGSTable[i]
                    EGSTable[i] = edgeSave
                    sortFlag = false
                }
            }
        }

        i++;

        if(sortFlag === false){
            i = 0;
            sortFlag = true;
        }

        if(i === EGSTable.length){
            sortFlag = false;
        }else{
            sortFlag = true;
        }
    }

    return EGSTable
}