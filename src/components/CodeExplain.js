import React, { useState } from "react";
import { generateCode } from "../ai/AI.js";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

const CodeExplain = () => {
  const [code, setCode] = useState("");
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const formatText = (rawText) => {
    let formattedText = rawText.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    formattedText = formattedText.replace(/\*(.*?)\*/g, "");
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
    } catch (error) {
      console.error("Error generating:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6 font-poppins text-white">
      {/* Title */}
      <h1 className="text-3xl font-bold text-blue-400 mb-8">Code Explain</h1>

      {/* Content Container */}
      <div className="flex flex-col md:flex-row w-full max-w-6xl space-y-8 md:space-y-0 md:space-x-10">
        {/* Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getExplain();
          }}
          className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2"
        >
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Input Code</h2>
          <p className="text-gray-400 mb-6">Paste your code here to get an explanation.</p>

          <CodeMirror
            value={code}
            height="200px"
            extensions={[javascript()]}
            theme="dark"
            onChange={(value) => setCode(value)}
            className="rounded-lg shadow-inner"
          />

          <div className="mt-6 flex justify-center">
            <button
              className={`px-6 py-3 font-medium rounded-lg transition focus:ring focus:ring-blue-500 ${
                isGenerating
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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

        {/* Output Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">Code Explanation</h2>
          <div
            className={`bg-gray-900 p-4 rounded-lg shadow-md overflow-y-auto ${
              text ? "max-h-96" : "h-48 flex items-center justify-center"
            }`}
          >
            {text ? (
              <div
                className="text-gray-200 text-base leading-relaxed"
                dangerouslySetInnerHTML={{ __html: text }}
              ></div>
            ) : (
              <p className="text-gray-400">Your explanation will appear here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeExplain;
