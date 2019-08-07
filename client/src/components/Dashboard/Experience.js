import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const propTypes = {
  deleteExperience: PropTypes.func.isRequired
};

const defaultProps = {};

class Experience extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteClickHandler = expId => {
    this.props.deleteExperience(expId);
  };

  render() {
    const experience = this.props.experience.map(exp => (
      <tr key={exp._id}>
        <td>{exp.company}</td>
        <td>{exp.title}</td>
        <td>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.current ? (
            "Current"
          ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
          )}
        </td>
        <td>
          <Button
            onClick={() => this.deleteClickHandler(exp._id)}
            title="Delete Experience"
            variant="light"
            className="border-danger text-danger"
            size="sm"
          >
            Delete
          </Button>
        </td>
      </tr>
    ));
    return (
      <React.Fragment>
        <h2 className="display-5 text-center ">Experience</h2>
        <Table size="sm" className="my-5">
          <thead>
            <tr>
              <th>Company</th>
              <th>Job Title</th>
              <th>Date Employed</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}

Experience.propTypes = propTypes;
Experience.defaultProps = defaultProps;

export default connect(
  null,
  { deleteExperience }
)(Experience);
