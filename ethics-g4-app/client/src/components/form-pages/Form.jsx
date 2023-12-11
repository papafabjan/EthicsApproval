// MyForm.jsx
import React, { useContext, useState, useEffect } from "react";
import { useFormik } from "formik";
import { UserContext } from "../UserContext";
import * as yup from "yup";
import { NavigationButtons } from "../../styled/Form.styled";
import { Button } from "../../styled/Form.styled";
import Dashboard from '../../pages/Dashboard';
import Pg0 from "./Pg0";
import Pg1 from "./Pg1";
import Pg2 from "./Pg2";
import Pg3 from "./Pg3";
import Pg4 from "./Pg4";
import Pg5 from "./Pg5";
import Pg6 from "./Pg6";
import Pg7 from "./Pg7";

const validationSchema = yup.object({
  // Page 1
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .matches(
      /^.+(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid."
    )
    .required("Email is required"),
  studentRegistration: yup
    .string()
    .required("Student registration number is required"),
  programme: yup.string().required("Programme selection is required"),

  supervisor: yup.string().required("Supervisor selection is required"),
  // Page 2
  ResearchProject: yup.string().required("ResearchProject is required"),
  // CoApplicantName: yup.string().required("CoApllicant's Name is required"),
  // CoApplicantEmail: yup.string().required("CoApllicant's Email is required"),
  StartDate: yup.string().required("Start Date is required"),
});

const initialValues = {
  // Page 1
  firstName: "",
  middlename: "",
  lastName: "",
  email: "",
  studentRegistration: "",
  programme: "",
  supervisor: "",

  // Page 2
  ResearchProject: "",
  CoApplicantName: "",
  CoApplicantEmail: "",
  StartDate: "",
  EndDate: "",
  Funding: "",
  FundingOther: "",
  Country: [],
  OtherCountry: "",
  ProjectPlace: "",
  HealthSocialCare: "",
  AnotherInstitution: "",
  AnotherInstitutionOther: "",
  HumanTissue: "",
  ClinicalMedical: "",
  SocialCareServices: "",

  // Page 3
  AimsObjectives: "",
  Methodology: "",
  SafetyConcerns: "",
  SensitiveTopics: "",
  SensitiveTopicsFiles: [],

  // Page4
  PotentialParticipants: "",
  RecruitingPotentialParticipants: "",
  Payment: "",
  otherPaymentOption: "",
  PotentialHarm: "",
  VulnerableParticipants: "",
  otherVulnerableParticipantsOptions: "",

  // // Page5:
  // //Yes child
  ParentalConsent: [],
  ParentalInformation: [],
  ChildInformation: [],
  HeadTeacherConsent: [],
  HeadteacherInformation: [],

  // //Yes adults mental
  AccessibleConsentMaterial: [],
  ProxyConsentProcedure: [],

  // //No or other option
  ParticipantInformation: [],
  ParticipantConsent: [],
  ParticipantDebriefing: [],
  AccessibilityLetter: [],

  // Page6
  DataProcessing: "",
  DataConfidentiality: "",
  DataStorageandSecurity: "",

  // // Page7:
  ListofQuestions: "",
  AdditionalForms: "",
};
const MyForm = ({ showComments }) => {

  const totalSteps = 9;

  const sessionUser = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const userId = sessionUser.id;

  useEffect(() => {
    // Function to fetch user data by user ID
    const fetchUserData = async () => {
      try {
        console.log(userId);
        const response = await fetch(
          
          `${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const user = await response.json();
        setUserData(user); // Set the user data in the state
      } catch (error) {
        console.error("Error:", error.message);
        // Handle errors as needed
      }
    };

    // Call the fetchUserData function
    fetchUserData();
    console.log(userData);
  }, [userId]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userID = userData.user_id;
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/applications/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userID, values }),
          }
        );

        if (!response.ok) {
          console.log({userID, values});
          throw new Error("Failed to submit application");
        }

        const responseData = await response.json();
        console.log("Application submitted successfully:", responseData);
      } catch (error) {
        console.error("Error:", error.message);
        // Handle errors as needed
      }

      window.location.reload(true);

    },
  });

  const [step, setStep] = React.useState(0);

  const handleStart = () => {
    setStep(1);
  };
  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
    console.log(formik.isValid);
  };

  const isLastStep = step === totalSteps - 1;
  const isFirstStep = step === 0;
  {showComments && (
    <div>
      {/* Render input fields for comments here */}
      {/* Example text area */}
      <textarea
        placeholder="Type your comments here..."
        rows={4}
        cols={50}
        // You can handle the input changes as per your logic
      />
      {/* Example input field */}
      {/* <input
        type="text"
        placeholder="Type your comments here..."
        // You can handle the input changes as per your logic
      /> */}
    </div>
  )}
  const handleNext = async () => {
    const errors = formik.errors;
    let errorMessage = "";

    // Check for errors in the current step
    if (step === 1) {
      // Validate a specific field (e.g., firstName)
      try {
        await yup
          .reach(validationSchema, `firstName`)
          .validate(formik.values.firstName, { abortEarly: false });
      } catch (error) {
        // Handle the validation error
        console.error("Validation error for firstName:", error.message);
      }
      if (
        errors.firstName ||
        errors.lastName ||
        errors.email ||
        errors.studentRegistration ||
        errors.programme ||
        errors.supervisor
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 2) {
      if (
        errors.ResearchProject ||
        errors.CoApplicantName ||
        errors.CoApplicantEmail ||
        errors.StartDate ||
        errors.EndDate ||
        errors.Funding ||
        errors.FundingOther ||
        errors.Country ||
        errors.ProjectPlace ||
        errors.HealthSocialCare ||
        errors.AnotherInstitution ||
        errors.AnotherInstitutionOther ||
        errors.HumanTissue ||
        errors.ClinicalMedical ||
        errors.SocialCareServices
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 3) {
      if (
        errors.AimsObjectives ||
        errors.Methodology ||
        errors.SafetyConcerns ||
        errors.SensitiveTopics
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 4) {
      if (
        errors.PotentialParticipants ||
        errors.RecruitingPotentialParticipants ||
        errors.Payment ||
        errors.otherPaymentOption ||
        errors.PotentialHarm ||
        errors.VulnerableParticipants ||
        errors.otherVulnerableParticipantsOptions
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 5) {
      if (
        errors.ParentalConsent ||
        errors.ParentalInformation ||
        errors.HeadTeacherConsent ||
        errors.HeadteacherInformation ||
        errors.ParticipantInformationForm ||
        errors.ParticipantConsentForm ||
        errors.DebriefingForm ||
        errors.AccessibilityLetter
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 6) {
      if (
        errors.DataProcessing ||
        errors.DataConfidentiality ||
        errors.DataStorageandSecurity
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 7) {
      if (
        errors.ListofQuestions ||
        errors.AdditionalForms ||
        errors.test ||
        errors.radioOption ||
        errors.otherOption ||
        errors.checkboxOption ||
        errors.otherCheckboxOption
      ) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    }
    // Add more conditions for other steps as needed
  };

  const handleSubmit = () => {
    // Don't submit if the form is currently submitting or has errors
    // if (!formik.isValid) {
    //   return;
    // }
    formik.handleSubmit();
  };

  const renderFormStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <Pg0 formik={formik} />
            <Button className="btn" onClick={handleStart}>
              Start
            </Button>
          </div>
        );
      case totalSteps - 1:
        return (
          <div>
            <h1>Last Page</h1>
            {/* ... (other content) */}
            <NavigationButtons>
              <Button
                className="btn"
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                Previous
              </Button>
              <Button
                className="btn"
                onClick={handleSubmit}
                // disabled={!formik.isValid}
                type="submit"
              >
                Submit
              </Button>
            </NavigationButtons>
          </div>
        );
      default:
        // Render other steps (Pg1, Pg2, etc.)
        return (
          <div>
            <h1>Form Page {step}</h1>
            {/* Import and render the appropriate component for each step */}
            {/* Example: */}
            {step === 1 && (
              <Pg1 formik={formik} emphasizeFields={formik.errors} showComments={showComments}/>
            )}
            {step === 2 && (
              <Pg2 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 3 && (
              <Pg3 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 4 && (
              <Pg4 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 5 && (
              <Pg5 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 6 && (
              <Pg6 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 7 && (
              <Pg7 formik={formik} emphasizeFields={formik.errors} />
            )}

            <NavigationButtons>
              <Button
                className="btn"
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                Previous
              </Button>
              <Button
                className="btn"
                onClick={handleNext}
                disabled={isLastStep}
              >
                Next
              </Button>
            </NavigationButtons>
            <pre>{JSON.stringify(formik.values, null, 3)}</pre>
          </div>
        );
        
    }
  };

  return <>{renderFormStep()}</>;
};

export default MyForm;
