import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  prepend: PropTypes.string,
  info: PropTypes.string,
  type: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.string,
  disabled: PropTypes.bool
};

const defaultProps = {
  type: "text",
  value: "",
  disabled: false
};

const TextFieldGroup = ({
  name,
  label,
  error,
  value,
  prepend,
  info,
  type,
  handleChange,
  required,
  disabled
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        {prepend ? (
          <InputGroup.Prepend className="">
            <InputGroup.Text
              id="prepend"
              dangerouslySetInnerHTML={{ __html: prepend }}
            />
          </InputGroup.Prepend>
        ) : null}
        <Form.Control
          name={name}
          onChange={handleChange}
          value={value}
          type={type}
          isInvalid={error}
          required={required ? true : false}
          disabled={disabled}
        />
        {info && (
          <Form.Text className="col-md-12 d-block text-muted">{info}</Form.Text>
        )}
        <Form.Control.Feedback type="invalid">
          <p>{error}</p>
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

TextFieldGroup.propTypes = propTypes;
TextFieldGroup.defaultProps = defaultProps;

export default TextFieldGroup;
