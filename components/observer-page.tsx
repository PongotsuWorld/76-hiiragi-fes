"use client";
import { useState, useEffect } from "react";
import { fsdb } from "../lib/database";
import { collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import VideoPlayer from "./videoplayer";
import "../styles/videos.css";

type StreamWithId = {
  senderId: string;
  stream: MediaStream;
};

export default function ReceiverPage() {
  const [roomId, setRoomId] = useState("");
  const [streams, setStreams] = useState<StreamWithId[]>([]);

  useEffect(() => {
    const rId = prompt("Room ID:") || "";
    setRoomId(rId);

    const pcs: Record<string, RTCPeerConnection> = {};

    const unsub = onSnapshot(collection(fsdb, "rooms", rId, "senders"), snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === "added") {
          const senderId = change.doc.id;
          const data = change.doc.data();
          if (!data.offer) return;

          // 既に同じsenderIdのPCがあれば破棄（多重作成防止）
          if (pcs[senderId]) {
            pcs[senderId].close();
          }

          const pc = new RTCPeerConnection();
          pcs[senderId] = pc;

          // トラック受信時にMediaStreamをstateに登録
          pc.ontrack = e => {
            setStreams(prev => {
              // 重複追加防止
              if (prev.find(s => s.senderId === senderId)) return prev;
              return [...prev, { senderId, stream: e.streams[0] }];
            });
          };

          pc.onicecandidate = async e => {
            if (e.candidate) {
              await addDoc(
                collection(fsdb, "rooms", rId, "senders", senderId, "candidates_receiver"),
                e.candidate.toJSON()
              );
            }
          };

          await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          await updateDoc(doc(fsdb, "rooms", rId, "senders", senderId), {
            answer: {
              type: answer.type,
              sdp: answer.sdp
            }
          });

          // 送信者側ICE候補監視
          onSnapshot(
            collection(fsdb, "rooms", rId, "senders", senderId, "candidates_sender"),
            snapshot => {
              snapshot.docChanges().forEach(async change => {
                if (change.type === "added") {
                  await pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                }
              });
            }
          );
        }
      });
    });

    return () => {
      unsub();
      // PeerConnectionを全部閉じる
      Object.values(pcs).forEach(pc => pc.close());
    };
  }, []);

  return (
    <div className="app">
      {streams.map(({ senderId, stream }) => (
        <VideoPlayer key={senderId} stream={stream} />
      ))}
    </div>
  );
}
