import React from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Container, Table, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";

import { Patient } from "../types";
import { useStateValue } from "../state";

const PatientDetailsPage: React.FC = () => {

  const { id } = useParams<{ id: string }>();

  const [{ patient }, dispatch] = useStateValue();
  
  React.useEffect(() => {

    const fetchPatientDetails = async () => {
      try {
        const { data: patientDetailsFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT_DETAILS", payload: patientDetailsFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient?.id !== id) {
      fetchPatientDetails();
    }
  }, [patient, id, dispatch]);

  return (
    <div className="App">
      <Container textAlign="center">
        <h3>Patient details</h3>
      </Container>
      <Table celled>
        <Table.Body>
            <Table.Row>
              <Table.Cell>Name</Table.Cell>
              <Table.Cell>{patient ? patient.name : ""}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Gender</Table.Cell>
              <Table.Cell>{patient ? patient.gender : ""}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Occupation</Table.Cell>
              <Table.Cell>{patient ? patient.occupation : ""}</Table.Cell>
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
