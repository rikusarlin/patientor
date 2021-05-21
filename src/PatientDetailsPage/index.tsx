import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Table, Icon, SemanticICONS, Button } from "semantic-ui-react";
import { apiBaseUrl } from "../constants";

import { Patient, Gender } from "../types";
import { useStateValue, setChosenPatient } from "../state";

import EntryComp from "../components/EntryComp";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";


const genderIcon: Record<Gender, SemanticICONS> = {
    [Gender.Male]: 'mars',
    [Gender.Female]: 'venus',
    [Gender.Other]: 'other gender',
  };

export const PatientDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patient }, dispatch] = useStateValue();
  
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setChosenPatient(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
      setError(e.response?.data?.error || 'Unknown error');
    }
  };

  React.useEffect(() => {
    const fetchPatientDetails = async (id: string): Promise<Patient> => {
      const { data: newPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setChosenPatient(newPatient));
      return newPatient;
    };
    if (!patient || patient?.id !== id) {
      void fetchPatientDetails(id);
    }
  }, [patient, id, dispatch]);

  return (
    <div className="App">
      <Container textAlign="center">
      </Container>
      <Table celled>
        <Table.Body>
            <Table.Row>
              <Table.Cell><h2>{patient ? patient.name : ""}</h2></Table.Cell>
              <Table.Cell><Icon name={genderIcon[patient ? patient.gender: Gender.Other]} size='big'></Icon></Table.Cell>
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
            <Table.Row>
              <Table.Cell>Entries</Table.Cell>
            </Table.Row>
            {Object.values(patient ? (patient.entries ? patient.entries : []) : []).map((entry) => <EntryComp entry={entry} key={entry.id} />)}
        </Table.Body>
      </Table>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

    </div>
  );
};

export default PatientDetailsPage;
