import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import ProfileItem from "./ProfileItem";

import { getProfiles } from "../../actions/profileActions";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardDeck from "react-bootstrap/CardDeck";

const propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const defaultProps = {};

class Profiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;

    if (profiles === null || loading) {
      profileItems = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profileItems = profiles.map((profile, index) => (
          <ProfileItem key={index} profile={profile} />
        ));
      } else {
        profileItems = <h4>No profiles found</h4>;
      }
    }
    return (
      <>
        <Container>
          <Row>
            <Col md={12}>
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              <CardDeck>{profileItems}</CardDeck>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

Profiles.propTypes = propTypes;
Profiles.defaultProps = defaultProps;

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
