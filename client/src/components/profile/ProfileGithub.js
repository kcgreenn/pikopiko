import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

const propTypes = {
  githubusername: PropTypes.string.isRequired
};

const defaultProps = {};

class ProfileGithub extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "07d7fcc2ae556dd92978",
      clientSecret: "75d9f4bb478626b97d3ad20f20e5b3b29df6684f",
      count: 5,
      sort: "created:ascending",
      repos: []
    };
  }
  componentDidMount() {
    const { githubusername } = this.props;
    const { count, sort, clientId, clientSecret } = this.state;

    fetch(
      `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(res => res.json())
      .then(data => {
        if (this.refs.myRef) {
          this.setState({
            repos: data
          });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    const { githubusername } = this.props;
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <ListGroup.Item key={repo.id}>
        <Link
          className="lead mr-2 text-secondary"
          target="_blank"
          to={repo.html_url}
        >
          {repo.name}
        </Link>
        <Badge variant="info">Stars: {repo.stargazers_count}</Badge>
        <Badge className="mx-2" variant="secondary">
          Watchers: {repo.watchers_count}
        </Badge>
        <Badge variant="success">Forks: {repo.forks_count}</Badge>
        <span className="ml-5 lead">{repo.description} </span>
      </ListGroup.Item>
    ));
    return (
      <Row ref="myRef">
        <Col md={12}>
          <Card className="text-center my-5">
            <Card.Body>
              <Card.Title>
                <a
                  href={`https://github.com/${githubusername}`}
                  alt="Github Profile"
                >
                  Latest Github Repos
                </a>
              </Card.Title>
              {repoItems}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

ProfileGithub.propTypes = propTypes;
ProfileGithub.defaultProps = defaultProps;

export default ProfileGithub;
