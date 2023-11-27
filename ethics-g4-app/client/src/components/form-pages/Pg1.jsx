import { Button } from "../../styled/Form.styled";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";

function Pg1({ formik, emphasizeFields }) {
  const user = useContext(UserContext);

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
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div style={{ color: "red" }}>{formik.errors.firstName}</div>
          )}
        </div>

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
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style={{ color: "red" }}>{formik.errors.lastName}</div>
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
            style={{
              borderColor:
                emphasizeFields?.email && formik.touched?.email ? "red" : "",
            }}
          />
          {formik.touched.email && formik.errors.email && (
            <div style={{ color: "red" }}>{formik.errors.email}</div>
          )}
        </div>

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
          />
        </div>

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
    </>
  );
}

export default Pg1;
