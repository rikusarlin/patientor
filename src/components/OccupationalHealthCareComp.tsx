import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { OccupationalHealthcareEntry } from "../types";
import { DiagnoseComp } from "./DiagnoseComp";

const OccupationalHealthCareComp: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="stethoscope" size='big'></Icon> {entry.employerName} </Card.Header>
        <Card.Description><i>{entry.description}</i></Card.Description>
        <DiagnoseComp codes={entry.diagnosisCodes} />
      </Card.Content>
    </Card>
  );

};

export default OccupationalHealthCareComp;