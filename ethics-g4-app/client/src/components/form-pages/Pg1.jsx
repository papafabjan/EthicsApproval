import OptionsList from "../OptionsList";
import { UserContext } from "../UserContext";
import { useContext, useState } from "react";

export const Pg1 = () => {
  const user = useContext(UserContext);
  // Set the form data based on the user's information
  const userNames = splitUsername(user.username);
  const { firstName, middleName, lastName } = userNames;
  const initialFormData = {
    firstName,
    middleName,
    lastName,
  };
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: user.email || "", // Set default email
    studentRegistration: "",
    program: "",
  });
const [isProgramOpen, setIsProgramOpen] = useState(false);


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

  // Update form data when the user changes
  useState(() => {
    setFormData(initialFormData);
  }, [user.username]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleProgramToggle = () => {
    setIsProgramOpen(!isProgramOpen);
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="FirstName">
            First Name <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="FirstName"
            placeholder="e.g Christina,Fabian,Nikos, etc."
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        {middleName && (
          <div className="form-group">
            <label htmlFor="MiddleName">Middle Name</label>
            <input
              type="text"
              className="form-control"
              id="MiddleName"
              placeholder="e.g Mary"
              value={formData.middleName}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="LastName">
            Last Name <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="LastName"
            placeholder="e.g Smith"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="eMail">
            Email <span style={{ color: "red" }}>*</span>{" "}
          </label>
          <input
            type="text"
            className="form-control"
            id="eMail"
            placeholder="example@given.com"
            value={user.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label for="StudentRegistration">
            Student registration number <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            className="form-control"
            id="StudentRegistration"
            placeholder="e.g. CSS12345"
          />
        </div>
        <div className="form-group">
          <div className="collapsible-list">
            <div className="collapsible-header" onClick={handleProgramToggle}>
              <label htmlFor="Program">
                Program you are enrolled at{" "}
                {isProgramOpen ? (
                  <>
                    <i className="fa-solid fa-chevron-up"></i>{" "}
                    <span style={{ color: "red" }}>*</span>{" "}
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-chevron-down"></i>{" "}
                    <span style={{ color: "red" }}>*</span>{" "}
                  </>
                )}{" "}
              </label>
            </div>
            {isProgramOpen && (
              <div className="collapsible-content">
                <OptionsList />
              </div>
            )}
          </div>
        </div>
      </form>
    </>
  );
};
