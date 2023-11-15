import styled from "styled-components";


 const Content = styled.div`
   border: 10px solid blue;
   overflow-y: auto;
   float: bottom;
   width: 80%;
   margin: 0 auto;
   margin-top: 15vh;
   background-color: white;
   color: black;
   border-radius: 24px;
   height: 100vh;

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
 `;


export default Content;