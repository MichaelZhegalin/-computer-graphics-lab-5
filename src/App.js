import './style/App.css';
import './style/btn.css';
import Canvas from "./components/Canvas";
import LabHeader from "./components/LabHeader";
import React, {useState} from "react";
import Interface from "./components/Interface";

function App() {

    const [state, setState] = useState(false);
    const [clearState, setClearState] = useState(false);

    // const [coordinateArr, setCoordinateArr] = useState([{
    //     xCoordinate: "",
    //     yCoordinate: "",
    //     id: Date.now(),
    // }])

    const [polygonList, setPolygonList] = useState([
        [{
            xCoordinate: "",
            yCoordinate: "",
            id: Date.now(),
            number: 1,
        }]
    ]);

    function createNewPolygonList(){
        setPolygonList(prevState => [...prevState, [{
            xCoordinate: "",
            yCoordinate: "",
            id: Date.now(),
            number: polygonList.length,
        }]])
    }

    function createNewDot(numberPolygon){
        polygonList[numberPolygon].push({
            xCoordinate: "",
            yCoordinate: "",
            id: Date.now(),
            number: polygonList.length,
        })
        setPolygonList(prevState => [...prevState])
    }
    function removeDot(dot, numberPolygon){
        let newArr = []
        for(let i = 0; i < polygonList[numberPolygon].length; i++){
            if(polygonList[numberPolygon][i].id !== dot){
                newArr.push(polygonList[numberPolygon][i])
            }
        }
        polygonList[numberPolygon] = newArr

        setPolygonList(prevState => [...prevState])

    }

    const clear = () =>{
        setClearState(prevState => !prevState);
    }

    const draw = () => {
        setState(prevState => !prevState);
    }

  return (
    <div className="App">
        <LabHeader/>
        <Canvas clearState={clearState} draw={draw} setClearState={setClearState} state={state} polygonList={polygonList}/>
        <Interface draw={draw} clear={clear} removeDot={removeDot} createNewDot={createNewDot} polygonList={polygonList} setPolygonList={setPolygonList} createNewPolygonList={createNewPolygonList}/>
    </div>
  );
}

export default App;
