import moment from "moment";
import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import { FormattedDate, FormattedMessage } from "react-intl";
import SeriesDetail from "./SeriesDetail";
import Chart from "./Chart";

function Series() {
  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const handleOnClickedSeries = (event, data) => {
    setSelectedSeries(data);
  };

  useEffect(() => {
    const language = window.navigator.language || navigator.browserLanguage;
    fetch(
      language === "es-ES" || language === "es"
        ? "https://gist.githubusercontent.com/josejbocanegra/c55d86de9e0dae79e3308d95e78f997f/raw/a467415350e87c13faf9c8e843ea2fd20df056f3/series-es.json"
        : "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setSeries(result);
          setSelectedSeries(result[0]);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);
  return (
    series &&
    selectedSeries && (
      <Container fluid>
        <Row>
          <h1>T.V. Series</h1>
        </Row>
        <Row>
          <Col sm={8}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>
                    <FormattedMessage id="Name" />
                  </th>
                  <th>
                    <FormattedMessage id="Channel" />
                  </th>
                  <th>
                    <FormattedMessage id="Seasons" />
                  </th>
                  <th>
                    <FormattedMessage id="Episodes" />
                  </th>
                  <th>
                    <FormattedMessage id="ReleaseDate" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {series.map((serie) => {
                  return (
                    <tr
                      key={serie.id}
                      onClick={(e) => handleOnClickedSeries(e, serie)}
                    >
                      <td>{serie.id}</td>
                      <td>{serie.name}</td>
                      <td>{serie.channel}</td>
                      <td>{serie.seasons}</td>
                      <td>{serie.episodes}</td>
                      <td>
                        <FormattedDate
                          value={moment(serie.release, "DD/MM/YYYY")}
                          year="numeric"
                          month="long"
                          day="numeric"
                          weekday="long"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col sm={4}>
            <SeriesDetail serie={selectedSeries} />
          </Col>
        </Row>
        <Row>
          <Chart series={series}></Chart>
        </Row>
      </Container>
    )
  );
}

export default Series;
