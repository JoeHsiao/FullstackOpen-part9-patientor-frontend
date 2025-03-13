import { HealthCheckEntry } from "../../types";
import DiagnosisList from "../DiagnosisList";
import BatteryFullIcon from "@mui/icons-material/BatteryFull";
import Battery90Icon from "@mui/icons-material/Battery90";
import Battery50Icon from "@mui/icons-material/Battery50";
import Battery20Icon from "@mui/icons-material/Battery20";

const HealthCheckBlockBlock: React.FC<{ entry: HealthCheckEntry }> = ({
  entry,
}) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
      <div>{entry.date}</div>
      <div>{entry.description}</div>
      <div>
        {entry.healthCheckRating === 0 && (
          <BatteryFullIcon style={{ color: "green" }} />
        )}
      </div>
      <div>
        {entry.healthCheckRating === 1 && (
          <Battery90Icon style={{ color: "yellowgreen" }} />
        )}
      </div>
      <div>
        {entry.healthCheckRating === 2 && (
          <Battery50Icon style={{ color: "orange" }} />
        )}
      </div>
      <div>
        {entry.healthCheckRating === 3 && (
          <Battery20Icon style={{ color: "red" }} />
        )}
      </div>
      {entry.diagnosisCodes && <DiagnosisList codes={entry.diagnosisCodes} />}
      <div>diagnosed by {entry.specialist}</div>
    </div>
  );
};

export default HealthCheckBlockBlock;
