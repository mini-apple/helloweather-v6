import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { startFirebaseApp, auth } from "fbase";
import { onAuthStateChanged } from "firebase/auth";
import Box from "@mui/material/Box";

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
      {init ? (
        <Layout
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          userObj={userObj}
        />
      ) : (
        <Box>initializing....</Box>
      )}
    </>
  );
}

export default App;
