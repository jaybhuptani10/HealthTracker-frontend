import React, { useState } from "react";
import "./css/MedicalRecords.css"; // Import external CSS

const medicalRecords = [
  { 
    id: 1, 
    name: "Blood Test Report", 
    description: "Upload your latest blood test results.", 
    image: "https://tse4.mm.bing.net/th?id=OIP.nAXhrxjevtGl73aQ_JewbQHaE8&pid=Api&P=0&h=180" 
  },
  { 
    id: 2, 
    name: "MRI Scan", 
    description: "Upload your MRI scan reports.", 
    image: "https://tse3.mm.bing.net/th?id=OIP.fIMWaR-z2i5Yn-jhfbTyWgHaE8&pid=Api&P=0&h=180" 
  },
  { 
    id: 3, 
    name: "X-Ray Report", 
    description: "Upload your latest X-ray results.", 
    image: "https://up.yimg.com/ib/th?id=OIP.pNqwDTg2KEqYw0p7uiGnIwHaE8&pid=Api&rs=1&c=1&qlt=95&w=166&h=110" 
  },
  { 
    id: 4, 
    name: "Prescription", 
    description: "Upload your doctor's prescription.", 
    image: "https://tse2.mm.bing.net/th?id=OIP.E12JQPDBEi3k0CakZuOY_AHaFU&pid=Api&P=0&h=180" 
  },
  { 
    id: 5, 
    name: "ECG Report", 
    description: "Upload your ECG report for heart ", 
    image: "https://c8.alamy.com/comp/2BD3GJW/close-up-of-ecocardiography-report-ecg-showing-irregular-heartbeat-2BD3GJW.jpg" 
  },
  { 
    id: 6, 
    name: "Vaccination Record", 
    description: "Upload proof of vaccinations received.", 
    image: "https://tse2.mm.bing.net/th?id=OIP.W9bflcElgWNxNXaLbgkxzwHaE7&pid=Api&P=0&h=180" 
  }
];

const MedicalRecords = () => {
    const [uploadedFiles, setUploadedFiles] = useState({});
  
    const handleFileUpload = (id, event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedFiles((prev) => ({ ...prev, [id]: file.name }));
      }
    };
  
    return (
      <div className="medical-records-container">
        <div className="medical-records-grid">
          {medicalRecords.map((record) => (
            <div key={record.id} className="record-card">
              <img src={record.image} alt={record.name} className="record-image" />
              <h3 className="record-title">{record.name}</h3>
              <p className="record-description">{record.description}</p>
              <label className="upload-container">
                <input
                  type="file"
                  onChange={(event) => handleFileUpload(record.id, event)}
                />
                <span className="upload-label">{uploadedFiles[record.id] || "Upload Document"}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default MedicalRecords;