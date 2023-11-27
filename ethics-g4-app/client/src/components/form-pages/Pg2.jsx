import SupervisorOptionsList from "../SupervisorOptionsList";
import { Button } from "../../styled/Form.styled";

function Pg2 ({formik}) {
  return (
    <>
      <div className="form-group">
        <label htmlFor="supervisor">Your supervisor</label>
        <select
          id="supervisor"
          name="supervisor"
          className="form-control"
          value={formik.values.supervisor}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
      </div>
    </>
    // <>

    //     <div className="form-group">
    //       <label htmlFor="Supervisor">
    //         Supervisor <span style={{ color: "red" }}>*</span>
    //       </label>
    //       <SupervisorOptionsList />
    //     </div>

    // </>
  );
};
export default Pg2;
