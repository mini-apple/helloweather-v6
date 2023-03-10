import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { startFirebaseApp, auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    console.log("login: ", isLoggedIn);

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid,
          email: user.email,
          provider: user.providerData[0].providerId,
          updateProfile: (args) => user.updateProfile(args),
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Layout
          init={init}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
