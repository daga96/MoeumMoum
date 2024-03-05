import React from "react";
import VowelFormants from "./VowelFormants";

const GraphCard = (data) => {
  return (
    <div className="h-[400px] w-[400px] bg-white rounded-md p-8">
      <div>
        <VowelFormants formants={data.data.formants} width="333" height="250" />
        <hr className="border-gray-500" />
        <div className="font-bold">{data.data.nickname}</div>
        <div className="flex">
          {data.data.languages.map((language, index) => (
            <div
              key={index}
              className="flex max-width-content items-center bg-blue-500 text-sm text-white px-4 py-1 rounded-full mr-2 mb-2 mt-4"
            >
              {language}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GraphCard;
