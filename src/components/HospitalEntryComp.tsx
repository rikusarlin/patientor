import React from "react";
import { Icon, Card } from "semantic-ui-react";
import { HospitalEntry } from "../types";
import { DiagnoseComp } from "./DiagnoseComp";

const HospitalEntryComp: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="hospital" size='big'></Icon> </Card.Header>
        <Card.Description><i>{entry.description}</i></Card.Description>
        <Card.Content extra>{entry.discharge.date} {entry.discharge.criteria}</Card.Content>
        <DiagnoseComp codes={entry.diagnosisCodes} />
      </Card.Content>
    </Card>
  );

};

export default HospitalEntryComp;