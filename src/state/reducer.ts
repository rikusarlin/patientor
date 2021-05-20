import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT_DETAILS";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};
    
export const setPatientDetails = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT_DETAILS",
    payload: patient,
  };
};

export const setPatientList = (patientList: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientList,
  };
};

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_LIST",
    payload: diagnoses,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
      case "SET_DIAGNOSIS_LIST":
        return {
          ...state,
          diagnoses: {
            ...action.payload.reduce(
              (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
              {}
            )
          }
        };
      case "SET_PATIENT_DETAILS":
      return {
        ...state,
        patient: action.payload
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
