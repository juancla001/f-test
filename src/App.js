import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(1)
  const [intervalId, setIntervalId] = useState(0)
  const [result, setResult] = useState([])
  const [from, setFrom] = useState(0)
  const [to, setTo] = useState(0)

  const fromRef = useRef(from)
  const inputFrom = useRef(null)
  const inputTo = useRef(null)


  fromRef.current = from
  const intervalIdRef = useRef(intervalId)
  intervalIdRef.current = intervalId

  const deleteInterval = () => {
    clearInterval(intervalId)
    setIntervalId(0)
  }

  const handleButtonIniciar = () => {
    if (intervalId !== 0) {
      deleteInterval()
      setResult([])
      setFrom(parseInt(inputFrom.current.value))
      setTo(parseInt(inputTo.current.value))
      return
    }

    const id = setInterval(() => {
      if (fromRef.current >= to) {
        deleteInterval()
      }
      let newResult = result
      result.push(fromRef.current)
      setResult(newResult)
      setFrom(from => from + 1)
    }, timer * 1000)

    setIntervalId(id)
  }

  useEffect(() => {
    return () => clearInterval(intervalId)
  }, [intervalId])

  return (
    <>
      <div className="container">
        <h3>Evaluacion</h3>
        <div className="row">
          <div className="col d-flex flex-column">
            <label htmlFor="entero">
                T:
              <input
                type="number"
                className="m-1"
                name="entero"
                placeholder="tipo entero"
                onChange={(e) => setTimer(parseInt(e.target.value))}
              />
            </label>
            <label htmlFor="menorB">
                A:
              <input
                type="number"
                className="m-1"
                name="menorB"
                placeholder="menor a B"
                ref={inputFrom}
                onChange={(e) => setFrom(parseInt(e.target.value))}
              />
            </label>
            <label htmlFor="menorA">
                B:
              <input
                type="number"
                className="m-1"
                name="menorA"
                placeholder="menor a A"
                ref={inputTo}
                onChange={(e) => setTo(parseInt(e.target.value))}
              />
            </label>
            <button
              type="text"
              className="btn btn-outline-primary"
              onClick={() => handleButtonIniciar()}
            >
              { intervalId === 0 ? 'Iniciar' : 'Detener'}
            </button>
          </div>
          <div className="col">
            {result.join('')}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
