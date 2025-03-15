import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { SyntheticEvent, useState } from "react";
import { EntryWithoutId } from "../../types";
import MultipleSelectCheckmarks from "../Utils/MultipleSelectionCheckmarks";
import { useContext } from "react";
import DiagnosesContext from "../../context/Diagnoses";

const HealthCheckForm: React.FC<{
  handleSubmit: (event: SyntheticEvent, entry: EntryWithoutId) => Promise<void>;
}> = ({ handleSubmit }) => {
  const [codeList, setCodeList] = useState<string[]>([]);
  const diagnosesContext = useContext(DiagnosesContext);
  const codeNames = diagnosesContext.map((d) => d.code);

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
          <TextField
            name="date"
            label="date"
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
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
          <FormControl fullWidth>
            <InputLabel id="simple-select-label">Health rating</InputLabel>
            <Select
              labelId="simple-select-label"
              id="simple-select"
              label="Health rating"
              inputProps={{ name: "healthCheckRating" }}
              defaultValue={0}
            >
              <MenuItem value={0}>Healthy</MenuItem>
              <MenuItem value={1}>Low risk</MenuItem>
              <MenuItem value={2}>High risk</MenuItem>
              <MenuItem value={3}>Critical risk</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ padding: 1 }}>
          <MultipleSelectCheckmarks
            items={codeNames}
            setSelection={setCodeList}
          />
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
