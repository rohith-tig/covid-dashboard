import { Component } from "react";
import Header from "../components/Header";
import "../styles/State.css";

class About extends Component {
  state = {
    faqsLit: [],
  };

  componentDidMount() {
    this.faqsCall();
  }

  faqsCall = async () => {
    const url = "https://apis.ccbp.in/covid19-faqs";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);

    this.setState({ faqsLit: data.faq });
  };

  render() {
    const { faqsLit } = this.state;
    return (
      <>
        <Header />
        <div className="aboutd">
          <h1 className="ll">About</h1>
          <p className="il">Last updated on march 2021</p>
          <h1 className="gy">COVID 19 vaccines be ready for distribution</h1>

          <p className="kk">
            What are your sources? How is the data gathered for this project?
          </p>
          <p className="pp">
            The vaccines must be proven safe and effective in large (phase III)
            clinical trials. Some COVID-19 vaccine candidates have completed
            their phase III trials, and many other potential vaccines are being
            developed. Independent reviews of the efficacy and safety evidence
            is required for each vaccine candidate, including regulatory review
            and approval in the country where the vaccine is manufactured,
            before WHO considers a vaccine candidate for prequalification.
          </p>
          <p className="kk">
            Why does covid19india.org have difference in numbers compared to
            MOHFW website?
          </p>
          <p className="pp">
            The vaccines must be manufactured in large quantities, which is a
            major and unprecedented challenge – all the while continuing to
            produce all the other important life-saving vaccines already in use.
            As a final step, all approved vaccines will require distribution
            through a complex logistical process, with rigorous stock management
            and temperature control.
          </p>
          <p className="kk">Where can I find the data for this?</p>
          <p className="pp">
            In addition to review of the data for regulatory purposes, the
            evidence must also be reviewed for the purpose of policy
            recommendations on how the vaccines should be used.
          </p>
          <p className="kk">
            Why are you guys putting in time and resources to do this while not
            gaining a single penny from it?
          </p>
          <p className="pp">
            In addition to review of the data for regulatory purposes, the
            evidence must also be reviewed for the purpose of policy
            recommendations on how the vaccines should be used. Officials in
            individual countries decide whether to approve the vaccines for
            national use and develop policies for how to use the vaccines in
            their country based on the WHO recommendations.
          </p>
        </div>
      </>
    );
  }
}

export default About;
