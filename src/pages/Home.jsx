import { Component } from "react";
import Loader from "react-loader-spinner";
import { Navigate } from "react-router-dom";

import Select from "react-select";
import Header from "../components/Header";
import "../styles/Home.css";

const statesList = [
  {
    value: "AN",
    label: "Andaman and Nicobar Islands",
  },
  {
    value: "AP",
    label: "Andhra Pradesh",
  },
  {
    value: "AR",
    label: "Arunachal Pradesh",
  },
  {
    value: "AS",
    label: "Assam",
  },
  {
    value: "BR",
    label: "Bihar",
  },
  {
    value: "CH",
    label: "Chandigarh",
  },
  {
    value: "CT",
    label: "Chhattisgarh",
  },
  {
    value: "DN",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  {
    value: "DL",
    label: "Delhi",
  },
  {
    value: "GA",
    label: "Goa",
  },
  {
    value: "GJ",
    label: "Gujarat",
  },
  {
    value: "HR",
    label: "Haryana",
  },
  {
    value: "HP",
    label: "Himachal Pradesh",
  },
  {
    value: "JK",
    label: "Jammu and Kashmir",
  },
  {
    value: "JH",
    label: "Jharkhand",
  },
  {
    value: "KA",
    label: "Karnataka",
  },
  {
    value: "KL",
    label: "Kerala",
  },
  {
    value: "LA",
    label: "Ladakh",
  },
  {
    value: "LD",
    label: "Lakshadweep",
  },
  {
    value: "MH",
    label: "Maharashtra",
  },
  {
    value: "MP",
    label: "Madhya Pradesh",
  },
  {
    value: "MN",
    label: "Manipur",
  },
  {
    value: "ML",
    label: "Meghalaya",
  },
  {
    value: "MZ",
    label: "Mizoram",
  },
  {
    value: "NL",
    label: "Nagaland",
  },
  {
    value: "OR",
    label: "Odisha",
  },
  {
    value: "PY",
    label: "Puducherry",
  },
  {
    value: "PB",
    label: "Punjab",
  },
  {
    value: "RJ",
    label: "Rajasthan",
  },
  {
    value: "SK",
    label: "Sikkim",
  },
  {
    value: "TN",
    label: "Tamil Nadu",
  },
  {
    value: "TG",
    label: "Telangana",
  },
  {
    value: "TR",
    label: "Tripura",
  },
  {
    value: "UP",
    label: "Uttar Pradesh",
  },
  {
    value: "UT",
    label: "Uttarakhand",
  },
  {
    value: "WB",
    label: "West Bengal",
  },
];

const customStyles = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#161625",
    color: "#64748b",
  }),
  control: (provided) => ({
    ...provided,
    color: "#fffff",
  }),
};

class Home extends Component {
  state = {
    selected: null,
    focus: false,
    covidList: [],
    isLoading: true,
    totalConfirmedNumber: 0,
    totalRecoveredNumber: 0,
    totalDeceasedNumber: 0,
    totalActiveNumber: 0,
  };

  componentDidMount() {
    this.apiCall();
  }

  handleChange = (selectedOption) => {
    this.setState({
      selected: selectedOption,
    });
  };

  handleFocus = () => {
    this.setState({
      focus: true,
    });
  };

  handleBlur = () => {
    this.setState({
      focus: false,
    });
  };

  apiCall = async () => {
    const url = "https://apis.ccbp.in/covid19-state-wise-data";
    const options = {
      method: "GET",
    };
    const response = await fetch(url, options);
    const data = await response.json();

    const allStateData = statesList.map((state) => {
      const stateData = data[state.value].total;
      const popData = data[state.value].meta;
      return {
        state: state.label,
        confirmed: stateData.confirmed,
        deceased: stateData.deceased,
        recovered: stateData.recovered,
        tested: stateData.tested,
        vaccinated1: stateData.vaccinated1,
        vaccinated2: stateData.vaccinated2,
        population: popData.population,
      };
    });

    let totalConfirmedNumber = 0;
    let totalRecoveredNumber = 0;
    let totalDeceasedNumber = 0;
    let totalActiveNumber = 0;
    allStateData.forEach((item) => {
      totalConfirmedNumber += item.confirmed;
      totalRecoveredNumber += item.recovered;
      totalDeceasedNumber += item.deceased;
      const activeCases = item.confirmed - (item.deceased + item.recovered);
      totalActiveNumber += activeCases;
    });

    this.setState({
      covidList: allStateData,
      totalConfirmedNumber,
      totalRecoveredNumber,
      totalDeceasedNumber,
      totalActiveNumber,
      isLoading: false,
    });
  };

  loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
    </div>
  );

  covidTable = () => {
    const {
      selected,
      covidList,
      totalRecoveredNumber,
      totalActiveNumber,
      totalDeceasedNumber,
      totalConfirmedNumber,
    } = this.state;

    if (selected !== null) {
      const stateId = selected.value;
      return <Navigate to={`/${stateId}`} />;
    }

    return (
      <>
        <div className="total-div">
          <div className="recovery-div">
            <p>Confirmed</p>
            <img
              height="40px"
              width="40px"
              alt="recovered"
              src="https://res.cloudinary.com/duzolgclw/image/upload/v1718271389/check-mark_1_ndmeqg.png"
            />
            <h1>{totalConfirmedNumber}</h1>
          </div>
          <div style={{ color: "#007bff" }} className="recovery-div">
            <p>Active</p>
            <img
              height="40px"
              width="40px"
              alt="active"
              src="https://res.cloudinary.com/duzolgclw/image/upload/v1718271530/protection_1_lventr.png"
            />
            <h1>{totalActiveNumber}</h1>
          </div>
          <div style={{ color: "#28a745" }} className="recovery-div">
            <p>Recovered</p>
            <img
              height="40px"
              width="40px"
              alt="Recovered"
              src="https://res.cloudinary.com/duzolgclw/image/upload/v1718271530/recovered_1_xjkeri.png"
            />
            <h1>{totalRecoveredNumber}</h1>
          </div>
          <div style={{ color: "#6c757d" }} className="recovery-div">
            <p>Deceased</p>
            <img
              height="40px"
              width="40px"
              alt="deceased"
              src="https://res.cloudinary.com/duzolgclw/image/upload/v1718272386/breathing_1_ebvyan.png"
            />
            <h1>{totalDeceasedNumber}</h1>
          </div>
        </div>
        <div className="covid-table-container">
          <h1 className="jjj">COVID-19 Statewise Data</h1>
          <table className="table  table-dark">
            <thead>
              <tr>
                <th
                  style={{ paddingLeft: "10px", backgroundColor: "#161625" }}
                  scope="col"
                >
                  State/UT
                </th>
                <th
                  style={{ textAlign: "center", backgroundColor: "#161625" }}
                  scope="col"
                >
                  Confirmed
                </th>
                <th
                  style={{ textAlign: "center", backgroundColor: "#161625" }}
                  scope="col"
                >
                  Active
                </th>
                <th
                  style={{ textAlign: "center", backgroundColor: "#161625" }}
                  scope="col"
                >
                  Recovered
                </th>
                <th
                  style={{ textAlign: "center", backgroundColor: "#161625" }}
                  scope="col"
                >
                  Deceased
                </th>
                <th
                  style={{ textAlign: "center", backgroundColor: "#161625" }}
                  scope="col"
                >
                  Population
                </th>
              </tr>
            </thead>
            <tbody>
              {covidList.map((item) => {
                const activeCases =
                  item.confirmed - (item.deceased + item.recovered);

                return (
                  <tr key={item.state}>
                    <td
                      style={{
                        paddingLeft: "10px",
                        color: "white",
                        backgroundColor: "#161625",
                      }}
                    >
                      {item.state}
                    </td>
                    <td
                      style={{
                        color: "#ff073a",
                        textAlign: "center",
                        backgroundColor: "#161625",
                      }}
                    >
                      {item.confirmed}
                    </td>
                    <td
                      style={{
                        color: "#007bff",
                        textAlign: "center",
                        backgroundColor: "#161625",
                      }}
                    >
                      {activeCases}
                    </td>
                    <td
                      style={{
                        color: "#28a745",
                        textAlign: "center",
                        backgroundColor: "#161625",
                      }}
                    >
                      {item.recovered}
                    </td>
                    <td
                      style={{
                        color: "#6c757d",
                        textAlign: "center",
                        backgroundColor: "#161625",
                      }}
                    >
                      {item.deceased}
                    </td>

                    <td
                      style={{
                        color: "#94a3b8",
                        textAlign: "center",
                        backgroundColor: "#161625",
                      }}
                    >
                      {item.population}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="footer">
            <h1 className="covid19">
              COVID19<span className="span-covid">INDIA</span>
            </h1>
            <p style={{ color: "#94A3B8" }}>
              We stand with everyone fighting on the front lines
            </p>
          </div>
        </div>
      </>
    );
  };

  render() {
    const { selected, isLoading } = this.state;

    return (
      <div className="covid-div">
        <div className="home-main-div">
          <Header />
          <Select
            className="selectClass"
            options={statesList}
            onChange={this.handleChange}
            selected={selected}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            styles={customStyles}
            placeholder="Enter the state"
          />
        </div>
        {isLoading ? this.loader() : this.covidTable()}
      </div>
    );
  }
}

export default Home;
