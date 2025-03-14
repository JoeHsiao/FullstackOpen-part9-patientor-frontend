import { Button, Grid, TextField, Typography } from "@mui/material";
import React, { SyntheticEvent, useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Entry, EntryWithoutId } from "../../types";
import axios from "axios";

const EntryForm: React.FC<{
  id: string;
  updateEntries: (entry: Entry) => void;
}> = ({ id, updateEntries }) => {
  const [code, setCode] = useState("");
  const [codeList, setCodeList] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setErrorMessage("");
  }, [id]);

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      date: { value: string };
      description: { value: string };
      specialist: { value: string };
      healthCheckRating: { value: string };
    };

    const entry: EntryWithoutId = {
      type: "HealthCheck",
      date: target.date.value,
      description: target.description.value,
      specialist: target.specialist.value,
      healthCheckRating: Number(target.healthCheckRating.value),
      diagnosisCodes: codeList,
    };

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
    <form onSubmit={handleSubmit}>
      <Grid
        container
        spacing={0}
        sx={{ border: "2px dotted black", borderRadius: 2, padding: 1 }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">HealthCheck Form</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color="red">{errorMessage}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ padding: 1 }}>
          <TextField name="date" label="date" variant="outlined" size="small" />
        </Grid>
        <Grid item xs={6} sx={{ padding: 1 }}>
          <TextField
            name="description"
            label="description"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sx={{ padding: 1 }}>
          <TextField
            name="specialist"
            label="specialist"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sx={{ padding: 1 }}>
          <TextField
            name="healthCheckRating"
            label="healthCheckRating"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={6} sx={{ padding: 1 }}>
          <TextField
            label="diagnosis code"
            variant="outlined"
            size="small"
            value={code}
            fullWidth
            onChange={(event) => setCode(event.target.value)}
          />
        </Grid>

        <Grid item xs={4} sx={{ padding: 1 }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => setCodeList(codeList.concat(code))}
          >
            add code
          </Button>
        </Grid>
        <Grid item xs={12} sx={{ padding: 1 }}>
          <Typography>codes: {codeList.join(", ")}</Typography>
        </Grid>
        <Grid item xs={4} sx={{ padding: 1 }}>
          <Button type="submit" variant="contained" size="small">
            submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryForm;
