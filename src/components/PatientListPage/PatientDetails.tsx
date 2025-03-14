import { useParams } from "react-router-dom";
import { Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import patientService from "../../services/patients";
import { useState, useEffect } from "react";
import EntryDetails from "../Entry/EntryDetails";

const PatientDetails = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const result = await patientService.getOne(id);
        setPatient(result);
      };
      fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <div>
      <h4>
        {patient.name}
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Male && <MaleIcon />}
        {patient.gender === Gender.Other && <TransgenderIcon />}
      </h4>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div style={{ padding: "5px" }}>
        {patient.entries.map((e) => (
          <EntryDetails key={e.id} entry={e} />
        ))}
      </div>
    </div>
  );
};

export default PatientDetails;
