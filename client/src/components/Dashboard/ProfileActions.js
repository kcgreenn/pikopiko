import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

const propTypes = {
  click: PropTypes.func.isRequired
};

const defaultProps = {};

function ProfileActions(props) {
  return (
    <>
      <ButtonGroup className="my-5" size="sm" aria-label="Profile Actions">
        <Link
          to="/edit-profile"
          title="Edit Profile"
          className="btn btn-primary"
        >
          <ion-icon name="contact" size="large" />
        </Link>
        <Link
          to="/add-experience"
          className=" btn btn-primary"
          title="Add Experience"
        >
          <ion-icon name="business" size="large" />
        </Link>
        <Link
          to="/add-education"
          className="btn btn-primary"
          title="Add Education"
        >
          <ion-icon name="school" size="large" />
        </Link>
        <Button variant="danger" onClick={props.click} title="Delete My Acount">
          <ion-icon name="trash" size="large" />
        </Button>
      </ButtonGroup>
    </>
  );
}

ProfileActions.propTypes = propTypes;
ProfileActions.defaultProps = defaultProps;

export default ProfileActions;
