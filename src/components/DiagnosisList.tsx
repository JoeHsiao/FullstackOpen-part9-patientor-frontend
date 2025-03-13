import { useContext } from "react";
import DiagnosesContext from "../context/Diagnoses";

const DiagnosisList: React.FC<{ codes: string[] }> = ({ codes }) => {
  const diagnosesContext = useContext(DiagnosesContext);

  const diagnoses = codes.map((c) =>
    diagnosesContext.find((d) => d.code === c)
  );

  return (
    <div>
      <h4>diagnoses</h4>
      <ul>
        {diagnoses.map((d, i) => (
          <li key={i}>
            {d?.code} {d?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiagnosisList;
