import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import isEmpty from "../../validation/is-empty";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";

const propTypes = {
  profile: PropTypes.object.isRequired
};

const defaultProps = {};

class ProfileItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile } = this.props;
    return (
      <Card
        border="info"
        className="pt-3 text-center mb-5"
        style={{ maxWidth: "18rem" }}
      >
        <Link
          alt={`${profile.handle}'s Profile`}
          to={`/profile/${profile.handle}`}
        >
          <Card.Img
            style={{ width: "10rem" }}
            className="rounded-circle m-auto"
            variant="top"
            src={
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
          />
        </Link>
        <Card.Body>
          <Card.Title>
            <h3 className="display-5">{profile.handle}</h3>
          </Card.Title>
          <Card.Text>
            {profile.status} at {profile.company ? profile.company : ""}
          </Card.Text>
          <ListGroup className="text-left">
            <h5 className="display-5">Skills</h5>
            {profile.skills.splice(0, 4).map((skill, index) => (
              <ListGroup.Item key={index}>
                <span className="text-success">
                  <ion-icon name="checkmark" />
                </span>
                {skill}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
}

ProfileItem.propTypes = propTypes;
ProfileItem.defaultProps = defaultProps;

export default ProfileItem;
