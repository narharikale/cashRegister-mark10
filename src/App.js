import "./styles.css";
import React, { useState } from "react";

let notes = {
  1: "",
  5: "",
  10: "",
  50: "",
  100: "",
  200: "",
  500: "",
  2000: ""
};

let billAmount, cashGiven;

export default function App() {
  const [cashReturn, setCashReturn] = useState(notes);

  const notesArray = Object.keys(cashReturn).sort(function (a, b) {
    return b - a;
  });

  const [cashGivenDiv, setCashGivenDiv] = useState("none");

  const [errorDisplay, setErrorDisplay] = useState(["none", ""]);

  const [outputDisplay, setOutputDisplay] = useState("none");

  const [nextbtnDisplay, setNextbtnDisplay] = useState("block");

  function checkBtnHandler() {
    if (cashGiven > 0 && billAmount > 0) {
      if (Number.isInteger(cashGiven)) {
        if (cashGiven >= billAmount) {
          if (cashGiven == billAmount) {
            setOutputDisplay("none");
            setErrorDisplay(["block", "No amount should be returned"]);
            return;
          }
          setErrorDisplay(["none", ""]);
          setOutputDisplay("block");
          calculateNotes(cashGiven, billAmount);
          return;
        } else {
          setOutputDisplay("none");
          setErrorDisplay([
            "block",
            "Cash is less than bill amount,please give right amount"
          ]);
          return;
        }
      }
    } else {
      setOutputDisplay("none");
      setErrorDisplay(["block", "Enter valid billamount and cash given "]);
    }
  }
  const remaining = cashGiven - billAmount;
  //note count function
  function calculateNotes(cash, bill) {
    let diff = cash - bill;
    notesArray.map((note) => {
      let noteNo = Number(note);
      if (diff >= noteNo) {
        let count = Math.floor(diff / noteNo);
        diff = diff - noteNo * count;
        notes[noteNo] = count;
      } else {
        notes[noteNo] = "";
      }
    });
    setCashReturn(notes);
  }

  return (
    <div className="App main">
      <h1>Cash Counter</h1>
      <p>
        Enter the bill amount and cash given by the customer and know minimum
        number of notes to return.
      </p>
      <div>
        <div className="label">Bill Amount:</div>
        <input
          className="inputBox"
          type="number"
          id="billAmt"
          onChange={(e) => {
            billAmount = Number(e.target.value);
          }}
        />
        <button
          type="button"
          style={{ display: `${nextbtnDisplay}` }}
          className="btn btn-dark"
          onClick={() => {
            if (billAmount > 0) {
              setNextbtnDisplay("none");
              setErrorDisplay(["none", ""]);
              setCashGivenDiv("block");
            } else {
              setOutputDisplay("none");
              setErrorDisplay(["block", "Enter Valid Bill Amount"]);
            }
          }}
        >
          Next
        </button>

        <div style={{ display: `${cashGivenDiv}` }}>
          <div className="label">Cash Given:</div>
          <input
            className="inputBox"
            id="cashGiven"
            onChange={(e) => {
              cashGiven = Number(e.target.value);
            }}
          />
          <button className="checkBtn" onClick={checkBtnHandler}>
            Check
          </button>
        </div>
        <div style={{ display: `${errorDisplay[0]}` }} className="errorMsg">
          {errorDisplay[1]}
        </div>

        <div style={{ display: `${outputDisplay}` }} className="returnChange">
          <div className="label">Remaining Amount: {remaining}</div>
          <div className="output">
            <table>
              <tbody>
                <tr>
                  <th>No.of notes </th>
                  {notesArray.map((note) => {
                    return (
                      <td className="noOfNotes" key={note}>
                        {cashReturn[note]}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <th>Notes</th>
                  {notesArray.map((note) => {
                    return <td key={note}>{note}</td>;
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
