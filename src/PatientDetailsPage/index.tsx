import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";

import { Patient, MatchIdParams } from "../types";
import { useStateValue } from "../state";

function PatientDetailsPage({match}: RouteComponentProps<MatchIdParams>) {
  const [{ patients }] = useStateValue();
  const patient:Patient | undefined = patients[match.params.id];

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient details</h3>
      </Container>
      <Table celled>
        <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{patient.name}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Gender</Table.Cell>
              <Table.Cell>{patient.gender}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Occupation</Table.Cell>
              <Table.Cell>{patient.occupation}</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
      <Button as={Link} to="/" primary>
            Home
          </Button>
    </div>
  );
}

export default PatientDetailsPage;
