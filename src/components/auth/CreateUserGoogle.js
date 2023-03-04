import React, { useState } from "react";
import { auth } from "fbase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import Box from "@mui/material/Box";

const CreateUserGoogle = ({ setIsLoggedIn }) => {
  const onGoogleCreate = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
        console.log(credential, token, user);
        setIsLoggedIn(true);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <Box>
      <Box className="email-input-box-title">소셜 회원가입</Box>
      <button onClick={onGoogleCreate} className="btn-google">
        Google로 계정생성하기
      </button>
    </Box>
  );
};

export default CreateUserGoogle;
