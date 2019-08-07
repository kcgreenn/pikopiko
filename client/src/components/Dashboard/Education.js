import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import { deleteEducation } from "../../actions/profileActions";

const propTypes = {};

const defaultProps = {};

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  deleteClickHandler = eduId => {
    this.props.deleteEducation(eduId);
  };

  render() {
    const education = this.props.education.map(edu => (
      <tr key={edu._id}>
        <td>{edu.school}</td>
        <td>{edu.fieldOfStudy}</td>
        <td>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.current ? (
            "Current"
          ) : (
            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
          )}
        </td>
        <td>
          <Button
            onClick={() => this.deleteClickHandler(edu._id)}
            title="Delete Education"
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
        <h2 className="display-5 text-center">Education</h2>
        <Table size="sm" className="my-5">
          <thead>
            <tr>
              <th>School</th>
              <th>Field Of Study</th>
              <th>Date Attended</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </Table>
      </React.Fragment>
    );
  }
}

Education.propTypes = propTypes;
Education.defaultProps = defaultProps;

export default connect(
  null,
  { deleteEducation }
)(Education);
