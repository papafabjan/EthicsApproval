// import Login from "../components/Login";
// import Logout from "../components/Logout";
// import { useEffect, useState } from "react";
// import { gapi } from "gapi-script";

// const clientId =
//   "234032534695-le6b5c8v50m281nir50fl1ohgb1qr5cv.apps.googleusercontent.com";

// function LoginPage() {
//   const { userInfo, setUserInfo } = useState(null);

//   useEffect(() => {
//     function start() {
//       gapi.client.init({
//         clientId: clientId,
//         scope: "",
//       });
//     }

//     gapi.load("client: auth2", start);
//   });

//   return (
//     <>
//       <Login />
//       <Logout />
//       <div className="container-fluid mt-3"></div>
//     </>
//   );
// }

// export default LoginPage;
