// pages/missing-person.js
import { useState } from "react";

const reportperson = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [lastSeen, setLastSeen] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { name, age, lastSeen, description };

    try {
      const res = await fetch("/api/report-missing-person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Report Submitted Successfully!");
        setName("");
        setAge("");
        setLastSeen("");
        setDescription("");
      } else {
        setStatus("Failed to submit report.");
      }
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold mb-4">Report Missing Person</h2>
      {status && <div className="p-4 bg-yellow-400 mb-4 rounded">{status}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Age</label>
          <input
            type="number"
            className="w-full p-2 border border-gray-300 rounded"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Last Seen</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={lastSeen}
            onChange={(e) => setLastSeen(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">
          Submit Report
        </button>
      </form>
    </div>
  );
};

export default reportperson;
