import { useState } from 'react'

const START: string = `Pačać`;
const STOP: string = `Spynić`;
const CONTINUE: string = `Praciahnuć`;

const Stopwatch = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasBegun, setHasBegun] = useState<boolean>(false);
  const [switchBtnLabel, setSwitchBtnLabel] = useState<string>(START);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [records, setRecords] = useState<Array<Date>>([]);
  const [error, setError] = useState({ status: false })

  const start = () => {
    if (!isRunning) {
      setIntervalId(
        window.setInterval(() => {
          setCounter(prevState => prevState + 10);
        }, 10)
      );
      setSwitchBtnLabel(STOP);
      setIsRunning(true);
      setHasBegun(true);

      error.status && setError({ status: false });
    } else {
      clearInterval(intervalId);
      setSwitchBtnLabel(CONTINUE);
      setIsRunning(false);
    }
  }

  const reset = () => {
    clearInterval(intervalId);
    setSwitchBtnLabel(START);
    setIsRunning(false);
    setHasBegun(false);
    setCounter(0);
    setRecords([]);
  }

  const record = () => isRunning ? setRecords(prevState => prevState.concat([new Date(counter)])) : setError({ status: true })

  const formatDate = (date: Date) => `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds() / 10}`

  return (
    <div>
      <h1>Siekundamier</h1>
      <h2>{formatDate(new Date(counter))}</h2>
      <button onClick={start}>{switchBtnLabel}</button>
      {hasBegun && <button onClick={reset}>Skinuć</button>}
      {isRunning && <button onClick={record}>Zapis</button>}
      {records.length ?
        <ul>
          {records.map((item, index) => <li key={`counter_` + index}>{formatDate(item)}</li>)}
        </ul> : ""
      }
    </div>
  )
}

export default Stopwatch
