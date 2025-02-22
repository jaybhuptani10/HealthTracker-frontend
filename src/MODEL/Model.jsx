import React, { useState, useEffect } from "react";

const HealthStatusModel = () => {
  const [healthStatus, setHealthStatus] = useState("");

  useEffect(() => {
    const loadModel = async () => {
      try {
        // Dynamically import ONNX Runtime from a CDN
        const ort = await import("onnxruntime-web");

        // Load the ONNX model
        const modelPath = "/health_status.onnx"; // Path to your ONNX model
        const session = await ort.InferenceSession.create(modelPath);

        // Prepare the input data
        const inputData = {
          heart_rate: new ort.Tensor("float32", new Float32Array([90])),
          temperature: new ort.Tensor("float32", new Float32Array([32])),
          oxygen_level: new ort.Tensor("float32", new Float32Array([90])),
        };

        // Run the model
        const output = await session.run(inputData);
        const prediction = output.health_status.data[0]; // Adjust based on your model's output

        // Set the health status based on the prediction
        setHealthStatus(prediction > 0.5 ? "Healthy" : "Unhealthy");
      } catch (error) {
        console.error("Error loading or running the model:", error);
      }
    };

    loadModel();
  }, []);

  return (
    <div>
      <h1>Health Status Prediction</h1>
      <h2>Health Status: {healthStatus}</h2>
    </div>
  );
};

export default HealthStatusModel;
