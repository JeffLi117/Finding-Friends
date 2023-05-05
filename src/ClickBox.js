import React,{ useState, useEffect } from 'react';
import {db} from './firebase';
import {collection, addDoc, Timestamp, getDocs} from 'firebase/firestore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'

const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'scores'), {
        playerName: "playerName",
        description: "description",
        completed: false,
        created: Timestamp.now()
      })
    } catch (err) {
        console.error("Error adding document: ", e);
    }
}

export default function ClickBox({chars, closeOut, scaled, relatives, handlerFound}) {

  const colRef = collection(db, "Pic1 Locations");
  let keys = [];
  getDocs(colRef)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      keys.push({...doc.data(), id: doc.id})
    })
    /* console.log(keys); */
  })
  .catch(err => {
    console.log("Error adding document: ", err)
  })

  /* In general, x and y must satisfy (x - center_x)² + (y - center_y)² < radius². */
  function checkInCircle(center_x, center_y, radius, x, y) {
    let square_dist = Math.pow((center_x - x), 2) + Math.pow((center_y - y), 2);
    if (square_dist < Math.pow(radius, 2)) {
      return true
    } else {
      return false
    }
  }
  function checkAgainstBaas(ID) {
    
    const avgAdjustedradius = (relatives[0]+relatives[1])/2*55;
    /* Wilson - 1677, 8388; Batman - 213, 5752; Kamaji - 1303, 2464 */

    const selectedChar = keys[ID];
    const coordArr = Object.values(selectedChar)[0].map(x => Number(x));

    if (checkInCircle(coordArr[0], coordArr[1], avgAdjustedradius, scaled[0], scaled[1])) {
      console.log("It's within the circle! Roughly...");
      handlerFound(ID);
    } else {
      console.log("Not within the circle! Sad dayz")
    }
  }

  function handlerXOut() {
    closeOut();
  }

  return (
    <div className="ClickBox" >
      <div className="xOut" onClick={handlerXOut} >
        <FontAwesomeIcon icon={faCircleXmark} />
      </div>
        <ul>
            {chars.map((char) => {
                return (
                    <li key={char.ID} onClick={()=> {checkAgainstBaas(char.ID)}} className={(char.found ? "found" : "hiding")}>{char.charName} <img src={char.image} alt="character image" className="listCharImg"/></li>
                )
            })}
        </ul>
    </div>
  )
}
