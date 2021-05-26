import React, { useState, useEffect } from "react";
import { Container, Table, Row, Col } from "react-bootstrap";
import SeriesDetail from "./SeriesDetail";

function Series() {
  const [series, setSeries] = useState([]);
  const [selectedSeries, setSelectedSeries] = useState(null);

  const handleOnClickedSeries = (event, data) => {
    setSelectedSeries(data);
  };

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setSeries(result);
          setSelectedSeries(result[0]);
          console.log(result);
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
                  <th>Name</th>
                  <th>Channel</th>
                  <th>Seasons</th>
                  <th>Episodes</th>
                  <th>Release Date</th>
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
                      <td>{serie.release}</td>
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
      </Container>
    )
  );
}

export default Series;
