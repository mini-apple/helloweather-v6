import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
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
          email: user.email,
          provider: user.providerData[0].providerId,
        });
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  const refreshUserObj = () => {
    const user = auth.currentUser;
    setUserObj({
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      email: user.email,
      provider: user.providerData[0].providerId,
    });
  };

  return (
    <>
      <BrowserRouter>
        <Layout
          init={init}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
          refreshUserObj={refreshUserObj}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
