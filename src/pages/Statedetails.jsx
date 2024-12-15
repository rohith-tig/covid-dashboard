import React, { useState, useEffect } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router-dom";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import Header from "../components/Header";
import "../styles/State.css";
import "../styles/Home.css";

const statesList = [
  { value: "AN", label: "Andaman and Nicobar Islands" },
  { value: "AP", label: "Andhra Pradesh" },
  { value: "AR", label: "Arunachal Pradesh" },
  { value: "AS", label: "Assam" },
  { value: "BR", label: "Bihar" },
  { value: "CH", label: "Chandigarh" },
  { value: "CT", label: "Chhattisgarh" },
  { value: "DN", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "DL", label: "Delhi" },
  { value: "GA", label: "Goa" },
  { value: "GJ", label: "Gujarat" },
  { value: "HR", label: "Haryana" },
  { value: "HP", label: "Himachal Pradesh" },
  { value: "JK", label: "Jammu and Kashmir" },
  { value: "JH", label: "Jharkhand" },
  { value: "KA", label: "Karnataka" },
  { value: "KL", label: "Kerala" },
  { value: "LA", label: "Ladakh" },
  { value: "LD", label: "Lakshadweep" },
  { value: "MH", label: "Maharashtra" },
  { value: "MP", label: "Madhya Pradesh" },
  { value: "MN", label: "Manipur" },
  { value: "ML", label: "Meghalaya" },
  { value: "MZ", label: "Mizoram" },
  { value: "NL", label: "Nagaland" },
  { value: "OR", label: "Odisha" },
  { value: "PY", label: "Puducherry" },
  { value: "PB", label: "Punjab" },
  { value: "RJ", label: "Rajasthan" },
  { value: "SK", label: "Sikkim" },
  { value: "TN", label: "Tamil Nadu" },
  { value: "TG", label: "Telangana" },
  { value: "TR", label: "Tripura" },
  { value: "UP", label: "Uttar Pradesh" },
  { value: "UT", label: "Uttarakhand" },
  { value: "WB", label: "West Bengal" },
];

const Statedetails = () => {
  const { stateId } = useParams();
  const [stateCovidList, setStateCovidList] = useState([]);
  const [datesList, setDatesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [clickedDiv, setClickedDiv] = useState("confirmed");
  const [activeDiv, setActiveDiv] = useState(false);
  const [confirmedDiv, setConfirmedDiv] = useState(true);
  const [recoveredDiv, setRecoveredDiv] = useState(false);
  const [deceasedDiv, setDeceasedDiv] = useState(false);
  const [data, setData] = useState({});
  const [tenDatesList, setTenDatesList] = useState([]);

  useEffect(() => {
    stateCall(stateId);
    datesApiCall(stateId);
  }, [stateId]);

  const stateCall = async (stateId) => {
    try {
      const url = "https://apis.ccbp.in/covid19-state-wise-data";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch state data");
      const data = await response.json();
      console.log(data);

      const { total } = data[stateId];
      const { meta } = data[stateId];
      const updatedData = {
        confirmed: total.confirmed,
        active: total.confirmed - (total.recovered + total.deceased),
        tested: total.tested,
        deceased: total.deceased,
        recovered: total.recovered,
        updatedDate: meta.last_updated,
      };

      setStateCovidList(updatedData);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const loader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#ffffff" height={50} width={50} />
    </div>
  );

  const datesApiCall = async (stateId) => {
    try {
      const url = "https://apis.ccbp.in/covid19-timelines-data";
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch dates data");
      const datesData = await response.json();

      const keyNames = Object.keys(datesData[stateId].dates);
      const updatedDatesList = keyNames.map((date) => ({
        date,
        confirmed: datesData[stateId].dates[date].total.confirmed,
        deceased: datesData[stateId].dates[date].total.deceased,
        recovered: datesData[stateId].dates[date].total.recovered,
        tested: datesData[stateId].dates[date].total.tested,
      }));

      setDatesList(updatedDatesList);
      setTenDatesList(updatedDatesList.slice(-10));
      console.log(updatedDatesList);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
    }
  };

  const findingLabel = () => {
    const findState = statesList.find((item) => item.value === stateId);
    return findState ? findState.label : null;
  };

  const extractionAndRenderingDistricts = () => {
    const resultList = [];

    if (data[stateId]) {
      const { districts } = data[stateId];
      const keyNames = Object.keys(districts);

      keyNames.forEach((keyName) => {
        const { total } = districts[keyName];
        const value = total[clickedDiv] ? total[clickedDiv] : 0;
        resultList.push({ name: keyName, value });
      });

      const sortedList = resultList.sort((a, b) => b.value - a.value);
      return (
        <>
          <h1 className="top-dist">Top Districts</h1>
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th style={{ backgroundColor: "#161625" }}>District Name</th>
                <th style={{ backgroundColor: "#161625" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {sortedList.map((res) => (
                <tr key={res.name}>
                  <td style={{ backgroundColor: "#161625" }}>{res.name}</td>
                  <td style={{ backgroundColor: "#161625" }}>{res.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      );
    }
    return null;
  };

  const renderRecoveryDiv = () => {
    const { confirmed, active, recovered, deceased } = stateCovidList;

    return (
      <div style={{ marginBottom: "50px" }} className="total-div">
        <div
          style={{ cursor: "pointer" }}
          className="recovery-div active-confirm"
          onClick={() => {
            setClickedDiv("confirmed");
          }}
        >
          <p>Confirmed</p>
          <img
            height="40px"
            width="40px"
            alt="recovered"
            src="https://res.cloudinary.com/duzolgclw/image/upload/v1718271389/check-mark_1_ndmeqg.png"
          />
          <h1>{confirmed}</h1>
        </div>

        <div
          style={{ color: "#28a745", cursor: "pointer" }}
          className="recovery-div active-recovered"
          onClick={() => {
            setClickedDiv("recovered");
          }}
        >
          <p>Recovered</p>
          <img
            height="40px"
            width="40px"
            alt="Recovered"
            src="https://res.cloudinary.com/duzolgclw/image/upload/v1718271530/recovered_1_xjkeri.png"
          />
          <h1>{recovered}</h1>
        </div>
        <div
          style={{ color: "#6c757d", cursor: "pointer" }}
          className="recovery-div active-deceased"
          onClick={() => {
            setClickedDiv("deceased");
          }}
        >
          <p>Deceased</p>
          <img
            height="40px"
            width="40px"
            alt="deceased"
            src="https://res.cloudinary.com/duzolgclw/image/upload/v1718272386/breathing_1_ebvyan.png"
          />
          <h1>{deceased}</h1>
        </div>
      </div>
    );
  };

  const renderBarChart = () => {
    const color = () => {
      switch (clickedDiv) {
        case "recovered":
          return "#28a745";
        case "deceased":
          return "#6c757d";
        case "confirmed":
          return "#ff073a";
        default:
          return "#007bff";
      }
    };
    const newData = tenDatesList.map((item) => {
      return {
        date: item.date,
        recovered: Number(
          item.recovered + Number(item.recovered + Math.random() * 1000000)
        ).toFixed(),
      };
    });
    return (
      <ResponsiveContainer
        style={{ marginBottom: "100px" }}
        margin="10px"
        width="99%"
        height={500}
      >
        <BarChart data={newData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="recovered" fill="#28a745" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderPieChart = () => {
    return (
      <>
        <ResponsiveContainer
          style={{ marginBottom: "5px" }}
          margin="10px"
          width="99%"
          height={500}
        >
          <PieChart>
            <Pie
              dataKey="deceased"
              data={tenDatesList}
              innerRadius={40}
              outerRadius={80}
              fill="#6c757d"
              label={(entry) => `${entry.date}: ${entry.deceased}`}
            />
          </PieChart>
          <p
            style={{
              textAlign: "center",
              color: "#6c757d",
              marginTop: "-60px",
            }}
          >
            Deceased
          </p>
          <Tooltip />
        </ResponsiveContainer>
      </>
    );
  };

  const renderLineChart = () => {
    console.log(tenDatesList);
    const newData = tenDatesList.map((item) => {
      return {
        date: item.date,
        confirmed: Number(
          item.confirmed + Number(item.confirmed + Math.random() * 1000000)
        ).toFixed(),
      };
    });

    const colo = () => {
      switch (clickedDiv) {
        case "recovered":
          return "#28a745";
        case "deceased":
          return "#6c757d";
        case "confirmed":
          return "#ff073a";
        default:
          return "#007bff";
      }
    };
    return (
      <ResponsiveContainer margin="10px" width="99%" height={500}>
        <LineChart data={newData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line dataKey="confirmed" stroke="#ff073a" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  if (isError) {
    return <div>Error loading data...</div>;
  }

  const stateLabel = findingLabel();

  const renderRender = () => {
    switch (clickedDiv) {
      case "recovered":
        return renderBarChart();
      case "deceased":
        return renderPieChart();
      case "confirmed":
        return renderLineChart();
    }
  };

  return (
    <div className="state-main-div">
      <Header />
      {isLoading ? (
        loader()
      ) : (
        <>
          <h1 className="state-name">{stateLabel}</h1>
          {renderRecoveryDiv()}

          {renderRender()}
          {extractionAndRenderingDistricts()}
          <div className="footer">
            <h1 className="covid19">
              COVID19<span className="span-covid">INDIA</span>
            </h1>
            <p className="stand">
              We stand with everyone fighting on the front lines
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Statedetails;
