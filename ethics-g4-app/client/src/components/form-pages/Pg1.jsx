import OptionsList from "../OptionsList";
import { useState } from "react";

export function Pg1( { formData, setFormData }) {

  const [isProgramOpen, setIsProgramOpen] = useState(false);

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
            onChange={(event) => setFormData({...formData, firstName: event.target.value })}
          />

        </div>

        <div className="form-group">
          <label htmlFor="MiddleName">
            Middle Name <span style={{ color: "red" }}>*</span>{" "}
          </label>

          <input
            type="text"
            className="form-control"
            id="MiddleName"
            placeholder="e.g Mary"
            value={formData.middleName}
            onChange={(event) => setFormData({...formData, middleName: event.target.value })}
          />

        </div>

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
            onChange={(event) => setFormData({...formData, lastName: event.target.value })}
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
            value={formData.email}
            onChange={(event) => setFormData({...formData, email: event.target.value })}
          />

        </div>

        <div className="form-group">

          <label htmlFor="StudentRegistration">
            Student registration number <span style={{ color: "red" }}>*</span>
          </label>

          <input
            type="text"
            className="form-control"
            id="StudentRegistration"
            placeholder="e.g. CSS12345"
            value={formData.studentRegistration}
            onChange={(event) => setFormData({...formData, studentRegistration: event.target.value })}
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

export default Pg1;
