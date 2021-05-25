import React, { useState, useEffect } from "react";
import { Container, Table } from "react-bootstrap";

function Series() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch(
      "https://gist.githubusercontent.com/josejbocanegra/5dc69cb7feb7945ef58b9c3d84be2635/raw/e2d16f7440d51cae06a9daf37b0b66818dd1fe31/series-en.json"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSeries(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  return (
    <Container>
      <h1>T.V. Series</h1>
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
              <tr key={serie.id}>
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
    </Container>
  );
}

export default Series;
