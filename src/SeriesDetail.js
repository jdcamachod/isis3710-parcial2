import React from "react";
import { Card } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

function SeriesDetail(props) {
  return (
    <Card>
      {navigator.onLine ? (
        <Card.Img variant="top" src={props.serie.poster}></Card.Img>
      ) : (
        <FormattedMessage id="imageErrorLoading" />
      )}
      <Card.Body>
        <Card.Title>{props.serie.name}</Card.Title>
        <Card.Text>{props.serie.description}</Card.Text>
        <Card.Text>
          <a href={props.serie.webpage}>{props.serie.webpage}</a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default SeriesDetail;
