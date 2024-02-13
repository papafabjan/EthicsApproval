// Contact.jsx
import React from 'react';
import StyledContact from '../styled/Contact.styled';

const Contact = () => {
  const supportEmails = [

    { email: "fpapa@york.citycollege.eu", role: "Technical Support" },
    { email: "pkaralis@york.citycollege.eu", role: "Customer Service" },
    { email: "mmandravelis@york.citycollege.eu", role: "General Inquiries" },
    { email: "mpolyzoidis@york.citycollege.eu", role: "Billing Support" },
    { email: "bpireva@york.citycollege.eu", role: "Application Assistance" },

  ];

  return (
    <StyledContact>
      <h1>Contact Support</h1>
      <div className="email-boxes">
        {supportEmails.map((contact, index) => (
          <div key={index} className="email-box">
            <strong>Email:</strong> <span>{contact.email}</span>
            <p>{contact.role}</p>
          </div>
        ))}
      </div>
    </StyledContact>
  );
};

export default Contact;
