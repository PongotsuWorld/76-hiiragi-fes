"use client";
import { useState, useRef } from "react";
import { fsdb } from "../lib/database";
import {
  doc, setDoc, onSnapshot, collection, addDoc
} from "firebase/firestore";
import "../styles/videos.css";

const VideoSenderPage = () => {

  const [roomId, setRoomId] = useState("");
  const [senderId, setSenderId] = useState("");
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localVideoRef = useRef<HTMLVideoElement>(null);

  const startSending = async () => {
    const rId = prompt("Room ID:") || crypto.randomUUID();
    const sId = crypto.randomUUID();
    setRoomId(rId);
    setSenderId(sId);

    const pc = new RTCPeerConnection();
    pcRef.current = pc;

    // カメラ取得
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    localVideoRef.current!.srcObject = stream;
    stream.getTracks().forEach(track => pc.addTrack(track, stream));

    // ICE候補をFirestoreへ
    pc.onicecandidate = async e => {
      if (e.candidate) {
        await addDoc(collection(fsdb, "rooms", rId, "senders", sId, "candidates_sender"), e.candidate.toJSON());
      }
    };

    // Offer作成
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    // Firestoreには普通のオブジェクトとして保存
    await setDoc(doc(fsdb, "rooms", rId, "senders", sId), {
      offer: {
        type: offer.type,
        sdp: offer.sdp
      }
    });

    // Answer監視
    onSnapshot(doc(fsdb, "rooms", rId, "senders", sId), async snap => {
      const data = snap.data();
      if (data?.answer && !pc.currentRemoteDescription) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
      }
    });

    // 受信側ICE候補監視
    onSnapshot(collection(fsdb, "rooms", rId, "senders", sId, "candidates_receiver"), snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === "added") {
          await pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
        }
      });
    });
  };

  return (
    <div className="app">
      <video ref={localVideoRef} autoPlay playsInline muted className="SenderVideo" />
      <button onClick={startSending} className="SendButton">Start Sending</button>
    </div>
  );
}

export default VideoSenderPage;
