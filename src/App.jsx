import React, { useEffect, useState } from "react";
import board from "./assets/images/snake-lader.png";
import girl from "./assets/images/girl.png";
import boy from "./assets/images/boy.png";

const App = () => {
  // board logic

  let css = {
    backgroundImage: `url(${board})`,
  };

  let showDivs = [];
  let count = 100;

  for (let i = 0; i < 10; i++) {
    let newArr = [];
    for (let j = 0; j < 10; j++) {
      newArr.push(
        <div
          className="w-[86px] h-[63.2px] flex justify-center items-center "
          id={count}
        ></div>
      );
      count--;
    }

    if (i % 2 === 0) {
      showDivs.push(<div className="flex flex-row ">{newArr}</div>);
    } else {
      showDivs.push(<div className="flex flex-row-reverse ">{newArr}</div>);
    }
  }

  // other logics

  const [isGirlActive, setGirlActive] = useState(false);
  const [isBoyActive, setBoyActive] = useState(false);
  const [isBoyTurn, setBoyTurn] = useState(false);
  const [boyPosition, setBoyPosition] = useState(0);
  const [girlPosition, setGirlPosition] = useState(0);
  const [dice, setDice] = useState(0);

  const handleDiceChange = () => {
    let value = Math.floor(Math.random() * 6) + 1;

    if (boyPosition === 100 || girlPosition === 100) {
      return;
    }

    setDice(value);

    if (value !== 6) {
      setBoyTurn(!isBoyTurn);
    }

    if (isBoyTurn && value === 6) {
      setBoyActive(true);
    }

    if (!isBoyTurn && value === 6) {
      setGirlActive(true);
    }

    if (isGirlActive && !isBoyTurn) {
      if (girlPosition + value <= 100) {
        setGirlPosition(girlPosition + value);
      }
    }

    if (isBoyActive && isBoyTurn) {
      if (boyPosition + value <= 100) {
        setBoyPosition(boyPosition + value);
      }
    }
  };

  useEffect(() => {
    if (boyPosition !== 0) {
      handleSnakeBite(true, boyPosition);
      handleLadder(true, boyPosition);
      let block = document.getElementById(boyPosition);
      let boy = document.getElementById("boy");
      block.appendChild(boy);
    }
  }, [boyPosition]);

  useEffect(() => {
    if (girlPosition !== 0) {
      handleSnakeBite(false, girlPosition);
      handleLadder(false, girlPosition);
      let block = document.getElementById(girlPosition);
      let girl = document.getElementById("girl");
      block.appendChild(girl);
    }
  }, [girlPosition]);

  const handleSnakeBite = (isBoy, position) => {
    if (position === 47) {
      if (isBoy) {
        setBoyPosition(9);
      } else {
        setGirlPosition(9);
      }
    } else if (position === 96) {
      if (isBoy) {
        setBoyPosition(75);
      } else {
        setGirlPosition(75);
      }
    } else if (position === 62) {
      if (isBoy) {
        setBoyPosition(40);
      } else {
        setGirlPosition(40);
      }
    }
  };

  const handleLadder = (isBoy, position) => {
    if (position === 6) {
      if (isBoy) {
        setBoyPosition(46);
      } else {
        setGirlPosition(46);
      }
    } else if (position === 19) {
      if (isBoy) {
        setBoyPosition(43);
      } else {
        setGirlPosition(43);
      }
    } else if (position === 52) {
      if (isBoy) {
        setBoyPosition(71);
      } else {
        setGirlPosition(71);
      }
    } else if (position === 57) {
      if (isBoy) {
        setBoyPosition(98);
      } else {
        setGirlPosition(98);
      }
    }
  };

  return (
    <div className="w-full h-screen flex justify-around mt-10">
      <div className="w-[200px] text-center h-[150px] border">
        <div className="text-xl p-4 bg-blue-400 text-white">Start</div>
        <div className="flex justify-around mt-5">
          <div>
            <img
              src={boy}
              id="boy"
              alt=""
              className={`w-10 transition-transform ease-in-out duration-500 transform`}
            />
          </div>
          <div>
            <img
              src={girl}
              id="girl"
              alt=""
              className="w-10 transition-transform ease-in-out duration-500 transform"
            />
          </div>
        </div>
      </div>
      <div
        className={`w-[860px] h-[632px] object-fill bg-no-repeat grid`}
        style={css}
      >
        {showDivs}
      </div>
      <div>
        <div className="border flex flex-col justify-around">
          <span className="text-xl p-4 bg-blue-400 text-white">
            Who is Active
          </span>
          <span className="text-xl p-4 ">
            Girl :{" "}
            {isGirlActive ? (
              <span className="bg-green-500 p-2 text-white">Active</span>
            ) : (
              <span className="bg-red-500 p-2 text-white">inActive</span>
            )}
          </span>
          <span className="text-xl p-4 ">
            Boy :{" "}
            {isBoyActive ? (
              <span className="bg-green-500 p-2 text-white">Active</span>
            ) : (
              <span className="bg-red-500 p-2 text-white">inActive</span>
            )}
          </span>
        </div>

        <div className="border flex flex-col justify-around text-center mt-10">
          <span className="text-xl p-4 bg-blue-400 text-white">Turn</span>
          {isBoyTurn ? (
            <span className="text-xl p-4">Boy</span>
          ) : (
            <span className="text-xl p-4 ">Girl</span>
          )}
        </div>

        <div className="w-[120px] h-[120px] flex justify-center flex-col items-center border p-4 mt-5">
          <div>Dice</div>
          <div
            className="w-[100px] h-[100px] text-xl flex justify-center items-center border cursor-pointer  bg-blue-500 text-white"
            onClick={handleDiceChange}
          >
            {dice !== 0 ? dice : "Start"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
