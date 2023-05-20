import Buttons from "./Buttons";
import DotsList from "./DotsList";
import PolygonList from "./PolygonList";

const Interface = ({draw, clear, polygonList, createNewDot, setPolygonList, removeDot, createNewPolygonList}) => {

    return (
        <div className='interface'>
            <PolygonList removeDot={removeDot} polygonList={polygonList} setPolygonList={setPolygonList} createNewDot={createNewDot}/>
            <button className="createDot" onClick={createNewPolygonList}>Создать новую плоскость</button>
            <Buttons draw={draw} clear={clear}/>
        </div>
    );
};

export default Interface;