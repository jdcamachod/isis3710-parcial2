import React from "react";
import { Card } from "react-bootstrap";

function SeriesDetail(props) {
  return (
    <Card>
      <Card.Img variant="top" src={props.serie.poster} />
      <Card.Body>
        <Card.Title>{props.serie.name}</Card.Title>
        <Card.Text>{props.serie.description}</Card.Text>
        <Card.Footer>
          <a href={props.serie.webpage}>{props.serie.webpage}</a>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
}

export default SeriesDetail;
