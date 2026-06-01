import { useState } from "react";
import "./App.css";

function App() {
  const initialState = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "",
    terms: false,
    newsletter: false,
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (value.length < 3 || value.length > 50)
          error = "Name must be 3-50 characters";
        break;

      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          error = "Invalid email";
        break;

      case "phone":
        if (!/^\+91-\d{5}-\d{5}$/.test(value))
          error = "Format: +91-12345-67890";
        break;

      case "subject":
        if (value.length < 5)
          error = "Minimum 5 characters required";
        break;

      case "message":
        if (value.length < 20 || value.length > 500)
          error = "Message must be 20-500 characters";
        break;

      case "priority":
        if (!value) error = "Select priority";
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: updatedValue,
    });

    if (type !== "checkbox") {
      setErrors({
        ...errors,
        [name]: validate(name, value),
      });
    }
  };

  const isFormValid =
    formData.fullName &&
    formData.email &&
    formData.phone &&
    formData.subject &&
    formData.message &&
    formData.priority &&
    formData.terms &&
    Object.values(errors).every((err) => err === "");

  const handleSubmit = (e) => {
    e.preventDefault();

    setSuccess("Form Submitted Successfully!");

    setFormData(initialState);
    setErrors({});
  };

  return (
    <div className="container">
      <h1>Advanced Contact Form</h1>

      {success && <p className="success">{success}</p>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={errors.fullName ? "invalid" : "valid"}
          />
          <small>{errors.fullName}</small>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? "invalid" : "valid"}
          />
          <small>{errors.email}</small>
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="+91-12345-67890"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? "invalid" : "valid"}
          />
          <small>{errors.phone}</small>
        </div>

        <div className="form-group">
          <label>
            Subject ({formData.subject.length}/100)
          </label>
          <input
            type="text"
            name="subject"
            maxLength="100"
            value={formData.subject}
            onChange={handleChange}
            className={errors.subject ? "invalid" : "valid"}
          />
          <small>{errors.subject}</small>
        </div>

        <div className="form-group">
          <label>
            Message ({formData.message.length}/500)
          </label>
          <textarea
            name="message"
            maxLength="500"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={errors.message ? "invalid" : "valid"}
          />
          <small>{errors.message}</small>
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label>Agree to Terms</label>
        </div>

        <div className="checkbox">
          <input
            type="checkbox"
            name="newsletter"
            checked={formData.newsletter}
            onChange={handleChange}
          />
          <label>Newsletter Signup</label>
        </div>

        <button disabled={!isFormValid}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;