import React, { useState, useEffect } from "react";
import Comment from "../Comment";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function Pg1({ formik, emphasizeFields, mode }) {
  const user = useContext(UserContext);
  const [departments, setDepartments] = useState([]);
  if (mode === "apply") {
    useEffect(() => {
      if (user && user.loggedIn) {
        // Fetch departments from API
        fetch(`${import.meta.env.VITE_SERVER_URL}/api/departments`)
          .then((response) => response.json())
          .then((data) => {
            setDepartments(data);
          })
          .catch((error) =>
            console.error("Error fetching departments:", error)
          );
      }
    }, []);
  }
  function splitUsername(username) {
    const names = username.split(" ");
    // If there are 2 or more names, assume the first is the first name,
    // the last is the last name, and the ones in between are middle names.
    if (names.length >= 2) {
      const firstName = names[0];
      const lastName = names[names.length - 1];
      const middleName = names.slice(1, -1).join(" "); // Join middle names with spaces
      return { firstName, middleName, lastName };
    } else {
      // If there's only one name or none, consider it as the first name.
      return { firstName: username, middleName: "", lastName: "" };
    }
  }
  // Set the form data based on the user's information
  if (user && user.username) {
    const userNames = splitUsername(user.username);

    return (
      <>
        <div className="form-container">
          <div className="form-group">
            <label htmlFor="firstName">
              First Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              placeholder={userNames.firstName}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // style={{
              //   borderColor:
              //     emphasizeFields?.firstName && formik.touched?.firstName
              //       ? "red"
              //       : "",
              // }}
              disabled={mode === "review" || mode === "view"}
            />

            {/* {formik.touched.firstName && formik.errors.firstName && (
              <div style={{ color: "red" }}>{formik.errors.firstName}</div>
            )} */}
            {/* Comment component for the "firstName" field */}
            {mode === "review" && (
              <Comment
                fieldName="firstName"
                comment={formik.values.firstNameComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>

          {userNames.middleName && (
            <div className="form-group">
              <label htmlFor="MiddleName">
                Middle Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                className="form-control"
                name="middleName"
                id="MiddleName"
                placeholder={userNames.middleName}
                value={formik.values.middleName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // style={{
                //   borderColor:
                //     emphasizeFields?.middleName && formik.touched?.middleName
                //       ? "red"
                //       : "",
                // }}
                disabled={mode === "review" || mode === "view"}
              />
              {/* Comment component for the "middleName" field */}
              {mode === "review" && (
                <Comment
                  fieldName="middleName"
                  comment={formik.values.middleNameComment}
                  onCommentSave={(fieldName, comment) =>
                    formik.setFieldValue(`${fieldName}Comment`, comment)
                  }
                />
              )}
              {/* {formik.touched.middleName && formik.errors.middleName && (
                <div style={{ color: "red" }}>{formik.errors.middleName}</div>
              )} */}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="lastName">
              Last Name <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              placeholder={userNames.lastName}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // style={{
              //   borderColor:
              //     emphasizeFields?.lastName && formik.touched?.lastName
              //       ? "red"
              //       : "",
              // }}
              disabled={mode === "review" || mode === "view"}
            />
            {/* {formik.touched.lastName && formik.errors.lastName && (
              <div style={{ color: "red" }}>{formik.errors.lastName}</div>
            )} */}
            {/* Comment component for the "lastName" field */}
            {mode === "review" && (
              <Comment
                fieldName="lastName"
                comment={formik.values.lastNameComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              Email <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder={user.email}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // style={{
              //   borderColor:
              //     emphasizeFields?.email && formik.touched?.email ? "red" : "",
              // }}
              disabled={mode === "review" || mode === "view"}
            />
            {/* {formik.touched.email && formik.errors.email && (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            )} */}
            {/* Comment component for the "email" field */}
            {mode === "review" && (
              <Comment
                fieldName="email"
                comment={formik.values.emailComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="studentRegistration">
              Student registration number{" "}
              <span style={{ color: "red" }}>*</span>
            </label>

            <input
              type="text"
              id="studentRegistration"
              name="studentRegistration"
              className="form-control"
              placeholder="e.g. CSS12345"
              value={formik.values.studentRegistration}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              // style={{
              //   borderColor:
              //     emphasizeFields?.studentRegistration &&
              //     formik.touched?.studentRegistration
              //       ? "red"
              //       : "",
              // }}
              disabled={mode === "review" || mode === "view"}
            />
            {/* Comment component for the "studentRegistration" field */}
            {mode === "review" && (
              <Comment
                fieldName="studentRegistration"
                comment={formik.values.studentRegistrationComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>

          <div className="form-group">
            <label htmlFor="Department">
              Department enrolled to <span style={{ color: "red" }}>*</span>
            </label>
            {departments.length > 0 ? (
              <select
                id="Department"
                name="Department"
                className="form-control"
                value={formik.values.Department}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // style={{
                //   borderColor:
                //     emphasizeFields?.Department && formik.touched?.Department
                //       ? "red"
                //       : "",
                // }}
                disabled={mode === "review" || mode === "view"}
              >
                <option value="" label="Select a Department" />
                {departments.map((department) => (
                  <option
                    key={department.id}
                    value={department.code}
                    label={department.name}
                  />
                ))}
              </select>
            ) : (
              <p>No departments found.</p>
            )}
            {/* {formik.touched.Department && formik.errors.Department && (
              <div style={{ color: "red" }}>{formik.errors.Department}</div>
            )} */}
            {/* Comment component for the "Department" field */}
            {mode === "review" && (
              <Comment
                fieldName="Department"
                comment={formik.values.DepartmentComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>
          {formik.values.Department !== "" && (
            <div className="form-group">
              <label htmlFor="programme">
                Programme enrolled to <span style={{ color: "red" }}>*</span>
              </label>
              <select
                id="programme"
                name="programme"
                className="form-control"
                value={formik.values.programme}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                // style={{
                //   borderColor:
                //     emphasizeFields?.programme && formik.touched?.programme
                //       ? "red"
                //       : "",
                // }}
                disabled={mode === "review" || mode === "view"}
              >
                <option value="" label="Select a programme" />
                {formik.values.Department === "BAED" && (
                  <option
                    value="MBIT"
                    label="MSc Business Informatics and Management (MBIT)"
                  />
                )}
                {formik.values.Department === "COM" && (
                  <>
                    <option
                      value="MSc in Web and Mobile Development"
                      label="MSc in Web and Mobile Development"
                    />
                    <option
                      value="MSc in Software Development"
                      label="MSc in Software Development"
                    />
                    <option
                      value="MSc in AI and Data Science"
                      label="MSc in AI and Data Science"
                    />
                    <option
                      value="MSc in Advanced Software Engineering"
                      label="MSc in Advanced Software Engineering"
                    />
                  </>
                )}
                <option value="BSc" label="BSc (any track)" />
              </select>
              {/* {formik.touched.programme && formik.errors.programme && (
                <div style={{ color: "red" }}>{formik.errors.programme}</div>
              )} */}
              {/* Comment component for the "programme" field */}
              {mode === "review" && (
                <Comment
                  fieldName="programme"
                  comment={formik.values.programmeComment}
                  onCommentSave={(fieldName, comment) =>
                    formik.setFieldValue(`${fieldName}Comment`, comment)
                  }
                />
              )}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="supervisor">Your supervisor <span style={{ color: "red" }}>*</span></label>
            <select
              id="supervisor"
              name="supervisor"
              className="form-control"
              value={formik.values.supervisor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={mode === "review" || mode === "view"}
            >
              <option value="" label="Select a supervisor" />
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
                value="pkaralis@york.citycollege.eu"
                label="Panagiotis Karalis <pkaralis@york.citycollege.eu>"
              />
              <option
                value="mmandravelis@york.citycollege.eu"
                label="Markos Darlas Mandravelis <mmandravelis@york.citycollege.eu>"
              />
              <option
                value="mpolyzoidis@york.citycollege.eu"
                label="Marios Mclyfe <mpolyzoidis@york.citycollege.eu>"
              />
              <option
                value="bpireva@york.citycollege.eu"
                label="Bindi Pireva <bpireva@york.citycollege.eu>"
              />
              <option
                value="fpapa@york.citycollege.eu"
                label="Fabian Papa <fpapa@york.citycollege.eu>"
              />
              <option
                value="scarimproved@gmail.com"
                label="Scar Polyie <scarimproved@gmail.com>"
              />
              <option
                value="okpanagiwths@gmail.com"
                label="P karalis<okpanagiwths@gmail.com>"
              />
            </select>

            {/* {formik.touched.supervisor && formik.errors.supervisor && (
              <div style={{ color: "red" }}>{formik.errors.supervisor}</div>
            )} */}
            {/* Comment section for Supervisor */}
            {mode === "review" && (
              <Comment
                fieldName="supervisor"
                comment={formik.values.supervisorComment}
                onCommentSave={(fieldName, comment) =>
                  formik.setFieldValue(`${fieldName}Comment`, comment)
                }
              />
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <div>Please log-in </div>;
  }
}

export default Pg1;
