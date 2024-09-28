import React, { useState } from "react";
import Writer from "../components/Writer/Writer";
import "./Write.css";

const Write = () => {
  const [message, setMessage] = useState("");

  const onWrite = async (message) => {
    try {
      const ndef = new window.NDEFReader();
      // This line will avoid showing the native NFC UI reader
      await ndef.scan();
      await ndef.write({ records: [{ recordType: "text", data: message }] });
      alert("Value Saved!");
    } catch (error) {
      console.log(error);
      alert("Failed to save value.");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.trim()) {
      onWrite(message);
    } else {
      alert("Please enter a message.");
    }
  };

  return (
    <div className="write-container">
      <form onSubmit={handleSubmit} className="write-form">
        <h2>Write NFC Data</h2>
        <textarea value={message} onChange={handleChange} placeholder="Enter text to write to NFC tag..." className="write-textarea" />
        <button type="submit" className="write-btn">
          Write to NFC
        </button>
      </form>
    </div>
  );
};

export default Write;
