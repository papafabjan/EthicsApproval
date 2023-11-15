import StyledHome from "../styled/Home.styled";

const REACT_APP_SERVER_URL = "http://localhost:4000";

const Home = () => {

  const Login =() =>{
    const str = `${REACT_APP_SERVER_URL}/auth/google`;
    window.open(str, "_self");
  }
  

  return (
    <>
      <StyledHome>
        <h1>Home Page Here</h1>
        <button className="btn" onClick={Login}>Login</button>
      </StyledHome>
    </>
  );
};

export default Home;
