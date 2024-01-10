// MyForm.jsx
import React, { useContext, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../UserContext";
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
  // StartDate: yup.string().required("Start Date is required"),
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

const Form = () => {
  //apply mode
  // Get the application_id from the URL params
  const { applicationId } = useParams();
  const location = useLocation();
  const mode = location.state?.mode || "apply";
  
  //review mode
  const sessionUser = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const userId = sessionUser.id;
  const navigate = useNavigate();

  const totalSteps = 9;

  console.log(mode);
  console.log(applicationId);
  useEffect(() => {
    if ((mode==="view"|| mode === "review") && applicationId) {
      const fetchApplicationData = async () => {
        try {
          const response = await fetch(
            `${
              import.meta.env.VITE_SERVER_URL
            }/api/applications/${applicationId}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch application data");
          }

          const { application, application_content: content } =
            await response.json();

          // Update formik values with the fetched content data
          formik.setValues((prevValues) => {
            const updatedValues = { ...prevValues, ...content };
            return updatedValues;
          });

          console.log("Successfully fetched application data");

        } catch (error) {
          console.error("Error:", error.message);
          // Handle errors as needed
        }
      };

      // Call the fetchApplicationData function
      fetchApplicationData();
    } else {
      // Function to fetch user data by user ID
      const fetchUserData = async () => {
        try {
          // Check if userId is truthy before attempting to fetch user data
          if (userId) {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/users/${userId}`
            );

            if (!response.ok) {
              throw new Error("Failed to fetch user data");
            }

            const user = await response.json();
            setUserData(user); // Set the user data in the state
          }
        } catch (error) {
          console.error("Error:", error.message);
          // Handle errors as needed
        }
      };

      // Call the fetchUserData function
      fetchUserData();
    }
  }, [mode, applicationId, userId]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (mode === "review" && applicationId) {
        //get user_id through the google_id stored in session
        const fetchUserIdByGoogleId = async (googleId) => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/users/${googleId}`
            );

            // Check if the response is successful (status code 2xx)
            if (!response.ok) {
              throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();

            // Assuming the response has a property named user_id
            const userID = data.user_id;

            // Use userID as needed
            console.log("User ID:", userID);

            return userID;
          } catch (error) {
            // Handle errors
            console.error("Error fetching user ID:", error.message);
            throw error; // You can choose to handle or propagate the error
          }
        };

        const sendCommentsToServer = async () => {
          try {
            // Assuming this is an asynchronous function in an async context (e.g., within an async function or using await)
            const userID = await fetchUserIdByGoogleId(userId);

            // Use userID as needed
            console.log("User ID:", userID);

            const commentFields = Object.keys(formik.values).filter((key) =>
              key.toLowerCase().includes("comment")
            );

            const comments = commentFields.map((field) => ({
              field,
              content: formik.values[field],
            }));

            console.log(
              "Sending comments to server" + JSON.stringify(comments, null, 2)
            );

            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/comments/add`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  comments,
                  applicationId,
                  userId: parseInt(userID),
                }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to save comments");
            }

            console.log("Comments saved successfully");

            window.location.href="/dashboard";

          } catch (error) {
            console.error("Error:", error.message);
          }
        };

        sendCommentsToServer();
      } else {
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
            console.log({ userID, values });
            throw new Error("Failed to submit application");
          }

          const responseData = await response.json();
          console.log("Application submitted successfully:", responseData);
          window.location.href = "/myapplications";
        } catch (error) {
          console.error("Error:", error.message);
        }
      }

    },
  });

  const [step, setStep] = React.useState(0);
  const loggedIn = sessionUser && sessionUser.loggedIn;

  const handleStart = () => {
    setStep(1);
  };
  const handlePrevious = () => {

    if(mode === 'review' && step === 1) {
      navigate("/dashboard");
    }
    if (mode === "view" && step === 1) {
      navigate("/myapplications");
    }
    setStep((prevStep) => prevStep - 1);
    console.log(formik.isValid);
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
    // if (!formik.isValid) {
    //   return;
    // }
    // Change the mode to 'apply' before submitting
    const submitMode = mode === "review" ? "apply" : mode;
    formik.handleSubmit();
  };

  const renderFormStep = () => {
    switch (step) {
      case 0:
        //if application is being rereviewed there is no reason to show the explanation page
        if (mode === "review" || mode === "view") {
          setStep(1);
        }
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
            <NavigationButtons>
              <Button
                className="btn"
                onClick={handlePrevious}
                disabled={isFirstStep}
              >
                Previous
              </Button>

              {mode === "view" ? (
                <Button
                  className="btn"
                  onClick={()=>{
                    console.log("Redirected to MyApplications!");
                    navigate("/myapplications");
                  }}
                  type="submit"
                >
                  Finished
                </Button>
              ) : (
                <Button
                  className="btn"
                  onClick={handleSubmit}
                  disabled={!formik.isValid}
                  type="submit"
                >
                  Submit
                </Button>
              )}
            </NavigationButtons>
          </div>
        );
      default:
        
        if(loggedIn){

          return (
            <div>
            <h1>Form Page {step}</h1>
            {step === 1 && (
              <Pg1
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
            )}
            {step === 2 && (
              <Pg2
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
            )}
            {step === 3 && (
              <Pg3
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
            )}
            {step === 4 && (
              <Pg4
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
            )}
            {step === 5 && (
              <Pg5
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
            )}
            {step === 6 && (
              <Pg6
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
            )}
            {step === 7 && (
              <Pg7
                formik={formik}
                emphasizeFields={formik.errors}
                mode={mode}
              />
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
      }else{
        return <div>Please Sign In To Continue</div>
      }
    }
  };

  return <>{renderFormStep()}</>;
};

export default Form;
