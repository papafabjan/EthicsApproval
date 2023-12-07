// MyForm.jsx
import React from "react";
import { useFormik } from "formik";

import * as yup from "yup";
import { NavigationButtons } from "../../styled/Form.styled";
import { Button } from "../../styled/Form.styled";
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
  middleName: yup.string().required("Middle Name is required"),
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
  CoApplicantName: yup.string().required("CoApllicant's Name is required"),
  CoApplicantEmail: yup.string().required("CoApllicant's Email is required"),
  StartDate: yup.string().required("Start Date is required"),
  Funding: yup
    .string()
    .required("Please select a funding option")
    .oneOf(["Other", "No"], "Please select a funding option"),
  FundingOther: yup.string().when("Funding", {
    is: (value) => value === "Other",
    then: yup
      .string()
      .required("FundingOther is required when selecting 'Yes'"),
  }),
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
  Methodology:"",
  SafetyConcerns:"",
  SensitiveTopics:"",
  SensitiveTopicsFiles: [],


  // Page4
  PotentialParticipants: "",
  RecruitingPotentialParticipants: "",
  Payment: "",
  otherPaymentOption:"",
  PotentialHarm: "",
  VulnerableParticipants: "",
  otherVulnerableParticipantsOptions:"",

  // Page5:
  //Yes child
  ParentalConsent: [],
  ParentalInformation: [],
  ChildInformation: [],
  HeadTeacherConsent: [],
  HeadteacherInformation: [],
  AccessibleConsentMaterial: [],
  ProxyConsentProcedure: [],
  ParticipantInformation: [],
  ParticipantConsent: [],
  ParticipantDebriefing: [],
  AccessibilityLetter: [],

  //Yes adults mental

  //No or other option
  ParticipantInformationForm: "",
  ParticipantConsentForm: "",
  DebriefingForm: "",
  
  // Page6
  DataProcessing: "",
  DataConfidentiality: "",
  DataStorageandSecurity: "",

  // Page7:
  ListofQuestions: "",
  AdditionalForms: "",
  test:"",
  radioOption:"",
  otherOption:"",
  checkboxOption: [],
  otherCheckboxOption: "",
};
const MyForm = () => {
  const totalSteps = 9;

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
  
  const handleStart = () => {
    setStep(1);
  };
  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };
  
  
  const isLastStep = step === totalSteps - 1;
  const isFirstStep = step === 0;
  
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
    if (!formik.isValid) {
      return;
    }

    formik.handleSubmit();
  };

  const renderFormStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <Pg0 formik={formik} />
            <Button className="btn" onClick={handleStart}>Start</Button>
          </div>
        );
      case totalSteps - 1:
        return (
          <div>
            <h1>Last Page</h1>
            {/* ... (other content) */}
            <NavigationButtons>
              <Button className="btn" onClick={handlePrevious} disabled={isFirstStep}>
                Previous
              </Button>
              <Button className="btn"
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
            {step === 2 && <Pg2 formik={formik } emphasizeFields={formik.errors} />}
            {step === 3 && (
              <Pg3 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 4 && (
              <Pg4 formik={formik} emphasizeFields={formik.errors} />
            )}
            {step === 5 && (
              <Pg5 formik={formik}emphasizeFields={formik.errors} />
            )}
            {step === 6 && (
              <Pg6 formik={formik}  emphasizeFields={formik.errors}/>
            )}
            {step === 7 && (
              <Pg7 formik={formik}  emphasizeFields={formik.errors}/>
            )}

            {/* Render other steps as needed */}
            {/* ... */}
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