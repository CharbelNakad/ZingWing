import { useEffect, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  difficulty: "Beginner",
  xpReward: "",
  completed: false,
  tags: "",
  goalArea: "",
};

function MissionForm({
  initialValues,
  onSubmit,
  submitLabel,
  heading,
  introText,
  loading,
  serverError,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || "",
        description: initialValues.description || "",
        difficulty: initialValues.difficulty || "Beginner",
        xpReward: initialValues.xpReward ?? "",
        completed: initialValues.completed || false,
        tags: initialValues.tags ? initialValues.tags.join(", ") : "",
        goalArea: initialValues.meta?.goalArea || "",
      });
    } else {
      setFormData(emptyForm);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Mission title is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mission description is required.";
    }

    if (!formData.difficulty.trim()) {
      newErrors.difficulty = "Please choose a difficulty.";
    }

    if (!formData.goalArea.trim()) {
      newErrors.goalArea = "Goal area is required.";
    }

    if (formData.xpReward === "" || Number(formData.xpReward) < 0) {
      newErrors.xpReward = "XP reward must be 0 or greater.";
    }

    if (
      formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean).length === 0
    ) {
      newErrors.tags = "Enter at least one tag.";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      difficulty: formData.difficulty,
      xpReward: Number(formData.xpReward),
      completed: Boolean(formData.completed),
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      meta: {
        goalArea: formData.goalArea.trim(),
      },
    };

    try {
      await onSubmit(payload);
    } catch (error) {
      return;
    }
  };

  return (
    <section className="form-layout">
      <div className="page-top">
        <span className="pill pill-secondary">Mission Editor</span>
        <h1 className="section-heading">{heading}</h1>
        <p className="section-copy">{introText}</p>
      </div>

      <form className="mission-form panel" onSubmit={handleSubmit}>
        {serverError && <p className="error-text">{serverError}</p>}

        <div className="form-grid">
          <label className="form-field">
            <span>Mission Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Complete a focused study sprint"
            />
            {errors.title && <small>{errors.title}</small>}
          </label>

          <label className="form-field">
            <span>Difficulty</span>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
            {errors.difficulty && <small>{errors.difficulty}</small>}
          </label>

          <label className="form-field">
            <span>XP Reward</span>
            <input
              type="number"
              name="xpReward"
              min="0"
              value={formData.xpReward}
              onChange={handleChange}
              placeholder="25"
            />
            {errors.xpReward && <small>{errors.xpReward}</small>}
          </label>

          <label className="form-field">
            <span>Goal Area</span>
            <input
              type="text"
              name="goalArea"
              value={formData.goalArea}
              onChange={handleChange}
              placeholder="Productivity"
            />
            {errors.goalArea && <small>{errors.goalArea}</small>}
          </label>
        </div>

        <label className="form-field">
          <span>Description</span>
          <textarea
            name="description"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what the user needs to do to complete this mission."
          />
          {errors.description && <small>{errors.description}</small>}
        </label>

        <label className="form-field">
          <span>Tags</span>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="focus, health, discipline"
          />
          {errors.tags && <small>{errors.tags}</small>}
        </label>

        <label className="checkbox-field">
          <input
            type="checkbox"
            name="completed"
            checked={formData.completed}
            onChange={handleChange}
          />
          <span>Mark this mission as completed</span>
        </label>

        <div className="cta-row">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </section>
  );
}

export default MissionForm;
