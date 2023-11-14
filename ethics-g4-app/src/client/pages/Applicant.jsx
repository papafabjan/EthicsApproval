import { Link } from "react-router-dom";

const Applicant = () => {
  return (
    <>
      <h6>
        This section provides information to potential applicants requesting
        Ethics approval, for conducting research that collect data from 3rd
        party participants. Please read this section carefully before attempting
        to apply. In most questions there are explanatory descriptions below
        them. If in doubt, talk to your supervisor.
      </h6>

      <h2>The structure of the application</h2>
      <h6>
        The application is a Google form separated in many sections. You may
        login to the form using any Google account, but it is recommended that
        you use your college email.
      </h6>
      <h2>Section A: Applicant Details</h2>
      <h6>
        Here you need to provide your information. Please be careful to write
        the correct information in the correct part (i.e. First names and Family
        name) IMPORTANT: You should login to the form using your college email.
        This email must be a @athtech.gr or a @york.citycollege.eu email. This
        is the email you will be receiving the approval letter.
      </h6>
      <h2>Subsection A1: Student Section</h2>
      <h6>
        You will have to complete the information in this section if you apply
        as a student. Make sure your registration number includes letters and
        numbers (e.g. CSS12345) Select your supervisor. If your supervisor is
        not in this list contact the Ethics administrator ASAP (see section
        home/Where to get more information if needed)
      </h6>
      <h2>Section B: Basic Information</h2>
      <h6>
        n this section you need to provide relative information about the
        project. Two important parts are the (estimated) starting and competing
        date of the data collection. These are the dates that you expect to be
        conducting the data collection (not when the project is supposed to
        end), and are only estimates, and you are allowed to do do data
        collection outside these dates
      </h6>

      <h2>Section C: Summary of research</h2>
      <h6>
        This is a critical section for the success of your pplication. You
        should explain things in simple non technical terms, so that others may
        understand what your research is.{" "}
      </h6>

      <h2>Section D: About the Participants </h2>
      <h6>
        <p>
          Discuss what is the profile of the average participant, where you will
          locate them, and how will you contact them.
        </p>

        <p>
          In cases that the internet / social media will be used please clarify
          which media and when. Think carefully about any potential risks that
          participant might experience: For example interviewing a person in
          their job premises, and asking questions about how satisfied they are
          about their salary, might be risky for them.
        </p>

        <p>
          What very least you will need to have three documents that will be
          used by the participants:
        </p>

        <p>
          The participant information sheet: this contains any information that
          the participant will need to know about this research like:
        </p>

        <p>What is the purpose of the research?</p>

        <p>How will their data be used?</p>

        <p>How they will be stored and for how long?</p>

        <p>Who will have access to their data?</p>

        <p>Will personal information be collected?</p>

        <p>
          that they have the right at any point to withdraw from the research
          (even after they have answered, in which case you need to delete their
          data from your collection).
        </p>

        <p>
          Read the participant information sheet template carefully and discuss
          it with your supervisor before you apply
        </p>

        <p>
          The participant consent form: this is a form that you will need to
          provide to the participant in two copies to sign. You should give to
          the participant one copy and keep the other for the next three years.
          The college retains the right to request that you provide these over
          the next three years. If the data collection will not be done via an
          electronic questionnaire, you should design the first part of the form
          to ask these questions and not allow the participant to answer any
          further questions unless they have agreed to all the parts.
        </p>

        <p>The list of questions to the asked</p>

        <p>
          Are your participant in anyway vulnerable? are they children or
          adolescents? In this case you need to get explicitly written approval
          from their parents/custodians. Will the reperch take place in a
          school? You will need to obtain written permission from their teachers
          / head masters. Are the participant adults lacking mental capacity in
          any form? If any of these cases are true you will be required to
          prepare addition supporting documents from the provided templates.
        </p>
      </h6>

      <h2>Section E: About the data</h2>
      <h6>
        How will the data be processed, stored and secured? How will you ensure
        that confidentiality is kept? Any data should be encrypted before stored
        localy or on a cloud. One way you can achive this is with specialised
        software. another is by zipping the data under a password protected
        file. The first is recommented,
      </h6>

      <h2>Section F: Material/tools</h2>
      <h6>
        Here you need to upload your questionnaire / list of questions. These
        must be in their final form, and if in the future you need to make major
        changes (add more questions other than clarification questions, or
        severely modify existing questions), you will need to reapply.
      </h6>

      <h2>What happens after you submit</h2>
      <h6>
        If your application is approved by the reviewers, you should receive an
        email within 2 weeks with an approval letter. If your supervisor or any
        of the reviewers have any objections you will receive an email with
        their comments about what to change. In this case you should follow the
        edit your response link in the email you got, to update the application
        according to their specifications and restart the process.{" "}
      </h6>
    </>
  );
};

export default Applicant;
