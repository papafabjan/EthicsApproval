const Contact = () => {

  const supportEmails = [
    { email: 'fpapa@york.citycollege.eu', role: 'Technical Support' },
    { email: 'pkaralis@york.citycollege.eu', role: 'Customer Service' },
    { email: 'mmandravelis@york.citycollege.eu', role: 'General Inquiries' },
    { email: 'mpolyzoidis@york.citycollege.eu', role: 'Billing Support' },
    { email: 'bpireva@york.citycollege.eu', role: 'Application Assistance' },
    { email: 'esioutis@york.citycollege.eu', role: 'Feedback and Suggestions' },
  ];

  return (
    <>
      <h1>Contact Support</h1>
      <ul>
        {supportEmails.map((contact, index) => (
          <li key={index}>
            <strong>Email:</strong> {contact.email} - <span>{contact.role}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Contact;