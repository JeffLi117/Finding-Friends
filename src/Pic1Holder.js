import React, { useState, useEffect } from 'react';
import Pic1 from './PuzzleImages/Pic1.jpg';
import wilson from './CharImages/wilson.png';
import batman from './CharImages/batman.png';
import kamaji from './CharImages/kamaji.png';
import ClickBox from './ClickBox';


function Pic1Holder(/* {handlerClicked} */) {
  const [chars, setChars] = useState([{
      ID: 0,
      charName: "Wilson",
      image: wilson,
      found: false,
    }, 
    {
      ID: 1,
      charName: "Batman",
      image: batman,
      found: false,
    }, 
    {
      ID: 2,
      charName: "Kamaji",
      image: kamaji,
      found: false,
    },
  ]);

  const [box, setBox] = useState({x: null, y: null});
  const [scaled, setScaled] = useState([]);
  const [relatives, setRelatives] = useState([]);

  function closeOut() {
    console.log("close out fxn in pic1holder");
    setBox({x: null, y: null});
  }

  function handlerFound(ID) {
    console.log("@pic1holder to change to FOUND; ID is ", ID);
    /* let foundChar = chars.filter(char => {
        return char.ID === ID
    });
    foundChar.found = true; */
    setChars(
        chars.map(char => 
            char.ID === ID 
            ? {...char, found: true}
            : char 
    ));
    setBox({x: null, y: null});
  }

  useEffect(() => {
    console.log(chars);
  }, [chars]);

  const handleClick = (e) => {    
    const natHeight = e.target.naturalHeight;
    const natWidth = e.target.naturalWidth;
    const actualHeight = e.target.height;
    const actualWidth = e.target.width;
    //convert position of pageX & pageY to scale to natural height/width
    const xScale = natWidth/actualWidth;
    const yScale = natHeight/actualHeight
    const xClicked = e.pageX;
    const yClicked = e.pageY;
    const xClickConv = xClicked * xScale;
    const yClickConv = yClicked * yScale;

    setScaled([xClickConv, yClickConv]);
    setRelatives([xScale, yScale]);

    console.log("xClickConv is "+ xClickConv +" and yClickConv is "+ yClickConv);

    setBox({x: xClicked, y: yClicked});
  };

  /* console.log(box); */

  if (box.x === null && box.y === null) {
    return (
        <div className="Pic1Holder" >
            <img 
                src={Pic1} 
                alt="wimmelbilder" 
                className="Pic1" 
                onClick={handleClick} 
            />
        </div>
      )
  } else {
    return (
        <div className="Pic1Holder" >
            <div className="circle" style={{ left: box.x, top: box.y }}>
                <ClickBox 
                    chars={chars}
                    closeOut={closeOut}
                    box={box}
                    scaled={scaled}
                    relatives={relatives}
                    handlerFound={handlerFound}
                />
            </div>
            <img 
                src={Pic1} 
                alt="wimmelbilder" 
                className="Pic1" 
                onClick={handleClick} 
            />
        </div>
      )
  }
}

export default Pic1Holder