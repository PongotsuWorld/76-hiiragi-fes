"use client"

import { signInWithEmailAndPassword } from 'firebase/auth';
import Image from "next/image";
import { useState } from "react";
import ID from "../../../public/id.svg";
import Password from "../../../public/password.svg";
import "../auth.css";
import { auth } from '../../cuecard/database';
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const router = useRouter();
  const [idContent, setIDContent] = useState("");
  const [passContent, setPassContent] = useState("");

  const signInWithEmail = (user: string, password: string) => {
    const email = `hiiragidata+${user}@gmail.com`
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      router.push("/auth/success")
    })
    .catch((error) => {
      alert("IDまたはパスワードが間違えています")
      setIDContent("");
      setPassContent("");
    });
  }

  return (
    <div className="app">
      <title>SIGNIN</title>
      <p className="titleText">SIGNIN</p>
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
          SIGNIN
        </button>
      </div>
    </div>
  )
}

export default SignIn;