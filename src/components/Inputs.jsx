import React from 'react';

const Inputs = (props) => {

    let strXPlaceholder = `Введите координату точки ${props.num} по X`
    let strYPlaceholder = `Введите координату точки ${props.num} по Y`

    return (
        <div className="inputContainer">
            <div className="dotsInput">
                <input placeholder={strXPlaceholder} onChange={(e) =>{
                props.coordinate.xCoordinate = e.target.value
                props.setCoordinateArr(prev => [...prev])}
            } type="text" value={props.coordinate.xCoordinate}/>
                <input placeholder={strYPlaceholder} onChange={(e) => {
                    props.coordinate.yCoordinate = e.target.value
                    props.setCoordinateArr(prev => [...prev])}
                }  type="text" value={props.coordinate.yCoordinate}/>
                <input placeholder={strYPlaceholder} onChange={(e) => {
                    props.coordinate.zCoordinate = e.target.value
                    props.setCoordinateArr(prev => [...prev])}
                }  type="text" value={props.coordinate.zCoordinate}/>
            </div>

            <button className="removeDot" onClick={() => props.removeDot(props.coordinate.id, props.numberPolygon)}>×</button>
        </div>
    );
};

export default Inputs;