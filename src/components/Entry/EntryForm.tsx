import React, { SyntheticEvent, useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Entry, EntryWithoutId } from "../../types";
import axios from "axios";
import HealthCheckForm from "./HealthCheckForm";
import Grid from "@mui/material/Grid";
import { InputLabel, MenuItem, Select } from "@mui/material";
import OccupationalHealthcareForm from "./OccupationalHealthcareForm";
import HospitalForm from "./HospitalForm";

const EntryForm: React.FC<{
  id: string;
  updateEntries: (entry: Entry) => void;
}> = ({ id, updateEntries }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [formType, setFormType] = useState<string>("HealthCheck");

  useEffect(() => {
    setErrorMessage("");
  }, [id]);

  const handleSubmit = async (event: SyntheticEvent, entry: EntryWithoutId) => {
    event.preventDefault();
    try {
      const addedEntry = await patientService.addEntry(id, entry);
      updateEntries(addedEntry);
      setErrorMessage("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrorMessage(err.response?.data.error.join("; "));
      } else {
        setErrorMessage("Error occurred");
      }
      console.log(err);
    }
  };
  return (
    <div>
      <Grid item xs={12} sx={{ padding: 1 }}>
        <InputLabel id="form-type-label">Form Type</InputLabel>
        <Select
          fullWidth
          labelId="form-type-label"
          value={formType}
          label="Form Type"
          onChange={(event) => setFormType(event.target.value)}
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>
      </Grid>
      <div style={{ color: "red" }}>
        <h4>{errorMessage}</h4>
      </div>
      {formType === "HealthCheck" && (
        <HealthCheckForm handleSubmit={handleSubmit} />
      )}
      {formType === "Hospital" && <HospitalForm handleSubmit={handleSubmit} />}
      {formType === "OccupationalHealthcare" && (
        <OccupationalHealthcareForm handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default EntryForm;
