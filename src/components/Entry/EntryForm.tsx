import React, { SyntheticEvent, useEffect, useState } from "react";
import patientService from "../../services/patients";
import { Entry, EntryWithoutId } from "../../types";
import axios from "axios";
import HealthCheckForm from "./HealthCheckForm";

const EntryForm: React.FC<{
  id: string;
  updateEntries: (entry: Entry) => void;
}> = ({ id, updateEntries }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");

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
      <div style={{ color: "red" }}>
        <h4>{errorMessage}</h4>
      </div>
      <HealthCheckForm handleSubmit={handleSubmit} />;
    </div>
  );
};

export default EntryForm;
