import { Entry } from "../../types";
import HealthCheckBlock from "./HealthCheckBlock";
import HospitalEntryBlock from "./HospitalEntryBlock";
import OccupationalHealthcareEntryBlock from "./OccupationalHealthcareBlock";

const assertNever = (value: never) => {
  throw new Error("Unexpected value: " + value);
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryBlock entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryBlock entry={entry} />;
    case "HealthCheck":
      return <HealthCheckBlock entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
