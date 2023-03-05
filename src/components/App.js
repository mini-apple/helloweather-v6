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
      if (user) {
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
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
