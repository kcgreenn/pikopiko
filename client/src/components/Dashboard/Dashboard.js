import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const defaultProps = {};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: ""
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const deleteAccountHandler = () => {
      this.props.deleteAccount();
    };
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else if (profile !== null) {
      // Check if current user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <>
            <p className="lead mb-5">
              Welcome,{" "}
              <Link to={`/profile/${this.state.handle}`}>{user.name}</Link>
            </p>
            <Row className="mt-5">
              <Col md={6}>
                <Experience className="mb-5" experience={profile.experience} />
              </Col>
              <Col md={6}>
                <Education className="mb-5" education={profile.education} />
              </Col>
            </Row>
            <Row>
              <Col xs={{ span: 6, offset: 3 }} md={{ span: 2, offset: 5 }}>
                {" "}
                <ProfileActions click={deleteAccountHandler} />
              </Col>
            </Row>
          </>
        );
      } else {
        // User has no profile
        dashboardContent = (
          <>
            <p className="lead text-muted">Welcome, {user.name}</p>
            <p>You have not created a profile yet</p>
            <Link to="/create-profile" className="btn btn-info btn-lg mt-5">
              Create Profile
            </Link>
          </>
        );
      }
    }

    return (
      <Container className="full-height">
        <Row>
          <Col md={12}>
            <h1>Dashboard</h1>
            {dashboardContent}
          </Col>
        </Row>
      </Container>
    );
  }
}

Dashboard.propTypes = propTypes;
Dashboard.defaultProps = defaultProps;

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount }
)(Dashboard);
