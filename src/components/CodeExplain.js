import React, { useState } from "react";
import { generateCode } from "../ai/AI.js";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeExplain = () => {
  const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExplanationView, setIsExplanationView] = useState(false);

  const formatText = (rawText) => {
    let formattedText = rawText.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "<i>$1</i>");
    return formattedText;
  };

  const getExplain = async () => {
    if (!code) {
      alert("Please insert the code.");
      return;
    }

    setIsGenerating(true);
    const requestBody = { prompt: `Explain this code: ${code}` };

    try {
      const response = await generateCode(requestBody);
      const formattedText = formatText(response);
      setText(formattedText);
      setIsExplanationView(true); 
    } catch (error) {
      console.error("Error generating:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isExplanationView) {
    return (
      <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center font-poppins text-white">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-5xl">
          <h2 className="text-3xl font-semibold text-gray-300 mb-6 text-center">
            Code Explanation
          </h2>
          <div
            className="bg-gray-900 p-6 rounded-lg shadow-md text-gray-200 text-lg leading-relaxed overflow-y-auto max-h-[70vh]"
            dangerouslySetInnerHTML={{ __html: text }}
          ></div>
        </div>
        <button
          className="mt-10 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg text-lg transition"
          onClick={() => setIsExplanationView(false)}
        >
          Back to Input
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-poppins text-white p-6">
      {/* Input Section */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getExplain();
        }}
        className="relative bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg"
      >
       
        <h2 className="text-2xl font-semibold text-gray-300 mb-4">Input Code</h2>
        <p className="text-gray-400 mb-6 text-center">
          Paste your code here to get an explanation.
        </p>

        <CodeMirror
          value={code}
          height="300px"
          extensions={[javascript()]}
          theme="dark"
          onChange={(value) => setCode(value)}
          className="rounded-lg shadow-inner border border-gray-600"
        />

        <div className="mt-8 flex justify-center">
          <button
            className={`px-8 py-3 font-medium rounded-lg transition focus:ring focus:ring-blue-500 shadow-lg text-white text-lg ${
              isGenerating
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
            type="submit"
            disabled={isGenerating}
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Explanation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CodeExplain;