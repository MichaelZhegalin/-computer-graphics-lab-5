import React from 'react';
import PointEntry from "./pointEntry";
import buttons from "./Buttons";

const DotsList = ({coordinateArr, setCoordinateArr, removeDot, createNewDot, numberPolygon}) => {
    return (
        <div className="dotsList">
            {coordinateArr.length === 0
                ?
                <h2>Нет заданных точек!</h2>
                :
                coordinateArr.map((el, num) =>
                <PointEntry key={el.id} num={num} coordinate={el} setCoordinateArr={setCoordinateArr} removeDot={removeDot} numberPolygon={numberPolygon}/>
            )}
            <button className="createDot" onClick={() => createNewDot(numberPolygon)}>Создать новую точку</button>
        </div>

    );
};

export default DotsList;