"use client"

import { ref, push } from "firebase/database";
import { rtdb } from "../lib/database";
import { useState } from "react";
import ContentReceiver from "./contentReceiver";
import "../styles/sender.css"
import Image from "next/image";
import Send from "../public/send.svg"

const dbRef = ref(rtdb, "contents");


const sendContent = (messageContent: string) => {
  const date = new Date();
  const nowDate =  `${(`0${date.getHours()}`).slice(-2)}:${(`0${date.getMinutes()}`).slice(-2)}:${(`0${date.getSeconds()}`).slice(-2)}`;
  
  push(dbRef, {
    date: nowDate,
    content: messageContent
  });
}

const SendTB = (props: {children: string}) => {
  return(
    <button
        className="sendTemplateButton"
        onClick={() => sendContent(props.children)}
    >{props.children}</button>
  )
}
const CueSenderPage = () => {
  const [content, setContent] = useState("");
  const removeValue = () => {
    setContent("");
  }
  const [content_late, setContent_late] = useState("");
  return(
    <div className="app">
      <title>Sender</title>
      <div className="templateCueBox">
        <SendTB>✕✕✕✕✕✕✕✕</SendTB>
        <SendTB>◎◎◎◎◎◎</SendTB>
        <div className="senderBox_late">
          <input
            className="senderInput_late"
            value={content_late}
            type="text"
            onChange={(e) => setContent_late(e.target.value)}
          />
          <button
            className="sendButton_late"
            onClick={
              () => {
                sendContent(content_late+"分押し");
              }
            }
          >
            <Image src={Send} alt="送信アイコン"></Image>
          </button>
        </div>
      </div>
      <div className="senderBox">
        <input
          className="senderInput"
          value={content}
          type="text"
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="sendButton"
          onClick={
            () => {
              sendContent(content);
              removeValue();
            }
          }
        >
          <Image src={Send} alt="送信アイコン"></Image>
        </button>
      </div>
      <p className="cue">現在のキュー: <ContentReceiver /></p>
    </div>
  )
};

export default CueSenderPage;
