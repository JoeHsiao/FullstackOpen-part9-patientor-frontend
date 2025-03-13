import { useParams } from "react-router-dom";
import { Diagnosis, Gender, Patient } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import patientService from "../../services/patients";
import { useState, useEffect } from "react";
import diagnosesService from "../../services/diagnoses";

const PatientDetails = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const findDiagnosis = (code: string) => {
    return diagnoses.find((d) => d.code === code);
  };

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const result = await patientService.getOne(id);

        if (result.entries.length > 0 && diagnoses.length === 0) {
          const diagnoses = await diagnosesService.getAll();
          setDiagnoses(diagnoses);
        }

        setPatient(result);
      };
      fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return null;
  }

  return (
    <>
      <h4>
        {patient.name}
        {patient.gender === Gender.Female && <FemaleIcon />}
        {patient.gender === Gender.Male && <MaleIcon />}
        {patient.gender === Gender.Other && <TransgenderIcon />}
      </h4>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <ul>
        {patient.entries.map((e) => {
          if (e.diagnosisCodes) {
            return e.diagnosisCodes.map((d) => {
              const diagnosis = findDiagnosis(d);
              if (diagnosis) {
                return (
                  <li key={diagnosis.code}>
                    {diagnosis.code} {diagnosis.name}
                  </li>
                );
              }
            });
          }
        })}
      </ul>
    </>
  );
};

export default PatientDetails;
