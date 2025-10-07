import { useState } from "react";
import TextField from "~/src/components/TextField/TextField";
import "~/src/theme/theme.module.css";
import { createRoot } from "~/src/utilities/shared/shared";
import styles from "./styles.module.css";

const InteractiveExample = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const validateName = (value: string) => {
    const hasError = value.length < 2;
    setNameError(hasError);
    return hasError;
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasError = !emailRegex.test(value) && value.length > 0;
    setEmailError(hasError);
    return hasError;
  };

  const handleNameChange = (value: string) => {
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameHasError = validateName(name);
    const emailHasError = validateEmail(email);

    if (!nameHasError && !emailHasError) {
      alert(`Form submitted!\nName: ${name}\nEmail: ${email}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "grid", gap: "1rem", maxWidth: "400px" }}
    >
      <TextField
        testId="interactive-name"
        label="Full Name"
        value={name}
        onChange={handleNameChange}
        error={nameError}
        required
        helperText={
          nameError
            ? "Name must be at least 2 characters"
            : "Enter your full name"
        }
        placeholder="John Doe"
      />
      <TextField
        testId="interactive-email"
        label="Email Address"
        type="email"
        value={email}
        onChange={handleEmailChange}
        error={emailError}
        required
        helperText={
          emailError
            ? "Please enter a valid email address"
            : "We'll never share your email"
        }
        placeholder="john@example.com"
      />
      <button
        type="submit"
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "1rem",
          cursor: "pointer",
          marginTop: "1rem",
        }}
      >
        Submit Form
      </button>
    </form>
  );
};

function Examples() {
  return (
    <>
      <div className="test-section">
        <h3>Basic Input Types</h3>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <TextField
            testId="text-basic"
            label="Name"
            placeholder="Enter your name"
          />
          <TextField
            testId="email-basic"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <TextField
            testId="password-basic"
            label="Password"
            type="password"
            placeholder="Enter your password"
          />
          <TextField
            testId="tel-basic"
            label="Phone"
            type="tel"
            placeholder="Enter your phone"
          />
          <TextField
            testId="number-basic"
            label="Age"
            type="number"
            placeholder="Enter your age"
          />
          <TextField
            testId="url-basic"
            label="Website"
            type="url"
            placeholder="Enter your website"
          />
        </div>
      </div>

      <div className="test-section">
        <h3>Sizes</h3>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          <TextField
            testId="text-small"
            label="Small Input"
            size="small"
            placeholder="Small size"
          />
          <TextField
            testId="text-medium"
            label="Medium Input"
            size="medium"
            placeholder="Medium size"
          />
          <TextField
            testId="text-large"
            label="Large Input"
            size="large"
            placeholder="Large size"
          />
        </div>
      </div>

      <div className="test-section">
        <h3>States (Required, Error, Disabled)</h3>
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          }}
        >
          <TextField
            testId="text-required"
            label="Required Field"
            required
            helperText="This field is required"
            placeholder="This is required"
          />
          <TextField
            testId="text-error"
            label="Error State"
            error
            helperText="Something went wrong"
            placeholder="This has an error"
            defaultValue="Invalid value"
          />
          <TextField
            testId="text-disabled"
            label="Disabled Field"
            disabled
            defaultValue="Cannot edit this field"
            helperText="This field is disabled"
          />
          <TextField
            testId="text-helper"
            label="With Helper Text"
            helperText="This is helpful information"
            placeholder="Field with help"
          />
        </div>
      </div>

      <div className="test-section">
        <h3>Form with Validation</h3>
        <p>
          Try typing in the fields below. The validation happens in real-time:
        </p>
        <div>
          <InteractiveExample />
        </div>
      </div>

      <div className="test-section">
        <h3>Usage</h3>
        <pre className={styles.code}>
          {`import { TextField } from '@your-org/react-components/TextField'

<TextField
label="Email"
type="email"
required
helperText="We'll never share your email"
/>`}
        </pre>
      </div>
    </>
  );
}

// Interactive examples
createRoot("example", <Examples />);
