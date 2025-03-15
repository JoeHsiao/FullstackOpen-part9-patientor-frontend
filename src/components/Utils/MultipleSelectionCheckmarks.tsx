import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// const names = [
//   'Oliver Hansen',
//   'Van Henry',
//   'April Tucker',
//   'Ralph Hubbard',
//   'Omar Alexander',
//   'Carlos Abbott',
//   'Miriam Wagner',
//   'Bradley Wilkerson',
//   'Virginia Andrews',
//   'Kelly Snyder',
// ];

interface Props {
  items: string[];
  setSelection: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function MultipleSelectCheckmarks({
  items,
  setSelection,
}: Props) {
  const [itemNames, setItemNames] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof itemNames>) => {
    const {
      target: { value },
    } = event;
    const valueList = typeof value === "string" ? value.split(",") : value;
    setItemNames(
      // On autofill we get a stringified value.
      valueList
    );
    setSelection(valueList);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="diagnoses-multiple-checkbox-label">
          Diagnosis codes
        </InputLabel>
        <Select
          labelId="diagnoses-multiple-checkbox-label"
          id="diagnoses-multiple-checkbox"
          multiple
          value={itemNames}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnosis codes" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {items.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={itemNames.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
