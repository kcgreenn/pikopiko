import React from "react";
import PropTypes from "prop-types";

import isEmpty from "../../validation/is-empty";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const propTypes = {
  experience: PropTypes.array.isRequired,
  education: PropTypes.array.isRequired
};

const defaultProps = {};

class ProfileCreds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { education, experience } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>
                <h3 className="display-5 mb-4">Credentials</h3>
              </Card.Title>
              <Row>
                {isEmpty(education) ? (
                  <p>No Education In Profile</p>
                ) : (
                  <Col md={6}>
                    <h4 className="display-5">Education</h4>
                    <ListGroup>
                      {education.map(edu => (
                        <ListGroup.Item key={edu._id}>
                          {edu.degree} in {edu.fieldOfStudy} from {edu.school}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                )}
                {isEmpty(experience) ? (
                  <p>No Experience In Profile</p>
                ) : (
                  <Col md={6}>
                    <h4 className="display-5">Experience</h4>
                    <ListGroup>
                      {experience.map(exp => (
                        <ListGroup.Item key={exp._id}>
                          {exp.title} at {exp.company}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Col>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

ProfileCreds.propTypes = propTypes;
ProfileCreds.defaultProps = defaultProps;

export default ProfileCreds;
