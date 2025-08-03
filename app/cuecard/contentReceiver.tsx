"use client"
import { ref, onChildAdded } from "firebase/database";
import { db } from "./database";
import { useState, useEffect, memo } from "react";

const dbRef = ref(db, "contents");

// eslint-disable-next-line react/display-name
const ContentReceiver = memo(() => {
  const [loadedContent, setLoadedContent] = useState<string>("");
  useEffect(() => {
    onChildAdded(dbRef, (snapshot) => {
      let data = snapshot.val();
      console.log(data.content);
      setLoadedContent(data.content);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbRef]);

  console.log(`useState:${loadedContent}`)
  return(loadedContent)
});

export default ContentReceiver;
