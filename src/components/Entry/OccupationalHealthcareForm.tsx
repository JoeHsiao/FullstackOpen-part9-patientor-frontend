import { Button, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../types";

const OccupationalHealthcareForm: React.FC<{
  handleSubmit: (event: SyntheticEvent, entry: EntryWithoutId) => Promise<void>;
}> = ({ handleSubmit }) => {
  const [code, setCode] = useState("");
  const [codeList, setCodeList] = useState<string[]>([]);

  const onSubmit = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      date: { value: string };
      description: { value: string };
      specialist: { value: string };
      employerName: { value: string };
      startDate: { value: string };
      endDate: { value: string };
    };

    const entry: EntryWithoutId = {
      type: "OccupationalHealthcare",
      date: target.date.value,
      description: target.description.value,
      specialist: target.specialist.value,
      employerName: target.employerName.value,
      sickLeave: {
        startDate: target.startDate.value,
        endDate: target.endDate.value,
      },
      diagnosisCodes: codeList,
    };

    handleSubmit(e, entry);
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid
        container
        spacing={0}
        sx={{ border: "2px dotted black", borderRadius: 2, padding: 1 }}
      >
        <Grid item xs={12}>
          <Typography variant="h6">OccupationalHealthcare Form</Typography>
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
            name="employerName"
            label="Employer name"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={3} sx={{ padding: 1 }}>
          <Typography>Sick leave</Typography>
        </Grid>
        <Grid item xs={4} sx={{ padding: 1 }}>
          <TextField
            name="startDate"
            label="Start date"
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={4} sx={{ padding: 1 }}>
          <TextField
            name="endDate"
            label="End date"
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

export default OccupationalHealthcareForm;
