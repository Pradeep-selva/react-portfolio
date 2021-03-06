import React, { Component } from "react";
import "./index.css";
import axios from "axios";
import { fadeInUp } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import classNames from "classnames";
import { Navbar, ProjectList, Loading } from "../../Components";
import { RouteNames } from "../../Configs";
import { NavLink } from "react-router-dom";

const styles = StyleSheet.create({
  fadeInUp: {
    animationName: fadeInUp,
    animationDuration: "1s"
  }
});

const projectStyle = classNames("Projects container", css(styles.fadeInUp));

class AllProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      data: {},
      error: "",
      searchKey: ""
    };

    this.setData = this.setData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  setData(data) {
    this.setState({
      isLoaded: true,
      data: data
    });
  }

  componentDidMount() {
    axios("https://api.github.com/users/Pradeep-selva/repos")
      .then((response) => this.setData(response.data))
      .catch((error) => this.setState({ error }));
  }

  handleChange(event) {
    this.setState({
      searchKey: event.target.value
    });
  }

  render() {
    const { isLoaded, data, error, searchKey } = this.state;

    return (
      <div className='allProjects'>
        <Navbar />
        <h1>All Projects</h1>
        <div className='container'>
          <div className='row'>
            <div className='col s12 l6 offset-l3'>
              <input
                placeholder='Search repo'
                type='text'
                className='validate'
                onChange={this.handleChange}
              />
            </div>
          </div>
        </div>
        {error === "" ? (
          isLoaded ? (
            <div className='afterLoad'>
              <div className={projectStyle} id='projects'>
                <div className='row'>
                  <ProjectList data={data} searchKey={searchKey} />
                </div>
              </div>
              <div className='back'>
                <NavLink to={RouteNames.PROJECTS}>Go Back</NavLink>
                <p>&nbsp;</p>
              </div>
            </div>
          ) : (
            <Loading />
          )
        ) : (
          <h6>{error}</h6>
        )}
      </div>
    );
  }
}

export default AllProjects;
