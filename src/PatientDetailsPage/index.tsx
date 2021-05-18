import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table, Icon, SemanticICONS } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";

import { Patient, Gender } from "../types";
import { useStateValue } from "../state";

const genderIcon: Record<Gender, SemanticICONS> = {
    [Gender.Male]: 'mars',
    [Gender.Female]: 'venus',
    [Gender.Other]: 'other gender',
  };

export const PatientDetailsPage = () => {
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
      void fetchPatientDetails();
    }
    console.log("PatientDetailsPage useEffect");
  }, [patient, id, dispatch]);

  let iconType:Gender;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  patient ? iconType=patient.gender : iconType=Gender.Other;
  return (
    <div className="App">
      <Container textAlign="center">
      </Container>
      <Table celled>
        <Table.Body>
            <Table.Row>
              <Table.Cell><h2>{patient ? patient.name : ""}</h2></Table.Cell>
              <Table.Cell><Icon name={genderIcon[iconType]} size='big'></Icon></Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>SSN</Table.Cell>
              <Table.Cell>{patient ? patient.ssn : ""}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Occupation</Table.Cell>
              <Table.Cell>{patient ? patient.occupation : ""}</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Date of birth</Table.Cell>
              <Table.Cell>{patient ? patient.dateOfBirth : ""}</Table.Cell>
            </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};

export default PatientDetailsPage;
