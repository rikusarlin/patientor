import { RouteComponentProps } from "react-router-dom";

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface MatchIdParams {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MatchIdProps extends RouteComponentProps<MatchIdParams> {
}

