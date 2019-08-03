import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.string
};

const TextAreaGroup = ({
  name,
  label,
  error,
  value,
  info,
  handleChange,
  required
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        onChange={handleChange}
        value={value}
        isInvalid={error}
        required={required ? true : false}
      />
      {info && <Form.Text className="text-muted">{info}</Form.Text>}
      <Form.Control.Feedback type="invalid">
        <p>{error}</p>
      </Form.Control.Feedback>
    </Form.Group>
  );
};

TextAreaGroup.propTypes = propTypes;

export default TextAreaGroup;
