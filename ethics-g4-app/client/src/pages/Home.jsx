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
        <div className="container">
          {userData === null ? (
            ""
          ) : userData.loggedIn === true ? (
            <div className="user-profile">
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
            <div className="welcome">
              <h1>Welcome to Ethics Approval</h1>
              <p>
                This website contains information about obtaining approval to
                conduct research with 3rd party participants. If you are a
                student or staff member of the University of York, Europe
                campus, and you are planning on performing research that
                involves any form of data collection by primary research, you
                are required before the start of the data collection to have
                obtained approval by the Ethics committee of your Department.
              </p>
              <p>
                If you want to apply for Ethics Approval, visit the section{" "}
                <a href="/guides/applicant">Guide for Applicants</a>, where you
                will find information about how to apply. Please read that
                section carefully before proceeding to completing the
                application. It might also be useful for you to also visit the
                section <a href="/guides/reviewer">Guide for Reviewers</a>, in
                order to understand how your application will be reviewed and
                thus decrease the time to obtaining the approval. If you are a
                supervisor please also read the section{" "}
                <a href="/guides/supervisor">Guide for Supervisors</a>. To
                actually apply, you need to complete the form located in the
                section Apply here. In order to apply, you will need to create a
                few documents (depending on your application). You can find
                templates to modify and submit with your application, in the
                Document templates section. If you are a project supervisor or
                ethics reviewer, you should visit the section{" "}
                <a href="/guides/reviewer">Guide for Reviewers</a>. There you
                will find information about what to look for in an application.
              </p>
              <p>
                It is advised to log-in using your academic Google account if
                available.
              </p>
              <p>
                Feel free to explore the available options and get familiar with
                the ethics approval process.
              </p>
            </div>
          )}
        </div>
      </StyledHome>
    </>
  );
};

export default Home;
