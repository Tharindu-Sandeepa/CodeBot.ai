import React, { useState, useEffect, useCallback } from 'react';
import { FaCopy } from 'react-icons/fa';
import { AnimatedBackground } from 'animated-backgrounds';
import { generateCode } from '../ai/AI.js';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const CodeGenerator = () => {
  const [language, setLanguage] = useState('');
  const [task, setTask] = useState('');
  const [code, setCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [includeComments, setIncludeComments] = useState(true);
  const [fileName, setFileName] = useState('');
  const [languageSuggestions, setLanguageSuggestions] = useState([]);
  const navigate = useNavigate();

  const languagesList = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'React',
    'Node.js',
    'Flutter',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Go',
    'Rust',
    'Angular',
    'Vue.js',
    'Django',
    'Spring Boot',
    'Html'
  ];

  useEffect(() => {
    window.scrollTo(0, 0);

    // Suppress ResizeObserver error
    const suppressResizeObserverError = (e) => {
      if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener('error', suppressResizeObserverError);

    return () => {
      window.removeEventListener('error', suppressResizeObserverError);
    };
  }, []);

  const handleLanguageChange = (e) => {
    const value = e.target.value;
    setLanguage(value);

    if (value) {
      const filteredSuggestions = languagesList.filter((lang) =>
        lang.toLowerCase().includes(value.toLowerCase())
      );
      setLanguageSuggestions(filteredSuggestions);
    } else {
      setLanguageSuggestions([]);
    }
  };

  const generateCodeHandler = async () => {
    if (!task) {
      alert('Please enter the task for the code.');
      return;
    }

    setIsGenerating(true);
    const requestBody = {
      prompt: `Generate a ${language} code named "${fileName}" to do ${task}, just give the code, won't explain just give the output, add comments`,
    };

    try {
      const rawCode = await generateCode(requestBody);
      let filteredCode = rawCode
        .replace(/```[\s\S]*?\n/g, '')
        .replace(/^\s*[\w-]+\n/, '')
        .replace(/```\s*$/, '')
        .trim();

      if (!includeComments) {
        filteredCode = filteredCode.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '');
      }

      setCode(filteredCode);
    } catch (error) {
      console.error('Error generating code:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(code);
    alert('Copied to clipboard!');
  };

  const handleAddStyles = () => {
    navigate('/code-styles', { state: { inputCode: code } });
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-4 font-poppins justify-center text-white">
      <AnimatedBackground animationName="cosmicDust" style={{ opacity: 1 }} />
      <div className="flex flex-col md:flex-row w-full max-w-7xl space-y-6 md:space-y-0 md:space-x-8">
        {/* Input Section */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            generateCodeHandler();
          }}
          className="relative bg-gray-800 p-5 pt-8 rounded-lg shadow-md w-full md:w-1/3"
        >
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Code Generator</h2>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">
              Programming Language, Framework, or Library
            </label>
            <input
              type="text"
              value={language}
              onChange={handleLanguageChange}
              placeholder="Type or select a language"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
              list="language-options"
            />
            <datalist id="language-options">
              {languageSuggestions.map((lang) => (
                <option key={lang} value={lang} />
              ))}
            </datalist>
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">File Name</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="e.g., index.js"
              className="w-full p-2 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mt-6">
            <label className="block text-gray-300 font-medium mb-1 text-left">Task Description</label>
            <textarea
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Describe the task (e.g., 'Create a function that sorts an array')"
              className="w-full p-3 h-64 border border-gray-500 rounded-md focus:outline-none focus:border-blue-500 bg-gray-700 text-white"
            />
          </div>

          <div className="mt-6 flex items-center">
            <input
              type="checkbox"
              checked={includeComments}
              onChange={() => setIncludeComments(!includeComments)}
              className="mr-2 h-4 w-4 text-green-500"
            />
            <label className="text-gray-300">Include comments in code</label>
          </div>

          <div className="mt-10 flex justify-center space-x-4">
          <button
    className={`text-white px-4 py-2 rounded-md transition ${
      isGenerating ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
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
    ) : code ? "Regenerate" : "Generate Code"}
  </button>
  {code && (
    <button
      className="text-white px-4 py-2 rounded-md transition bg-green-500 hover:bg-green-600"
      onClick={handleAddStyles}
      disabled={isGenerating}
    >
      Add Styles
    </button>
  )}
</div>
        </form>

        {/* Output Section */}
        <div
          className="bg-gray-800 p-3 md:p-6 rounded-lg shadow-md w-full md:w-2/3 flex flex-col"
          style={{ overflow: 'hidden' }}
        >
          <div className="relative flex justify-center items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-300">Generated Code</h2>
            <button
              onClick={handleCopyText}
              className="bg-gray-600 text-gray-300 hover:text-gray-300 px-4 py-2 rounded-md absolute top-0 right-0"
              disabled={isGenerating}
            >
              <FaCopy />
            </button>
          </div>

          <CodeMirror
            value={code}
            height="650px"
            extensions={[javascript()]}
            theme="dark"
            editable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeGenerator;