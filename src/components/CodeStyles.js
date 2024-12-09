import React, { useState, useEffect } from "react";
import { FaCopy } from "react-icons/fa";
import { AnimatedBackground } from "animated-backgrounds";
import { generateCode } from "../ai/AI.js"; // Assuming a code-generating API
import hljs from "highlight.js";
import "highlight.js/styles/monokai.css";
import { useLocation } from "react-router-dom"; // To get inputCode from navigation
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
// import { dracula } from "@uiw/codemirror-theme-dracula";




const CodeStyles = () => {

    const { state } = useLocation(); // Use useLocation to get the passed state
    const { inputCode: initialInputCode } = state || {}; // Extract the passed inputCode
    const [inputCode, setInputCode] = useState(initialInputCode || "");

//   const [inputCode, setInputCode] = useState("");
  const [selectedLibrary, setSelectedLibrary] = useState("CSS");
  const [responsiveOptions, setResponsiveOptions] = useState([]);
  const [primaryColor, setPrimaryColor] = useState("#007bff");
  const [secondaryColor, setSecondaryColor] = useState("#6c757d");
  const [tertiaryColor, setTertiaryColor] = useState("#f39c12");
  const [font, setFont] = useState("Poppins");
  const [borderRadius, setBorderRadius] = useState("4");
  const [styledCode, setStyledCode] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [codeForCopy, setCodeForCopy] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleResponsiveChange = (option) => {
    setResponsiveOptions((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const generateStyledCodeHandler = async () => {
    if (!inputCode) {
      alert("Please provide the base code.");
      return;
    }

    setIsGenerating(true);

    const responsiveFor = responsiveOptions.join(", ");
    const prompt = `
      Style the following code using ${selectedLibrary}.
      Make it responsive for ${responsiveFor}.
      Use the primary color ${primaryColor}, the secondary color ${secondaryColor}, 
      the tertiary color ${tertiaryColor}, the font ${font}, and a border radius of ${borderRadius}px. Dont explain it , just give the code.
      Here is the code: 
      ${inputCode}
    `;

    console.log(prompt);

    try {
      const rawCode = await generateCode({ prompt });
      let filteredCode = rawCode
        .replace(/```[\s\S]*?\n/g, "")
        .replace(/^\s*[\w-]+\n/, "")
        .replace(/```\s*$/, "")
        .trim();

      setStyledCode(filteredCode);
    } catch (error) {
      console.error("Error generating styled code:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(styledCode);
    alert("Copied to clipboard!");
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-4 font-poppins justify-center text-white">
     <AnimatedBackground animationName="cosmicDust" style={{ opacity: 1 }} />
      <div className="flex flex-col md:flex-row w-full max-w-7xl space-y-6 md:space-y-0 md:space-x-8">
        {/* Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateStyledCodeHandler();
          }}
          className="relative bg-gray-800 p-5 pt-8 rounded-lg shadow-md w-full md:w-1/3"
        >
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Set Styles</h2>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Input Code
            </label>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter your base code here..."
              className="w-full p-3 h-40 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Library/Framework
            </label>
            <select
              value={selectedLibrary}
              onChange={(e) => setSelectedLibrary(e.target.value)}
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            >
              <option value="CSS">CSS</option>
              <option value="MUI">MUI</option>
              <option value="Tailwind">Tailwind</option>
              <option value="Bootstrap">Bootstrap</option>
            </select>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Responsive For
            </label>
            <div className="flex flex-wrap gap-2">
              {["Mobile", "Tablet", "Desktop"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={responsiveOptions.includes(option)}
                    onChange={() => handleResponsiveChange(option)}
                    className="text-blue-500 focus:ring-0"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-between space-x-4">
            <div className="flex-1">
              <label className="block text-gray-300 font-medium mb-1 text-left">
                Primary Color
              </label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-10 p-1 border border-gray-500 rounded-md bg-gray-700"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-300 font-medium mb-1 text-left">
                Secondary Color
              </label>
              <input
                type="color"
                value={secondaryColor}
                onChange={(e) => setSecondaryColor(e.target.value)}
                className="w-full h-10 p-1 border border-gray-500 rounded-md bg-gray-700"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Tertiary Color
            </label>
            <input
              type="color"
              value={tertiaryColor}
              onChange={(e) => setTertiaryColor(e.target.value)}
              className="w-full h-10 p-1 border border-gray-500 rounded-md bg-gray-700"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Font
            </label>
            <input
              type="text"
              value={font}
              onChange={(e) => setFont(e.target.value)}
              placeholder="e.g., Arial, Poppins"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Border Radius (px)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={borderRadius}
                onChange={(e) => setBorderRadius(e.target.value)}
                placeholder="e.g., 4"
                className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              />
              <span className="text-gray-400">px</span>
            </div>
          </div>

          <div className="lg:mt-30 mt-10 flex justify-center">
            {/* <button
              className="text-white px-4 py-2 rounded-md transition bg-blue-500 hover:bg-blue-600"
              type="submit"
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Add Styles"}
            </button> */}

            <button
              className={`px-6 py-3 font-medium rounded-lg transition focus:ring focus:ring-green-500 ${
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
                "Add Styles"
              )}
            </button>
          </div>
        </form>

        {/* Output Section */}
        <div className="bg-gray-800 p-3 md:p-6 rounded-lg shadow-md w-full md:w-2/3 flex flex-col">
          <div className="relative flex justify-center items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-300">Styled Code</h2>
            <button
              onClick={handleCopyText}
              className="bg-gray-700 p-2 rounded-full hover:bg-gray-600 absolute right-0"
              title="Copy Code"
            >
              <FaCopy className="text-white text-sm" />
            </button>
          </div>
          <CodeMirror
            value={styledCode}
            height="850px"
            extensions={[javascript()]}
            theme="dark"
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeStyles; 