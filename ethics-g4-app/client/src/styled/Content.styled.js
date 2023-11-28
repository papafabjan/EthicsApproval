import styled from "styled-components";


 const Content = styled.div`
   border: 10px solid white;
   overflow-y: auto;
   float: bottom;
   width: 80%;
   margin: 0 auto;
   margin-top: 9vh;
   margin-bottom: 9vh;
   background-color: white;
   color: black;
   border-radius: 24px;
   height: 100vh;
   box-shadow: 0 0px 20px 0px rgba(0, 0, 0, 0.6);

   background: linear-gradient(
    0deg,
    #fdd5b1,
    #fff
  ); 

   /* width */
   &::-webkit-scrollbar {
     width: 10px;
     border-radius: 10px;
   }

   /* Track */
   &::-webkit-scrollbar-track {
     background: #f1f1f1;
   }

   /* Handle */
   &::-webkit-scrollbar-thumb {
     background: #888;
     border-radius: 10px;
   }

   /* Handle on hover */
   &::-webkit-scrollbar-thumb:hover {
     background: #555;
     border-radius: 10px;
   }

  .underlined {
     text-decoration: underline;
   } // page 0 of application REMOVE FROM HERE
 `;


export default Content;