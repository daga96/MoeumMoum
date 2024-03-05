import React, { useState, useEffect } from "react";
import languages from "../constants/languages";
import { getFormantsLanguage } from "../../services/apiService";
import GraphCard from "../components/GraphCard";

const Dashboard = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [formants, setFormants] = useState([]);

  useEffect(() => {
    handleGetFormantsData();
  }, [selectedLanguage]);

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleGetFormantsData = async () => {
    if (!selectedLanguage) {
      return;
    }

    try {
      const formantList = await getFormantsLanguage({
        language: selectedLanguage,
      });

      console.log(formantList.data);
      setFormants(formantList.data);
    } catch (error) {
      console.error("Error fetching formants data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <nav className="bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <a href="/result" className="text-white mr-4">
              My Result
            </a>
            <a href="/dashboard" className="text-white">
              Users Dashboard
            </a>
          </div>
        </div>
      </nav>
      <div className="flex flex-col items-center justify-center mt-8 bg-blue-100">
        <select
          className="p-2 rounded border border-gray-300 mb-4"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">Select Language</option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>

        <div className="grid grid-cols-4  gap-4">
          {formants?.map((formant, index) => (
            <GraphCard key={index} data={formant} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
