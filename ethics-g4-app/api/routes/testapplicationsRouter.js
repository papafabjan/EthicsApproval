const express = require("express");
const router = express.Router();
const pool = require("../db");
const cors = require("cors");

router.options("/api/testapplications/add", cors());

// Get all test applications
router.get("/testapplications", async (req, res) => {
  try {
    const testApplications = await pool.query(
      "SELECT * FROM applications_test"
    );
    res.json(testApplications.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Add a new test application
router.post("/testapplications/add", async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      studentRegistration,
      programme,
      supervisor,
      ResearchProject,
      CoApplicantName,
      CoApplicantEmail,
      StartDate,
      EndDate,
      Funding,
      FundingOther,
      Country,
      OtherCountry,
      ProjectPlace,
      HealthSocialCare,
      AnotherInstitution,
      AnotherInstitutionOther,
      HumanTissue,
      ClinicalMedical,
      SocialCareServices,
      AimsObjectives,
      Methodology,
      SafetyConcerns,
      SensitiveTopics,
      PotentialParticipants,
      RecruitingPotentialParticipants,
      Payment,
      otherPaymentOption,
      PotentialHarm,
      VulnerableParticipants,
      otherVulnerableParticipantsOptions,
      DataProcessing,
      DataConfidentiality,
      DataStorageandSecurity,
    } = req.body.values;
    console.log(req.body.values);

    const newTestApplication = await pool.query(
      `
      INSERT INTO applications_test (
        firstname,
        middlename,
        lastname,
        email,
        studentregistration,
        programme,
        supervisor,
        researchproject,
        coapplicantname,
        coapplicantemail,
        startdate,
        enddate,
        funding,
        fundingother,
        country,
        othercountry,
        projectplace,
        healthsocialcare,
        anotherinstitution,
        anotherinstitutionother,
        humantissue,
        clinicalmedical,
        socialcareservices,
        aimsobjectives,
        methodology,
        safetyconcerns,
        sensitivetopics,
        potentialparticipants,
        recruitingpotentialparticipants,
        payment,
        otherpaymentoption,
        potentialharm,
        vulnerableparticipants,
        othervulnerableparticipantsoptions,
        dataprocessing,
        dataconfidentiality,
        datastorageandsecurity
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21,
        $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37
      ) RETURNING *;
      `,
      [
        firstName,
        middleName,
        lastName,
        email,
        studentRegistration,
        programme,
        supervisor,
        ResearchProject,
        CoApplicantName,
        CoApplicantEmail,
        StartDate,
        EndDate,
        Funding,
        FundingOther,
        Country,
        OtherCountry,
        ProjectPlace,
        HealthSocialCare,
        AnotherInstitution,
        AnotherInstitutionOther,
        HumanTissue,
        ClinicalMedical,
        SocialCareServices,
        AimsObjectives,
        Methodology,
        SafetyConcerns,
        SensitiveTopics,
        PotentialParticipants,
        RecruitingPotentialParticipants,
        Payment,
        otherPaymentOption,
        PotentialHarm,
        VulnerableParticipants,
        otherVulnerableParticipantsOptions,
        DataProcessing,
        DataConfidentiality,
        DataStorageandSecurity,
      ]
    );

    res.json(newTestApplication.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});



module.exports = router;
