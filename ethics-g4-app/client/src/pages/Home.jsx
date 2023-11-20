import StyledHome from "../styled/Home.styled";
import { useEffect, useState } from "react";


const Home = () => {

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Make a request to your Express endpoint
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/account`, {
          credentials: 'include', // Include credentials (cookies) in the request
        });

        if (response.ok) {
          // If the request is successful, parse the JSON response
          const data = await response.json();
          setUserData(data);
        } else {
          // Handle error cases
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }); // Empty dependency array ensures the effect runs only once

 
  

  return (
    <>
      <StyledHome>
        <h1>Home Page Here</h1>
        <div>
          {userData ? (
            <div>
              <img src={userData.img} alt="User Profile" />
              <h1>Welcome, {userData.username} !</h1>
              <p>Email: {userData.email}</p>
              <p>Google-ID: {userData.id}</p>

              {/* Other user details */}
            </div>
          ) : (
            <p>User not logged in.</p>
          )}
        </div>
      </StyledHome>
    </>
  );
};

export default Home;
