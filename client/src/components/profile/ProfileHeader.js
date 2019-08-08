import React from "react";
import PropTypes from "prop-types";

import isEmpty from "../../validation/is-empty";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const propTypes = {
  profile: PropTypes.object.isRequired
};

const defaultProps = {};

class ProfileHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { profile } = this.props;
    return (
      <Row>
        <Col md={12}>
          <Card className="text-center text-light" bg="primary">
            <Card.Img
              className="m-auto rounded-circle"
              style={{ width: "12rem" }}
              variant="top"
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            />
            <Card.Body>
              <Card.Title>
                <h2 className="display-5">{profile.handle}</h2>
              </Card.Title>
              <Card.Text>
                {profile.status} at{" "}
                {isEmpty(profile.company) ? null : (
                  <span>{profile.company}</span>
                )}
              </Card.Text>
              <Card.Text>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </Card.Text>
              <Card.Text>
                {isEmpty(profile.website) ? null : (
                  <a
                    href={profile.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Personal Website"
                    style={{ color: "inherit" }}
                  >
                    <ion-icon name="globe" size="large" />
                  </a>
                )}
                {isEmpty(profile.social) ||
                isEmpty(profile.social.twitter) ? null : (
                  <a
                    href={profile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Personal Website"
                    style={{ color: "inherit" }}
                  >
                    <ion-icon name="logo-twitter" size="large" />
                  </a>
                )}
                {isEmpty(profile.social) ||
                isEmpty(profile.social.youtube) ? null : (
                  <a
                    href={profile.social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Personal Website"
                    style={{ color: "inherit" }}
                  >
                    <ion-icon name="logo-youtube" size="large" />
                  </a>
                )}
                {isEmpty(profile.social) ||
                isEmpty(profile.social.instagram) ? null : (
                  <a
                    href={profile.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Personal Website"
                    style={{ color: "inherit" }}
                  >
                    <ion-icon name="logo-instagram" size="large" />
                  </a>
                )}
                {isEmpty(profile.social) ||
                isEmpty(profile.social.facebook) ? null : (
                  <a
                    href={profile.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Personal Website"
                    style={{ color: "inherit" }}
                  >
                    <ion-icon name="logo-facebook" size="large" />
                  </a>
                )}
                {isEmpty(profile.social) ||
                isEmpty(profile.social.linkedin) ? null : (
                  <a
                    href={profile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    alt="Personal Website"
                    style={{ color: "inherit" }}
                  >
                    <ion-icon name="logo-linkedin" size="large" />
                  </a>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

ProfileHeader.propTypes = propTypes;
ProfileHeader.defaultProps = defaultProps;

export default ProfileHeader;
