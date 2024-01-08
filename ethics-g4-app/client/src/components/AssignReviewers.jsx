import React, { useState, useEffect } from "react";

function AssignReviewers({applicationId}) {
  const [selectedReviewers, setSelectedReviewers] = useState([]);
  const [riskLevel, setRiskLevel] = useState("");
  const [existingReviewers, setExistingReviewers] = useState([]);


  useEffect(() => {
    // Fetch existing reviewers for the application
    fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/reviewer/existing-reviewers?applicationId=${applicationId}`
    )
      .then((response) => response.json())
      .then((data) => {
        // Set the existing reviewers in state
        setExistingReviewers(data.reviewers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [applicationId]);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (riskLevel === "high" && selectedReviewers.length < 2) {
      // Handle the case when high risk is selected but less than 2 reviewers are selected
      console.log("How?");
      return;
    }

    // Send request to endpoint with selectedReviewers
    fetch(`${import.meta.env.VITE_SERVER_URL}/api/reviewer/assign-reviewer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicationId: parseInt(applicationId), // Use the applicationId from useParams() and parse it as an INTEGER
        reviewers: selectedReviewers,
        role: "reviewer", // Add the fixed role since this component is for reviewers only
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data if needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error(error);
      });

    window.location.reload(true);
  };

  useEffect(() => {
    // Reset selected reviewers when risk level changes
    setSelectedReviewers([]);
  }, [riskLevel]);

  return (
    <>
      {existingReviewers.length > 0 && (
        <div>
          <h2>Existing Reviewers:</h2>
          {existingReviewers.map((reviewer) => (
            <div key={reviewer.id}>{reviewer.username}</div>
          ))}
          <br />
          <br />
        </div>
      )}
      <div>
        <div className="form-group">
          <label htmlFor="riskLevel">Select High or Low risk</label>
          <div>
            <label htmlFor="highRisk">
              <input
                type="radio"
                id="highRisk"
                name="riskLevel"
                value="high"
                checked={riskLevel === "high"}
                onChange={(e) => setRiskLevel(e.target.value)}
              />
              High Risk
            </label>
          </div>
          <div>
            <label htmlFor="lowRisk">
              <input
                type="radio"
                id="lowRisk"
                name="riskLevel"
                value="low"
                checked={riskLevel === "low"}
                onChange={(e) => setRiskLevel(e.target.value)}
              />
              Low Risk
            </label>
          </div>
        </div>
        {riskLevel === "high" && (
          <div className="form-group">
            <label htmlFor="reviewer">Assign reviewer(s)</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="k.dimopoulos@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "k.dimopoulos@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Kostas Dimopoulos &lt;k.dimopoulos@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="dranidis@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "dranidis@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Dimitris Dranidis &lt;dranidis@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="oefremidis@athtech.gr"
                  checked={selectedReviewers.includes("oefremidis@athtech.gr")}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Odysseas Efremidis &lt;oefremidis@athtech.gr&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="diracleous@athtech.gr"
                  checked={selectedReviewers.includes("diracleous@athtech.gr")}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Dimitris Irakleous &lt;diracleous@athtech.gr&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="kefalas@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "kefalas@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Petros Kefalas &lt;kefalas@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="ketkidis@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "ketkidis@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Panagiotis Ketikidis &lt;ketikidis@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="emattheopoulou@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "emattheopoulou@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Evi Mattheopoulou &lt;emattheopoulou@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="jnikolakopoulos@athtech.gr"
                  checked={selectedReviewers.includes(
                    "jnikolakopoulos@athtech.gr"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Ioannis Nikolakopoulos &lt;jnikolakopoulos@athtech.gr&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="paraskakis@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "paraskakis@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Iraklis Paraskakis &lt;paraskakis@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="sotiriadou@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "sotiriadou@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Anna Sotiriadou &lt;sotiriadou@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="istamatopoulou@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "istamatopoulou@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Ioanna Stamatopoulou &lt;istamatopoulou@york.citycollege.eu&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="tvarsamidis@athtech.gr"
                  checked={selectedReviewers.includes("tvarsamidis@athtech.gr")}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Thomas Varsamidis &lt;tvarsamidis@athtech.gr&gt;
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  value="s.veloudis@york.citycollege.eu"
                  checked={selectedReviewers.includes(
                    "s.veloudis@york.citycollege.eu"
                  )}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedReviewers((prevReviewers) => {
                      if (prevReviewers.includes(value)) {
                        return prevReviewers.filter(
                          (reviewer) => reviewer !== value
                        );
                      } else {
                        return [...prevReviewers, value];
                      }
                    });
                  }}
                />{" "}
                Simos Veloudis &lt;s.veloudis@york.citycollege.eu&gt;
              </label>
            </div>
          </div>
        )}
        {riskLevel === "low" && (
          <div className="form-group">
            <label htmlFor="reviewer">Assign reviewer(s)</label>
            <select
              className="form-control"
              value={selectedReviewers[0] || ""}
              onChange={(e) => setSelectedReviewers([e.target.value])}
            >
              <option value="">Select a reviewer</option>
              <option
                value="k.dimopoulos@york.citycollege.eu"
                label="Kostas Dimopoulos <k.dimopoulos@york.citycollege.eu>"
              />
              <option
                value="dranidis@york.citycollege.eu"
                label="Dimitris Dranidis <dranidis@york.citycollege.eu>"
              />
              <option
                value="oefremidis@athtech.gr"
                label="Odysseas Efremidis <oefremidis@athtech.gr>"
              />
              <option
                value="diracleous@athtech.gr"
                label="Dimitris Irakleous <diracleous@athtech.gr>"
              />
              <option
                value="kefalas@york.citycollege.eu"
                label="Petros Kefalas <kefalas@york.citycollege.eu>"
              />
              <option
                value="ketikidis@york.citycollege.eu"
                label="Panagiotis Ketikidis <ketikidis@york.citycollege.eu>"
              />
              <option
                value="emattheopoulou@york.citycollege.eu"
                label="Evi Mattheopoulou <emattheopoulou@york.citycollege.eu>"
              />
              <option
                value="jnikolakopoulos@athtech.gr"
                label="Ioannis Nikolakopoulos <jnikolakopoulos@athtech.gr>"
              />
              <option
                value="paraskakis@york.citycollege.eu"
                label="Iraklis Paraskakis <paraskakis@york.citycollege.eu>"
              />
              <option
                value="sotiriadou@york.citycollege.eu"
                label="Anna Sotiriadou <sotiriadou@york.citycollege.eu>"
              />
              <option
                value="istamatopoulou@york.citycollege.eu"
                label="Ioanna Stamatopoulou <istamatopoulou@york.citycollege.eu>"
              />
              <option
                value="tvarsamidis@athtech.gr"
                label="Thomas Varsamidis <tvarsamidis@athtech.gr>"
              />
              <option
                value="s.veloudis@york.citycollege.eu"
                label="Simos Veloudis <s.veloudis@york.citycollege.eu>"
              />
              <option
                value="scarimproved@gmail.com"
                label="Scar Polyie <scarimproved@gmail.com>"
              />
            </select>
          </div>
        )}
        <button type="button" onClick={(e) => handleFormSubmit(e)}>
          Submit
        </button>
      </div>
    </>
  );
}

export default AssignReviewers;
