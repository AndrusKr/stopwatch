import Button from '@mui/material/Button/Button';
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography/Typography';
import { useState } from 'react'
import Grid from '@mui/material/Grid';

const Stopwatch = () => {
  const [counter, setCounter] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasBegun, setHasBegun] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<number>(0);
  const [records, setRecords] = useState<Array<Date>>([]);

  const start = () => {
    setIntervalId(
      window.setInterval(() => {
        setCounter(prevState => prevState + 10);
      }, 10)
    );
    setIsRunning(true);
    setHasBegun(true);
  }

  const pause = () => {
    clearInterval(intervalId);
    setIsRunning(false);
  }

  const reset = () => {
    clearInterval(intervalId);
    setIsRunning(false);
    setHasBegun(false);
    setCounter(0);
    setRecords([]);
  }

  const record = () => isRunning && setRecords(prevState => prevState.concat([new Date(counter)]))

  const formatDate = (date: Date) => `${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds() / 10}`

  return (
    <div>
      <Typography variant="h1" component="h1">
        Siekundamier
      </Typography>
      <Typography fontSize={"400px"} variant="h2" component="h2">
        {formatDate(new Date(counter))}
      </Typography>
      <Button
        size="large"
        onClick={start}
        startIcon={
          <AlarmOnIcon color={hasBegun ? "disabled" : "primary"} />
        }
        disabled={hasBegun}
      >
        Pačać
      </Button>
      <Button
        size="large"
        onClick={pause}
        startIcon={<PauseIcon color={!isRunning ? "disabled" : "primary"} />}
        disabled={!isRunning}
      >
        Spynić
      </Button>
      <Button
        size="large"
        onClick={start}
        startIcon={
          <PlayArrowIcon color={(!hasBegun && !isRunning) || (hasBegun && isRunning) ? "disabled" : "primary"} />
        }
        disabled={(!hasBegun && !isRunning) || (hasBegun && isRunning)}
      >
        Praciahnuć
      </Button>
      <Button
        size="large"
        onClick={reset}
        startIcon={<RestartAltIcon color={!hasBegun ? "disabled" : "primary"} />}
        disabled={!hasBegun}
      >
        Skinuć
      </Button>
      <Button
        size="large"
        onClick={record}
        startIcon={<NoteAddIcon color={!isRunning ? "disabled" : "primary"} />}
        disabled={!isRunning}
      >
        Zapis
      </Button>
      <Grid container justifyContent = {"space-evenly"}>
        <Grid>
          <List>
            {records.map((item, index) =>
              <ListItem>
                <ListItemText primary={<Typography variant="h4">{index + 1 + ") " + formatDate(item)}</Typography>} />
              </ListItem>)
            }
          </List>
        </Grid>
      </Grid>
    </div>
  )
}

export default Stopwatch
