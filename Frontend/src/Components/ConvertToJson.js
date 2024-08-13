import React, { useState } from "react";
import JsonViewer from "../JsonViewer";

const ConvertToJson = () => {
  const [csvInput, setCsvInput] = useState("");
  const [jsonOutput, setJsonOutput] = useState(null);

  const handleConvert = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v1/convert`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvString: csvInput }),
      }
    );

    const data = await response.json();
    setJsonOutput(data.jsonData);
  };

  return (
    <div className="json-input">
      <h1>CSV to JSON Converter</h1>
      <textarea
        rows="10"
        cols="50"
        value={csvInput}
        onChange={(e) => setCsvInput(e.target.value)}
        placeholder="Paste CSV string here"
        style={{ padding: "10px" }}
      ></textarea>
      <br />
      <button onClick={handleConvert}>Convert To JSON</button>
      <br />
      {jsonOutput && (
        <div>
          <h2>JSON Output</h2>
          <JsonViewer data={jsonOutput} />
        </div>
      )}
    </div>
  );
};

export default ConvertToJson;
