// MyForm.jsx
import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavigationButtons } from "../../styled/Form.styled";
import { Button } from "../../styled/Form.styled";
import Pg0 from "./Pg0";
import Pg1 from "./Pg1";
import Pg2 from "./Pg2";
import Pg3 from "./Pg3";
// Import other page components as needed
// ... Import other page components

const validationSchema = yup.object({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .matches(
      /^.+(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Email is invalid."
    ).required("Email is required"),
  studentRegistration: yup
    .string()
    .required("Student registration number is required"),
  programme: yup.string().required("Programme selection is required"),

  supervisor: yup.string().required("Supervisor selection is required"),
  ResearchProject:yup.string().required("ResearchProject is required"),
  CoApllicantName:yup.string().required("CoApllicant's Name is required"),
  CoApllicantEmail:yup.string().required("CoApllicant's Email is required"),

});

const initialValues = {
  //Page 1
  firstName: "",
  middlename: "",
  lastName: "",
  email: "",
  studentRegistration: "",
  programme: "",
  supervisor: "",

  //Page 2
  ResearchProject: "",
  CoApplicantName: "",
  CoApplicantEmail: "",
  StartDate: "",
  EndDate: "",
  Funding: "",
  Country: [
  ],
  OtherCountry: "",
  ProjectPlace: "",
  HealthSocialCare: "",
  AnotherInstitution: "",
  AnotherInstitutionInput:"",
  HumanTissue: "",
  ClinicalMedical: "",
  SocialCareServices: "",

  //Page7:
  ParentalConsentForm: "",
  ParentalInformationForm: "",
  HeadTeacherConsentForm: "",
  HeadteacherInformationForm: "",

  //Page8:
  ParticipantInformationForm: "",
  ParticipantConsentForm: "",
  DebriefingForm: "",
  AccessibilityLetter: "",

  //Page9
  DataProcessing: "",
  DataConfidentiality: "",
  DataStorageandSecurity: "",

  //Page10:
  ListofQuestions: "",
  AdditionalForms: "",
};
const MyForm = () => {
  const totalSteps = 12;

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // Handle form submission logic here
      fetch(`${import.meta.env.VITE_SERVER_URL}/api/testapplications/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ values }),
      })
        .then((response) => response.json())
        .catch((error) => console.error("Error posting application:", error));
      window.location.reload(true);
    },
  });

  const [step, setStep] = React.useState(0);

  const handleNext = () => {
   const errors = formik.errors;
   let errorMessage = "";
    // Check for errors in the current step
    if (step === 1) { 
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
        alert(errorMessage);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    } else if (step === 2) {

      if (errors.supervisor) {
        // There are errors in the current step, handle them as needed
        errorMessage = "Incomplete: ";
        errorMessage += Object.values(errors).filter(Boolean).join(", ");
        console.error("Validation error:", errors);
        alert(errorMessage);
      } else {
        // No errors, proceed to the next step
        setStep((prevStep) => prevStep + 1);
      }
    }
    // Add more conditions for other steps as needed
  };


  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleStart = () => {
    setStep(1);
  };

  const isLastStep = step === totalSteps - 1;
  const isFirstStep = step === 0;

  const handleSubmit = () => {
    if (formik.isValid) {
      formik.handleSubmit();
    }
  };

  const renderFormStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <Pg0 formik={formik} />
            <Button onClick={handleStart}>Start</Button>
          </div>
        );
      case totalSteps - 1:
        return (
          <div>
            <h1>Last Page</h1>
            {/* ... (other content) */}
            <NavigationButtons>
              <Button onClick={handlePrevious} disabled={isFirstStep}>
                Previous
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formik.isValid}
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
              <Pg1 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 2 && (
              <Pg2 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 3 && <Pg3 formik={formik} />}
            {step === 4 && <Pg4 formik={formik} />}
            {/* Render other steps as needed */}
            {/* ... */}
            <NavigationButtons>
              <Button onClick={handlePrevious} disabled={isFirstStep}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={isLastStep}>
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
