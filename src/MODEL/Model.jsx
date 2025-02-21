import React, { useState } from "react";
import * as ort from "onnxruntime-web";

function Model() {
  const [heartRate, setHeartRate] = useState("");
  const [temperature, setTemperature] = useState("");
  const [oxygenLevel, setOxygenLevel] = useState("");
  const [prediction, setPrediction] = useState(null);

  async function runModel() {
    try {
      // Fetch model manually to avoid incorrect MIME issues
      const response = await fetch("/health_status.onnx");
      const arrayBuffer = await response.arrayBuffer();

      // Load the ONNX model
      const session = await ort.InferenceSession.create(arrayBuffer);

      // Convert inputs to Float32Array
      const inputData = Float32Array.from([
        parseFloat(heartRate),
        parseFloat(temperature),
        parseFloat(oxygenLevel),
      ]);

      // Create input tensor
      const inputTensor = new ort.Tensor("float32", inputData, [1, 3]);

      // Run inference
      const feeds = { input: inputTensor };
      const results = await session.run(feeds);

      // Get prediction
      const outputName = session.outputNames[0];
      setPrediction(results[outputName].data[0]);
    } catch (error) {
      console.error("Error running model:", error);
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", fontFamily: "Arial" }}>
      <h1>Health Status Prediction</h1>

      <label>Heart Rate (bpm): </label>
      <input
        type="number"
        value={heartRate}
        onChange={(e) => setHeartRate(e.target.value)}
      />
      <br />
      <br />

      <label>Temperature (°C): </label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(e.target.value)}
      />
      <br />
      <br />

      <label>Oxygen Level (%): </label>
      <input
        type="number"
        value={oxygenLevel}
        onChange={(e) => setOxygenLevel(e.target.value)}
      />
      <br />
      <br />

      <button
        onClick={runModel}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Predict Health Status
      </button>

      {prediction !== null && <h2>Predicted Health Status: {prediction}</h2>}
    </div>
  );
}

export default Model;
