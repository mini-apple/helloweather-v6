import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { startFirebaseApp, auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("user: ", Boolean(user), user);
      if (user) {
        setUserObj(user);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <Layout
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        userObj={userObj}
      />
    </>
  );
}

export default App;
