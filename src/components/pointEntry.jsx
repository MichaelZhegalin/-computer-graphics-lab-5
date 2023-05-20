import React from 'react';
import Inputs from "./Inputs";

const PointEntry = (props) => {

    return (
        <div>
            <Inputs numberPolygon={props.numberPolygon} num={props.num} coordinate={props.coordinate} setCoordinateArr={props.setCoordinateArr} removeDot={props.removeDot}/>
        </div>
    );
};

export default PointEntry;