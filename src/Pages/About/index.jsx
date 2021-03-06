import React, { Component } from "react";
import { Images } from "../../Shared";
import "./index.css";
import M from "materialize-css/dist/js/materialize.min.js";
import "materialize-css/dist/css/materialize.min.css";
import { fadeInUp, fadeInDown } from "react-animations";
import { StyleSheet, css } from "aphrodite";
import { XpChart, Navbar, InfoCard } from "../../Components";
import classNames from "classnames";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const styles = StyleSheet.create({
  fadeInUp: {
    animationName: fadeInUp,
    animationDuration: "1.5s"
  },
  fadeInDown: {
    animationName: fadeInDown,
    animationDuration: "1.5s"
  }
});

const avatar_section = classNames("col s12 l2", css(styles.fadeInUp));
const about_section = classNames(
  "col s12 l4 offset-l1",
  css(styles.fadeInDown)
);
const skills_section = classNames("col s12 l3 offset-l2", css(styles.fadeInUp));

class About extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gh: {},
      cf: {},
      error: "",
      curTitle: "Codeforces",
      isMounted: false
    };

    this.fetchCf = this.fetchCf.bind(this);
    this.fetchGh = this.fetchGh.bind(this);
    this.setCf = this.setCf.bind(this);
    this.setGh = this.setGh.bind(this);
    this.handleCf = this.handleCf.bind(this);
    this.handleGh = this.handleGh.bind(this);
  }

  handleCf() {
    this.setState({
      curTitle: "Codeforces"
    });
  }

  handleGh() {
    this.setState({
      curTitle: "GitHub"
    });
  }

  fetchCf() {
    this.setState({ isLoaded: false });
    axios("https://codeforces.com/api/user.info?handles=PradeepSelva")
      .then((response) => this.setCf(response.data))
      .catch((error) =>
        this.setState({
          error
        })
      );
  }

  fetchGh() {
    this.setState({ isLoaded: false });
    axios("https://api.github.com/users/Pradeep-selva")
      .then((response) => this.setGh(response.data))
      .catch((error) =>
        this.setState({
          error
        })
      );
  }

  setCf(cf) {
    this.setState({
      cf: cf.result[0]
    });
  }

  setGh(gh) {
    this.setState({
      gh: gh
    });
  }

  componentDidMount() {
    let materialBox = document.querySelectorAll(".materialboxed");
    M.AutoInit();
    M.Materialbox.init(materialBox, {});
    AOS.init({
      duration: 1000
    });
    this.fetchCf();
    this.fetchGh();
    this.setState({
      isMounted: true
    });
    // window.location.reload(f)
  }

  render() {
    const { cf, gh, curTitle } = this.state;
    return (
      <div className='Abouts'>
        <Navbar />
        <section class='container section' id='about'>
          <div class='row'>
            <div class={avatar_section}>
              <div class='valign-wrapper'>
                <img
                  src={Images.avatar}
                  alt='avatar'
                  class='materialboxed responsive rounded'
                />
              </div>
            </div>
            <div class={about_section}>
              <h3 class='grey-text text-darken-4'>-About Me-</h3>
              <blockquote>
                <p
                  class='flow-text grey-text text-darken-4'
                  style={{ textAlign: "left" }}
                >
                  Enthusiastic junior developer with broad technical exposure,
                  good communication skills and utmost professionalism. Deep
                  knowledge of Python, Javascript, Go and Git development
                  environments.
                </p>
              </blockquote>
            </div>
            <div class={skills_section}>
              <h3 class='grey-text text-darken-4'>-Skills-</h3>
              <ul class='flow-text grey-text text-darken-4' id='skills'>
                <li>○ Python</li>
                <li>○ Typescript/Javascript</li>
                <li>○ Go</li>
                <li>○ C++</li>
                <li>○ React/React Native</li>
                <li>○ Vue</li>
                <li>○ Svelte</li>
                <li>○ Redux</li>
                <li>○ GraphQL</li>
                <li>○ Node.js</li>
                <li>○ HTML//CSS</li>
                <li>○ MongoDB</li>
                <li>○ DynamoDB</li>
                <li>○ Firebase</li>
              </ul>
            </div>
          </div>
          <hr className='style'></hr>
          <div data-aos='fade-up' className='chart-radar'>
            <h3 class='grey-text text-darken-4'>-Proficiency-</h3>
            <XpChart />
          </div>
          <hr className='style'></hr>
          <div data-aos='fade-up' className='infocard'>
            <h3>-More Info-</h3>
            <InfoCard
              cf={cf}
              gh={gh}
              clickCf={this.handleCf}
              clickGh={this.handleGh}
              curTitle={curTitle}
            />
          </div>
        </section>
      </div>
    );
  }
}

export default About;
