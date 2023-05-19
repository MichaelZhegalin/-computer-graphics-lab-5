export const sortByXOnMinY = (tableActiveEdge) =>{
    let j = 0;
    let sortStop = false;
    let save;
    while (!sortStop && tableActiveEdge.length >= 2){
        if(tableActiveEdge[j].xOnMinY > tableActiveEdge[j + 1].xOnMinY){
            save = tableActiveEdge[j];
            tableActiveEdge[j] = tableActiveEdge[j + 1];
            tableActiveEdge[j + 1] = save
            j = -1
        }
        j++
        if(j === tableActiveEdge.length - 1){
            sortStop = true;
        }
    }
}