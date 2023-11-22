import React, { useState } from "react";
import { Pg0 } from "../components/form-pages/Pg0";
import { Pg1 } from "../components/form-pages/Pg1";
import { Pg2 } from "../components/form-pages/Pg2";
import { Pg3 } from "../components/form-pages/Pg3";
import { Pg4 } from "../components/form-pages/Pg4";
import { Pg5 } from "../components/form-pages/Pg5";
import { Pg6 } from "../components/form-pages/Pg6";
import { Pg7 } from "../components/form-pages/Pg7";
import { Pg8 } from "../components/form-pages/Pg8";
import { Pg9 } from "../components/form-pages/Pg9";
import { Pg10 } from "../components/form-pages/Pg10";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";

const handleSubmit = () => {
  // Perform form submission logic here
  // This function will be triggered when the submit button is clicked on the last page (Pg10)
  // Example: You can collect all form data from previous pages and submit it
  // You may use form data state or any other method to collect and submit the form data
  console.log("Submitting the form...");
};
const Application = () => {
    const user = useContext(UserContext);
    const [pgNo, setPgNo] = useState(0);
    const isLastPage = pgNo === 10;
    return (
      <div>
        <div>
          {user?.loggedIn === null ? (
            ""
          ) : user?.loggedIn === true ? (
            <>
              {pgNo == 0 ? (
                <Pg0 />
              ) : pgNo == 1 ? (
                <Pg1 />
              ) : pgNo == 2 ? (
                <Pg2 />
              ) : pgNo == 3 ? (
                <Pg3 />
              ) : pgNo == 4 ? (
                <Pg4 />
              ) : pgNo == 5 ? (
                <Pg5 />
              ) : pgNo == 6 ? (
                <Pg6 />
              ) : pgNo == 7 ? (
                <Pg7 />
              ) : pgNo == 8 ? (
                <Pg8 />
              ) : pgNo == 9 ? 
                <Pg9 />
                 : (
                <Pg10 />
              )}
            </>
          ) : (
            <>
              <h1>Please sign in</h1>
              <PleaseSignIn />
            </>
          )}
          <center>
            {pgNo > 0 && (
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => {
                  let pg = pgNo;
                  setPgNo(pg - 1);
                }}
                style={{ cursor: "pointer" }}
              >
                Back
              </button>
            )}
            {pgNo < 10 && (
              <button
                className="btn btn-primary mx-4"
                type="button"
                onClick={() => {
                  let pg = pgNo;
                  setPgNo(pg + 1);
                }}
                style={{ cursor: "pointer" }}
              >
                Next
              </button>
            )}
            {isLastPage && (
              <button
                  className="btn btn-primary mx-4"
            type="button"
            onClick={handleSubmit}
            style={{ cursor: "pointer" }}
          >
            Submit
          </button>
            )}
            

            
          </center>
          <center>{pgNo > 0 && <p>Page {pgNo} / 10</p>}</center>
        </div>
      </div>
    );
};

export default Application;