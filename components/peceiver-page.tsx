"use client"

import ContentReceiver from "./contentReceiver";
import Clock from "./clock"
import { useState } from "react";
import "../styles/receiver.css";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const ReceiverPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [btnState, changeState] = useState(false);

  const changeBtnState = () => {
    changeState(!btnState)
  }

  console.log(btnState)
  return(
    <>
      <div className="receiverBox">
        <p className={`${roboto.className} clock ${btnState? 'full' : ''}`}><Clock /></p>
        <p className={`receiverText ${btnState? 'hide' : ''}`}><ContentReceiver /></p>
      </div>
      <button id="changeButton" onClick={changeBtnState}></button>
    </>
  )
};

export default ReceiverPage;