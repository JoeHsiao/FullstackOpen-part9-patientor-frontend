import { Button, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../types";

const HealthCheckForm: React.FC<{
  handleSubmit: (event: SyntheticEvent, entry: EntryWithoutId) => Promise<void>;
}> = ({ handleSubmit }) => {
  const [code, setCode] = useState("");
  const [codeList, setCodeList] = useState<string[]>([]);

  const onSubmit = (e: SyntheticEvent) => {
    const target = e.target as typeof e.target & {
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
          <Typography variant="h6">HealthCheck Form</Typography>
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

export default HealthCheckForm;
