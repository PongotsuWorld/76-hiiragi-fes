"use client"

import { createUserWithEmailAndPassword } from 'firebase/auth'
import Image from "next/image";
import { useState } from "react";
import ID from "../../../public/id.svg";
import Password from "../../../public/password.svg";
import "../auth.css";
import { auth } from '../../cuecard/database';

const SignUp = () => {
  const [idContent, setIDContent] = useState("");
  const [passContent, setPassContent] = useState("");

  const signInWithEmail = (user: string, password: string) => {
    const email = `hiiragidata+${user}@gmail.com`
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("success")
      alert("success")
      setIDContent("");
      setPassContent("");
    })
    .catch((error) => {
      console.log("error");
      alert("error")
    });
  }

  return (
    <div className="app">
      <title>SIGNUP</title>
      <p className="titleText">SIGNUP</p>
      <div className="signBox">
        <div className="inputBox">
          <input
            value={idContent}
            type="email"
            placeholder="UserID"
            onChange={(e) => setIDContent(e.target.value)}
          />
          <div className="inputImage">
            <Image src={ID} alt="Icon of ID" />
          </div>
        </div>
        <div className="inputBox">
          <input
            value={passContent}
            type="password"
            placeholder="Password"
            onChange={(e) => setPassContent(e.target.value)}
          />
          <div className="inputImage">
            <Image src={Password} alt="Icon of Password" />
          </div>
        </div>
        <button
          className="signButton"
          onClick={
            () => {
              signInWithEmail(idContent, passContent);
            }
          }
        >
          SIGNUP
        </button>
      </div>
    </div>
  )
}

export default SignUp;