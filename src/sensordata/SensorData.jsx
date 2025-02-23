import React, { useEffect, useState } from "react";

const SensorData = () => {
  const [pulseData, setPulseData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://swwhgf14g7.execute-api.ap-south-1.amazonaws.com/getSensorData"
      );
      const data = await response.json();

      if (data.sensor_data && Array.isArray(data.sensor_data)) {
        const filteredData = data.sensor_data.filter((record) => {
          const recordDate = record.DateTime.split(" ")[0]
            .split("-")
            .reverse()
            .join("-");

          return record.PulseRate > 0 && recordDate === selectedDate;
        });

        setPulseData(filteredData);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedDate]);

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <h2>Pulse Rate Records</h2>

      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {pulseData.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#f4f4f4" }}>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Timestamp
              </th>
              <th style={{ padding: "8px", border: "1px solid #ddd" }}>
                Pulse Rate
              </th>
            </tr>
          </thead>
          <tbody>
            {pulseData.map((record, index) => (
              <tr key={index}>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {record.DateTime}
                </td>
                <td style={{ padding: "8px", border: "1px solid #ddd" }}>
                  {record.PulseRate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No pulse rate data available for the selected date.</p>
      )}
    </div>
  );
};

export default SensorData;
