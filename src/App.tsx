import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from "@mui/material";

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientListPage/PatientDetails";
import diagnosesService from "./services/diagnoses";
import DiagnosesContext from "./context/Diagnoses";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  useEffect(() => {
    diagnosesService.getAll().then((data) => {
      setDiagnoses(data);
    });
  }, []);

  return (
    <DiagnosesContext.Provider value={diagnoses}>
      <div className="App">
        <Router>
          <Container>
            <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
              Patientor
            </Typography>
            <Button component={Link} to="/" variant="contained" color="primary">
              Home
            </Button>
            <Divider hidden />
            <Routes>
              <Route
                path="/"
                element={
                  <PatientListPage
                    patients={patients}
                    setPatients={setPatients}
                  />
                }
              />
              <Route path="/patients/:id" element={<PatientDetails />} />
            </Routes>
          </Container>
        </Router>
      </div>
    </DiagnosesContext.Provider>
  );
};

export default App;
