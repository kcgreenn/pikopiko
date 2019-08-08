import React from "react";
import PropTypes from "prop-types";

import isEmpty from "../../validation/is-empty";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const propTypes = {
  profile: PropTypes.object.isRequired
};

const defaultProps = {};

class ProfileAbout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card className="my-5">
            <Card.Body>
              <Card.Text className="text-center">
                <span className="lead text-info text-center">
                  {profile.handle}'s Bio
                </span>
                <br />
                {isEmpty(profile.bio) ? (
                  <span>Does Not have a bio</span>
                ) : (
                  <span>{profile.bio}</span>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="text-center my-5">
            <Card.Body>
              <Card.Title>Skills</Card.Title>
              <ListGroup variant="" className=" text-center">
                {isEmpty(profile.skills)
                  ? null
                  : profile.skills.map((skill, index) => (
                      <ListGroup.Item className="p-3 text-success" key={index}>
                        <ion-icon name="checkmark-circle" />
                        <span className="text-dark">{skill}</span>
                      </ListGroup.Item>
                    ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

ProfileAbout.propTypes = propTypes;
ProfileAbout.defaultProps = defaultProps;

export default ProfileAbout;
