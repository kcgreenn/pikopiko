import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";

const propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const defaultProps = {};

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading === true) {
      dashboardContent = (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      // Check if current user has profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>display profile</h4>;
      } else {
        // User has no profile
        dashboardContent = (
          <>
            <p className="lead text-muted">Welcome, {user.name}</p>
            <p>You have not created a profile yet</p>
            <Link to="/create-profile" className="btn btn-info btn-lg">
              Create Profile
            </Link>
          </>
        );
      }
    }

    return (
      <Container>
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
  { getCurrentProfile }
)(Dashboard);
