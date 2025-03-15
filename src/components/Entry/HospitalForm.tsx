import { Button, Grid, TextField, Typography } from "@mui/material";
import { SyntheticEvent, useContext, useState } from "react";
import { EntryWithoutId } from "../../types";
import DiagnosesContext from "../../context/Diagnoses";
import MultipleSelectCheckmarks from "../Utils/MultipleSelectionCheckmarks";

const HospitalForm: React.FC<{
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
      dischargeDate: { value: string };
      criteria: { value: string };
      diagnosisCodes?: string[];
    };

    const entry: EntryWithoutId = {
      type: "Hospital",
      date: target.date.value,
      description: target.description.value,
      specialist: target.specialist.value,
      discharge: {
        date: target.dischargeDate.value,
        criteria: target.criteria.value,
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
          <Typography variant="h6">Hospital Form</Typography>
        </Grid>

        <Grid item xs={6} sx={{ padding: 1 }}>
          <TextField
            type="date"
            name="date"
            label="date"
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
        <Grid item xs={6} sx={{ padding: 1 }}></Grid>
        <Grid item xs={3} sx={{ padding: 1 }}>
          <Typography>Discharge</Typography>
        </Grid>
        <Grid item xs={5} sx={{ padding: 1 }}>
          <TextField
            name="dischargeDate"
            label="Date"
            type="date"
            variant="outlined"
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={4} sx={{ padding: 1 }}>
          <TextField
            name="criteria"
            label="Criteria"
            variant="outlined"
            size="small"
          />
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

export default HospitalForm;
