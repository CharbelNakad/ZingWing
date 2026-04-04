const { addContactMessage } = require("../data/contactMessages");

const validateContactPayload = (payload) => {
  const errors = [];
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!payload.name || typeof payload.name !== "string" || !payload.name.trim()) {
    errors.push("Name is required.");
  }

  if (!payload.email || typeof payload.email !== "string" || !payload.email.trim()) {
    errors.push("Email is required.");
  } else if (!emailPattern.test(payload.email.trim())) {
    errors.push("Email must be valid.");
  }

  if (!payload.subject || typeof payload.subject !== "string" || !payload.subject.trim()) {
    errors.push("Subject is required.");
  }

  if (!payload.message || typeof payload.message !== "string" || !payload.message.trim()) {
    errors.push("Message is required.");
  } else if (payload.message.trim().length < 10) {
    errors.push("Message must be at least 10 characters long.");
  }

  return errors;
};

const createContactMessage = async (req, res) => {
  const errors = validateContactPayload(req.body);

  if (errors.length > 0) {
    return res.status(400).json({
      message: "Contact form validation failed.",
      errors,
    });
  }

  try {
    const savedMessage = await addContactMessage({
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      subject: req.body.subject.trim(),
      message: req.body.message.trim(),
    });

    return res.status(201).json({
      message: "Contact message saved successfully.",
      contactMessage: savedMessage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Could not save your contact message.",
    });
  }
};

module.exports = {
  createContactMessage,
};
