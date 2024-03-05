import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addFormants } from "../../services/apiService";

const FormantsInput = () => {
  const [formants, setFormants] = useState({
    a: { f1: "", f2: "" },
    eo: { f1: "", f2: "" },
    o: { f1: "", f2: "" },
    u: { f1: "", f2: "" },
    eu: { f1: "", f2: "" },
    i: { f1: "", f2: "" },
    e: { f1: "", f2: "" },
  });
  const navigate = useNavigate();
  const nickname = localStorage.getItem("nickname");
  const languages = JSON.parse(localStorage.getItem("languages"));

  const handleChange = (vowel, formant, value) => {
    setFormants((prevFormants) => ({
      ...prevFormants,
      [vowel]: {
        ...prevFormants[vowel],
        [formant]: value,
      },
    }));
  };

  const handleAddFormants = async () => {
    console.log(formants);
    try {
      const addFormantsResult = await addFormants({
        nickname,
        languages,
        formants,
      });

      if (addFormantsResult !== null) {
        navigate("/result");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-md shadow-lg ">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Input F1 and F2 formants for each vowel
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formants).map(([vowel, { f1, f2 }]) => (
            <div key={vowel} className="mb-4">
              <h3 className="text-lg font-medium mb-2">{vowel}</h3>
              <div className="flex items-center mb-2">
                <label className="mr-2 text-gray-800">F1:</label>
                <input
                  type="text"
                  value={f1}
                  onChange={(e) => handleChange(vowel, "f1", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2 text-gray-800">F2:</label>
                <input
                  type="text"
                  value={f2}
                  onChange={(e) => handleChange(vowel, "f2", e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleAddFormants}
        >
          Save values
        </button>
      </div>
    </div>
  );
};

export default FormantsInput;
