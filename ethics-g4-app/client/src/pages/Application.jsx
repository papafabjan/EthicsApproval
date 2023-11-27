import Form from "../components/form-pages/Form";

const handleSubmit = () => {
  // Perform form submission logic here
  // This function will be triggered when the submit button is clicked on the last page (Pg10)
  // Example: You can collect all form data from previous pages and submit it
  // You may use form data state or any other method to collect and submit the form data
  console.log("Submitting the form...");
};

const Application = () => {
  return (
    <div>
      <Form />
    </div>
  );
};

export default Application;
