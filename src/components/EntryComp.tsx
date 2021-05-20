import React from "react";
import { Entry } from "../types";
import HealthCheckComp from "./HealthCheckComp";
import HospitalEntryComp from "./HospitalEntryComp";
import OccupationalHealthCareComp from "./OccupationalHealthCareComp";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryComp: React.FC<{ entry: Entry }> = ({ entry }) => {
  if (entry === undefined) return null;

  switch (entry.type) {

    case "Hospital":
      return <HospitalEntryComp entry={entry}></HospitalEntryComp>;
    case "HealthCheck":
      return <HealthCheckComp entry={entry}></HealthCheckComp>;
    case "OccupationalHealthcare":
      return <OccupationalHealthCareComp entry={entry}></OccupationalHealthCareComp>;
    default:
      return assertNever(entry);
  }
};

export default EntryComp;