import { OccupationalHealthcareEntry } from "../../types";
import DiagnosisList from "../DiagnosisList";

const OccupationalHealthcareEntryBlock: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <div>
        {entry.date} {entry.employerName}
      </div>
      <div>
        <em>{entry.description}</em>
      </div>
      {entry.sickLeave && (
        <div>
          Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      )}
      {entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes} />}
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default OccupationalHealthcareEntryBlock;
