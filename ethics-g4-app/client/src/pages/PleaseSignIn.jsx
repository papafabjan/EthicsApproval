import React from 'react'

function PleaseSignIn() {

     const Login = () => {
       const str = `${import.meta.env.VITE_SERVER_URL}/auth/google`;
       window.open(str, "_self");
     };
     
  return (
    <>
      <button className="btn" onClick={Login}>
        Login
      </button>
    </>
  );
}

export default PleaseSignIn;