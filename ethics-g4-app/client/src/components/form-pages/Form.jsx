// Fetch requests for the initial apply and review features can be cut down by a lot. "View" "Edit" should be the simplest ones.
import React, { useContext, useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { UserContext } from "../UserContext";
import * as yup from "yup";
import { NavigationButtons } from "../../styled/Form.styled";
import { Button } from "../../styled/Form.styled";
import StyledForm from "../../styled/Form.styled";
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
  Department: yup.string().required("Department selection is required"),
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
  Department: "",
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

  // Page7
  ListofQuestions: [],
  AdditionalForms: [],
};

const Form = () => {
  //apply mode
  // Get the application_id from the URL params
  const { applicationId } = useParams();
  const location = useLocation();
  const mode = location.state?.mode || "apply";
  //edit mode
  const [fetchedComments, setFetchedComments] = useState([]);
  //review mode
  const sessionUser = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const userId = sessionUser.id;
  const navigate = useNavigate();

  const totalSteps = 9;

  // console.log(mode);
  // console.log(applicationId);
  useEffect(() => {
    if (mode === "apply") {
      formik.setValues(initialValues);
    }
  }, [mode]);

  const adaptValuesForSubmission = (values) => {
    const adaptedValues = { ...values };

    // Page3
    adaptedValues.SensitiveTopicsFiles = values.SensitiveTopicsFilesNames;


    // Page5: Yes child
    adaptedValues.ParentalConsent = values.ParentalConsentNames;
    adaptedValues.ParentalInformation = values.ParentalInformationNames;
    adaptedValues.ChildInformation = values.ChildInformationNames;
    adaptedValues.HeadTeacherConsent = values.HeadTeacherConsentNames;
    adaptedValues.HeadteacherInformation = values.HeadteacherInformationNames;

    // Page5: Yes adults mental
    adaptedValues.AccessibleConsentMaterial =
      values.AccessibleConsentMaterialNames;
    adaptedValues.ProxyConsentProcedure = values.ProxyConsentProcedureNames;

    // Page5: No or other option
    adaptedValues.ParticipantInformation = values.ParticipantInformationNames;
    adaptedValues.ParticipantConsent = values.ParticipantConsentNames;
    adaptedValues.ParticipantDebriefing = values.ParticipantDebriefingNames;
    adaptedValues.AccessibilityLetter = values.AccessibilityLetterNames;

    // Page7
    adaptedValues.DataProcessing = values.DataProcessingNames;
    adaptedValues.DataConfidentiality = values.DataConfidentialityNames;
    adaptedValues.DataStorageandSecurity = values.DataStorageandSecurityNames;

    adaptedValues.ListofQuestions = values.ListofQuestionsNames;
    adaptedValues.AdditionalForms = values.AdditionalFormsNames;

    return adaptedValues;
  };

  useEffect(() => {
    if (
      (mode === "view" || mode === "review" || mode === "edit") &&
      applicationId
    ) {
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

      if (mode === "edit") {
        const fetchComments = async () => {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/comments/${applicationId}`
            );
            const data = await response.json();
            console.log(data);
            setFetchedComments(data);
          } catch (error) {
            console.log(error);
          }
        };

        fetchComments();
      }
      // Call the functions
      fetchApplicationData();
    } else {
      // Function to fetch user data by user ID
      const fetchUserData = async () => {
        try {
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

            window.location.href = "/dashboard";
          } catch (error) {
            console.error("Error:", error.message);
          }
        };

        sendCommentsToServer();
      } else if (mode !== "review") {
        if (mode === "edit" && applicationId) {
          try {
            const response = await fetch(
              `${
                import.meta.env.VITE_SERVER_URL
              }/api/applications/edit/${applicationId}`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  application: adaptValuesForSubmission(values),
                  user: sessionUser,
                }),
              }
            );

            if (!response.ok) {
              console.log({ sessionUser, values });
              throw new Error("Failed to edit application");
            }

            const responseData = await response.json();
            console.log("Application edited successfully:", responseData);
            navigate("/myapplications");
            //  window.location.reload(true);
          } catch (error) {
            // Handle error or show notification to the user
            console.error(error.message);
          }
        }
        if (mode === "apply") {
          try {
            const userID = userData.user_id;
            const response = await fetch(
              `${import.meta.env.VITE_SERVER_URL}/api/applications/add`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userID,
                  values: adaptValuesForSubmission(values),
                }),
              }
            );

            if (!response.ok) {
              console.log({ userID, values });
              throw new Error("Failed to submit application");
            }

            const responseData = await response.json();
            console.log("Application submitted successfully:", responseData);
          } catch (error) {
            console.error("Error:", error.message);
          }
        }

        ////////////
        console.log("executing logic");
        async function executeLogicAndUploadFiles() {
          try {
            // Step 1: Execute logic and update application ID for the folder name
            const executeLogicResponse = await fetch(
              "http://localhost:4000/api/update-application-id",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  mode: mode,
                  applicationId: applicationId,
                }),
              }
            );

            if (!executeLogicResponse.ok) {
              throw new Error("Failed to execute logic");
            }

            // Step 2: Upload files to the correct folder
            const formData = new FormData();

            for (
              var i = 0;
              i < formik.values.SensitiveTopicsFiles.length;
              i++
            ) {
              formData.append("files", formik.values.SensitiveTopicsFiles[i]);
            }

            for (var i = 0; i < formik.values.AdditionalForms.length; i++) {
              formData.append("files", formik.values.AdditionalForms[i]);
            }

            formData.append("files", formik.values.ParentalConsent);
            formData.append("files", formik.values.ParentalInformation);
            formData.append("files", formik.values.ChildInformation);
            formData.append("files", formik.values.HeadTeacherConsent);
            formData.append("files", formik.values.HeadteacherInformation);
            formData.append("files", formik.values.AccessibleConsentMaterial);
            formData.append("files", formik.values.ProxyConsentProcedure);
            formData.append("files", formik.values.ParticipantInformation);
            formData.append("files", formik.values.ParticipantConsent);
            formData.append("files", formik.values.ParticipantDebriefing);
            formData.append("files", formik.values.AccessibilityLetter);
            formData.append("files", formik.values.ListofQuestions);

            console.log(formData);

            // Make the fetch request
            fetch("http://localhost:4000/api/multiple", {
              method: "POST",
              body: formData,
            })
              .then((response) => response.text()) // Use response.text() for non-JSON responses
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
              });
          } catch (error) {
            console.error("Error:", error);
          }
        }
        // Call the function
        executeLogicAndUploadFiles();

        ////////////
        navigate("/myapplications");
        //  window.location.reload(true);
      }
    },
  });

  const [step, setStep] = React.useState(0);
  const loggedIn = sessionUser && sessionUser.loggedIn;

  const handleStart = () => {
    setStep(1);
  };
  const handlePrevious = () => {
    if (mode === "review" && step === 1) {
      navigate("/dashboard");
    }
    if ((mode === "edit" || mode === "view") && step === 1) {
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

    // Create a FormData object and append files to it

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
                  onClick={() => {
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
                  disabled={!formik.isValid || mode === "view"}
                  type="submit"
                >
                  Submit
                </Button>
              )}
            </NavigationButtons>
          </div>
        );
      default:
        if (loggedIn) {
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
              {fetchedComments && ( //display comments
                <div>
                  {fetchedComments.map((comment) => (
                    <div key={comment.id}>
                      <p>Field: {comment.field}</p>
                      <p>Comment: {comment.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        } else {
          return <div>Please Sign In To Continue</div>;
        }
    }
  };

  return (
    <>
      <StyledForm>{renderFormStep()}</StyledForm>
    </>
  );
};

export default Form;
