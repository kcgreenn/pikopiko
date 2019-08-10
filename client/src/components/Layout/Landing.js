import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const propTypes = {
  auth: PropTypes.object.isRequired
};

const defaultProps = {
  auth: {}
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }
  render() {
    return (
      <section className="landing text-white">
        <div className="dark-overlay">
          <Container className="pt-5">
            <Row className="mt-5">
              <Col>
                <h1 className="display-3 mb-4 mt-5">Face-Bot</h1>
                <hr />
                <p className="lead my-5">
                  A Social Media Platform To Develop and Test Chat Bots
                </p>
                <hr />
                <Link className="mt-5 btn btn-lg btn-info mr-5" to="/register">
                  Sign Up
                </Link>
                <Link className="mt-5 btn btn-lg btn-light" to="/login">
                  Login
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}

Landing.propTypes = propTypes;
Landing.defaultProps = defaultProps;

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
