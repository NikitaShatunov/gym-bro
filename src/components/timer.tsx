import axios from "axios";
import React from "react";
import { setTimeout } from "worker-timers";


export const Timer = () => {
  const [btn, setbtn] = React.useState(true)
  const [audio] = React.useState(new Audio('/img/alarm.mp3'));
  const [hours, setHours] = React.useState<number>(0);
  const [min, setMin] = React.useState<number>(0);
  const [sec, setSec] = React.useState<number>(0);
  const [time, setTime] = React.useState<number >(0);
  React.useEffect(() => {
    audio.load();
  }, [audio]);
  React.useEffect(() => {
    setTime((hours * 3600 + min * 60 + sec)*1000);
    console.log(time);
    
  },[hours, min, sec, time])
  const playSound = () => {
    audio.play();
    console.log('timer');
    
  };
  function formatTime(totalSeconds: number): string {
        const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
        const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
        const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
      }
  
const onClickButton = () => {
  setbtn(!btn)
  if(btn) {
    setTimeout(() => {
      playSound()
    }, time);
    setTimeout(() => {
      setTime(time - 1000)
    }, 1000)
  }
}

  
  return <>
  <div className="timer__wrapper"> 
  <input value={hours} onChange={(e) => setHours(+e.target.value)} type="number" />
  <div className="dots">:</div>
  <input value={min} onChange={(e) => setMin(+e.target.value)} type="number" />
  <div className="dots">:</div>
  <input value={sec} onChange={(e) => setSec(+e.target.value)} type="number" />
 {
  btn ?  <button onClick={() => onClickButton()}>СТАРТ</button> :  <button onClick={() => onClickButton()}>СТОП</button>
 }
  </div>
  </>;
};


//const [time, setTime] = React.useState('');
// const [start, setStart] = React.useState('');
//   React.useEffect(() => {
//     axios
//       .get(
//         `\http://api.timezonedb.com/v2.1/get-time-zone?key=R78Y91VC9WU1&format=xml&by=zone&zone=Europe/Kyiv`
//       )
//       .then((array) => setTime(array.data))
//       .catch((err) => {});
//   }, []);
//   React.useEffect(() => {
//     if (time) {
//         const parser = new DOMParser();
// const xmlDoc = parser.parseFromString(time, "text/xml");
// const formattedTime = xmlDoc.getElementsByTagName("formatted")[0].childNodes[0].nodeValue;
// const t : any = formattedTime?.split(' ')[1]
//     setStart(t)   
//     }
//   }, [time]);
//   function formatTime(totalSeconds: number): string {
//     const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, "0");
//     const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, "0");
//     const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
//     return `${hours}:${minutes}:${seconds}`;
//   }
  
//   function parseTime(timeString: string): number {
//     const [hours, minutes, seconds] = timeString.split(":").map(Number);
//     return hours * 3600 + minutes * 60 + seconds;
//   }
//   if(start){
//     console.log(formatTime(parseTime(start) + parseTime(timer)));
//   }