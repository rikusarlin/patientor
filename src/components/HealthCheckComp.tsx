import React from "react";
import { Icon, Card, SemanticCOLORS } from "semantic-ui-react";
import { HealthCheckEntry, HealthCheckRating } from "../types";
import { DiagnoseComp } from "./DiagnoseComp";


const healthRatingIcons: Record<HealthCheckRating, SemanticCOLORS> = {
  [HealthCheckRating.Healthy]: 'green',
  [HealthCheckRating.LowRisk]: 'yellow',
  [HealthCheckRating.HighRisk]: 'orange',
  [HealthCheckRating.CriticalRisk]: 'red'
};

const HealthCheckComp: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>{entry.date} <Icon name="doctor" size='big'></Icon> </Card.Header>
        <Card.Description><i>{entry.description}</i></Card.Description>
        <Card.Content extra>{<Icon name="heart" color={healthRatingIcons[entry.healthCheckRating]}></Icon>}</Card.Content>
        <DiagnoseComp codes={entry.diagnosisCodes} />
      </Card.Content>
    </Card>
  );
};

export default HealthCheckComp;