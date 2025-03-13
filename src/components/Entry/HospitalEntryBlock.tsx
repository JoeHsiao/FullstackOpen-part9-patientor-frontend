import { HospitalEntry } from "../../types";
import DiagnosisList from "../DiagnosisList";

const HospitalEntryBlock: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <div>{entry.date}</div>
      <div>
        <em>{entry.description}</em>
      </div>
      <div>Discharge {entry.discharge.date}</div>
      <div>criteria {entry.discharge.criteria}</div>
      {entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes} />}
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default HospitalEntryBlock;
