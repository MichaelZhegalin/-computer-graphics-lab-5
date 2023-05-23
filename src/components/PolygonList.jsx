import React from 'react';
import DotsList from "./DotsList";
import PointEntry from "./pointEntry";

const PolygonList = ({polygonList, setPolygonList, removeDot, createNewDot}) => {
    return (
        <div className='polygonList'>
            {polygonList.map((el, num) =>
                    <DotsList key={num} removeDot={removeDot} coordinateArr={el} setCoordinateArr={setPolygonList} createNewDot={createNewDot} numberPolygon={num}/>
                )}
        </div>
    );
};

export default PolygonList;