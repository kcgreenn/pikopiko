import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";

const propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
  required: PropTypes.string
};

const SelectGroup = ({
  name,
  label,
  error,
  value,
  info,
  options,
  handleChange
}) => {
  return (
    <Form.Group controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        name={name}
        onChange={handleChange}
        value={value}
        isInvalid={error}
      >
        {options.map((option, index) => {
          return (
            <option
              defaultValue={option.selected}
              value={option.value}
              key={index}
            >
              {option.label}
            </option>
          );
        })}
      </Form.Control>
      {info && <Form.Text className="text-muted">{info}</Form.Text>}
      <Form.Control.Feedback type="invalid">
        <p>{error}</p>
      </Form.Control.Feedback>
    </Form.Group>
  );
};

SelectGroup.propTypes = propTypes;

export default SelectGroup;
