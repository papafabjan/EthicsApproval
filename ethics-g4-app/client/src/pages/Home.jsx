import StyledHome from "../styled/Home.styled";
import { useEffect, useState } from "react";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/account`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <StyledHome>
        <div>
          {userData === null ? (
            ""
          ) : userData.loggedIn === true ? (
            <div>
              <img
                src={userData.img}
                alt="User Profile"
                referrerPolicy="no-referrer"
              />
              <h1>Welcome, {userData.username}!</h1>
              <p>Email: {userData.email}</p>
              <p>Google-ID: {userData.id}</p>
              <p>Role: {userData.role}</p>
            </div>
          ) : (
            <>
              <p>User not logged in.</p>
            </>
          )}
        </div>
      </StyledHome>
    </>
  );
};

export default Home;
