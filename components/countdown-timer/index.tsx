import React, { useState, useEffect } from "react";

function calcDiffInMinutes(dateA, dateB) {
  let timeA = dateA.getTime()
  let timeB = dateB.getTime()
  return Math.floor(((timeA - timeB) / 1000) / 60) * -1; // TODO CALCULATIONS HERE
}

function formatDate(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

export default function CountdownTimer({ dateFromShow, dateFromCalc, dateFromText, dateToText }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [minutesDiff, setMinutesDiff] = useState(
    calcDiffInMinutes(currentDate, dateFromCalc)
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentDate]);

  useEffect(() => {
    setMinutesDiff(calcDiffInMinutes(currentDate, dateFromCalc));
  }, [currentDate, dateFromCalc]);

  return (
    <div>
      <div style={{textAlign: 'left'}}>{dateFromText} {formatDate(dateFromShow)}</div>
      <div style={{textAlign: 'left'}}>{dateToText} {minutesDiff} mins</div>
    </div>
  );
};