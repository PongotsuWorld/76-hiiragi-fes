"use client"
import { ref, onChildAdded } from "firebase/database";
import { useState, useEffect, memo } from "react";

// eslint-disable-next-line react/display-name
const Clock = memo(() => {
  const [time, setTime] = useState('');

  const road_date = String(Date.now()) //文字のDate
  const road_date_num = Number(road_date) //上をナンバーに変換
  const road_datecut = Number(road_date.slice(0, -3)) //msをsに変換（1000 -> 1.000  小数点以下切り捨て）
  const setdate = Number(String(road_datecut + 1) + '000') //road_datecutに1秒足してmsに変換
  const time_difference = setdate - road_date_num //目標値(setdate)までのmsを算出

  const zeroPad = (num: number) => {
    const str = String(num)
    const pad = str.padStart(2, '0')
    return pad
  }
  
  const displayClock = () => {
    setInterval(function(){
      const date = new Date()
      const hh = zeroPad(date.getHours())
      const mm = zeroPad(date.getMinutes())
      const ss = zeroPad(date.getSeconds())
      const nowTime = `${hh}:${mm}:${ss}`
      setTime(nowTime)
    },1000)
  }
  
  setTimeout(displayClock, time_difference)

  return(time)
});

export default Clock;
