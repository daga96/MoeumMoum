import React, { useEffect, useState } from "react";
import { getFormants } from "../../services/apiService";
import VowelFormants from "../components/VowelFormants";

const Result = () => {
  const [formants, setFormants] = useState([]);
  const [showKoreanData, setShowKoreanData] = useState(false);

  const nickname = localStorage.getItem("nickname");
  useEffect(() => {
    const getFormantsData = async () => {
      const formantList = await getFormants({ nickname: nickname });

      setFormants(formantList.data[0].formants);
    };
    getFormantsData();
  }, []);

  return (
    <div className="min-h-screen  flex flex-col items-center bg-blue-100">
      <nav className="w-full bg-gray-800 p-4">
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
      <div className="flex flex-col w-4/6 items-center bg-white rounded-md shadow-lg  mt-8 p-8">
        <h3>
          Hi <b>{nickname}</b>
        </h3>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onChange={() => setShowKoreanData(!showKoreanData)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Show Korean Data
          </span>
        </label>
        <VowelFormants formants={formants} korean={showKoreanData} />
      </div>
    </div>
  );
};

export default Result;
