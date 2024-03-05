import React, { useState } from "react";
import languages from "../constants/languages";
import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { addUser } from "../../services/apiService";

const Welcome = () => {
  const [nickname, setNickname] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();

  const handleTagDelete = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleAddUser = async () => {
    try {
      const addUserResult = await addUser({
        nickname,
        languages: tags,
      });

      if (addUserResult.message === "User Exists") {
        localStorage.setItem("nickname", addUserResult.data.nickname);
        localStorage.setItem(
          "languages",
          JSON.stringify(addUserResult.data.languages)
        );
        navigate("/result");
      } else if (addUserResult.message === "User Created Successfully") {
        localStorage.setItem("nickname", nickname);
        localStorage.setItem("languages", JSON.stringify(tags));
        navigate("/form");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLanguageSelect = (e) => {
    const selected = e.target.value;
    if (selected && !tags.includes(selected)) {
      setTags([...tags, selected]);
    }
    setSelectedLanguage("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center p-8 bg-white rounded-md shadow-lg">
        <h1 className="text-4xl font-bold text-blue-500 mb-2">모음 모움</h1>
        <h3 className="font-bold text-blue-500 mb-8">MOEUMMOUM</h3>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4 relative">
          <select
            value={selectedLanguage}
            onChange={handleLanguageSelect}
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Language</option>
            {languages.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-wrap justify-center w-[420px] min-h-20 border border-solid border-slate-300 p-4 mt-4 rounded-md">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex max-width-content items-center bg-blue-500 text-sm text-white px-4 py-1 rounded-full mr-2 mb-2"
            >
              {tag}
              <div
                onClick={() => handleTagDelete(tag)}
                className="ml-2 cursor-pointer"
              >
                <IoMdClose />
              </div>
            </div>
          ))}
        </div>
        <button className="bg-blue-500 text-white mt-2" onClick={handleAddUser}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default Welcome;
