import React, { useState } from "react";
import Comment from "../Comment";
import { UserContext } from "../UserContext";
import { useContext } from "react";

function Pg1({ formik, emphasizeFields, mode }) {
  const user = useContext(UserContext);

  const [comment, setComment] = useState("");

  const handleCommentSave = (fieldName) => {
    // Save the comment to formik or perform any other actions as needed
    formik.setValues({
      ...formik.values,
      [fieldName]: comment,
    });
  };

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
  const userNames = splitUsername(user.username);

  return (
    <>
      <div>
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
            style={{
              borderColor:
                emphasizeFields?.firstName && formik.touched?.firstName
                  ? "red"
                  : "",
            }}
            disabled={mode === "view"}
          />

          {formik.touched.firstName && formik.errors.firstName && (
            <div style={{ color: "red" }}>{formik.errors.firstName}</div>
          )}
          {/* Comment component for the "firstName" field */}
          {mode === "view" && (
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
              style={{
                borderColor:
                  emphasizeFields?.middleName && formik.touched?.middleName
                    ? "red"
                    : "",
              }}
              disabled={mode === "view"}
            />
            {/* Comment component for the "middleName" field */}
             {mode === "view" && (
            <Comment
              fieldName="middleName"
              comment={formik.values.middleNameComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
            {formik.touched.middleName && formik.errors.middleName && (
              <div style={{ color: "red" }}>{formik.errors.middleName}</div>
            )}
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
            style={{
              borderColor:
                emphasizeFields?.lastName && formik.touched?.lastName
                  ? "red"
                  : "",
            }}
            disabled={mode === "view"}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style={{ color: "red" }}>{formik.errors.lastName}</div>
          )}
        </div>
             {/* Comment component for the "lastName" field */}
  {mode === "view" && (
            <Comment
              fieldName="lastName"
              comment={formik.values.lastNameComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}


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
            style={{
              borderColor:
                emphasizeFields?.email && formik.touched?.email ? "red" : "",
            }}
            disabled={mode === "view"}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>
            {/* Comment component for the "email" field */}
            {mode === "view" && (
            <Comment
              fieldName="email"
              comment={formik.values.emailComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}



        <div className="form-group">
          <label htmlFor="studentRegistration">
            Student registration number <span style={{ color: "red" }}>*</span>
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
            style={{
              borderColor:
                emphasizeFields?.studentRegistration &&
                formik.touched?.studentRegistration
                  ? "red"
                  : "",
            }}
            disabled={mode === "view"}
          />
        </div>
               {/* Comment component for the "studentRegistration" field */}
            {mode === "view" && (
            <Comment
              fieldName="studentRegistration"
              comment={formik.values.studentRegistrationComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}



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
            style={{
              borderColor:
                emphasizeFields?.programme && formik.touched?.programme
                  ? "red"
                  : "",
            }}
            disabled={mode === "view"}
          >
            <option value="" label="Select a programme" />
            <option
              value="MBIT"
              label="MSc Business Informatics and Management (MBIT)"
            />
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
            <option value="BSc" label="BSc (any track)" />
          </select>
          {formik.touched.programme && formik.errors.programme && (
            <div style={{ color: "red" }}>{formik.errors.programme}</div>
          )}
        </div>
      </div>
             {/* Comment component for the "programme" field */}
             {mode === "view" && (
            <Comment
              fieldName="programme"
              comment={formik.values.programmeComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}


      <div className="form-group">
        <label htmlFor="supervisor">Your supervisor</label>
        <select
          id="supervisor"
          name="supervisor"
          className="form-control"
          value={formik.values.supervisor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={mode === "view"}
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
          
      
        </select>
        
        {formik.touched.supervisor && formik.errors.supervisor && (
          <div style={{ color: "red" }}>{formik.errors.supervisor}</div>
        )}
        {/* Comment section for Supervisor */}
          {mode === "view" && (
            <Comment
              fieldName="supervisor"
              comment={formik.values.supervisorComment}
              onCommentSave={(fieldName, comment) =>
                formik.setFieldValue(`${fieldName}Comment`, comment)
              }
            />
          )}
      </div>
    </>
  );
}

export default Pg1;
