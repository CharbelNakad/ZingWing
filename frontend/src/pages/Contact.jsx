import { useState } from "react";

const initialContactState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function Contact() {
  const [formData, setFormData] = useState(initialContactState);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const validateContactForm = () => {
    const validationErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      validationErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(formData.email)) {
      validationErrors.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim()) {
      validationErrors.subject = "Please enter a subject.";
    }

    if (!formData.message.trim()) {
      validationErrors.message = "Please enter your message.";
    } else if (formData.message.trim().length < 10) {
      validationErrors.message = "Message should be at least 10 characters long.";
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateContactForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage("");
      setServerError("");
      return;
    }

    setIsSubmitting(true);
    setServerError("");

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const extraDetails = Array.isArray(data.errors) ? ` ${data.errors.join(" ")}` : "";
        throw new Error((data.message || "Could not send your message.") + extraDetails);
      }

      setSuccessMessage(
        "Your message was sent successfully"
      );
      setErrors({});
      setFormData(initialContactState);
    } catch (error) {
      setSuccessMessage("");
      setServerError(error.message || "Could not send your message.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="page-section contact-page">
      <div className="page-top">
        <span className="pill pill-secondary">Contact Us</span>
        <h1 className="section-heading">Let's hear what would power up your productivity.</h1>
        <p className="section-copy">
          Questions, ideas, and class feedback are always welcome.
        </p>
      </div>

      <div className="contact-grid">
        <div className="contact-panel panel">
          <h2>Reach the Team</h2>
          <p>
            Share feature ideas, app feedback, or partnership questions. Zing Wing is built around
            making motivation feel fun and sustainable.
          </p>
          <ul className="contact-list">
            <li>Mission planning feedback</li>
            <li>Gamification ideas</li>
            <li>Student productivity requests</li>
          </ul>
        </div>

        <form className="contact-form panel" onSubmit={handleSubmit}>
          {successMessage && <p className="message-box">{successMessage}</p>}
          {serverError && <p className="error-text">{serverError}</p>}

          <label className="form-field">
            <span>Name</span>
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <small>{errors.name}</small>}
          </label>

          <label className="form-field">
            <span>Email</span>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <small>{errors.email}</small>}
          </label>

          <label className="form-field">
            <span>Subject</span>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
            {errors.subject && <small>{errors.subject}</small>}
          </label>

          <label className="form-field">
            <span>Message</span>
            <textarea
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
            {errors.message && <small>{errors.message}</small>}
          </label>

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
