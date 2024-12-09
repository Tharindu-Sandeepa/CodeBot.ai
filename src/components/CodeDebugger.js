import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { generateCode } from '../ai/AI.js';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

const CodeDebugger = () => {
  const [inputCode, setInputCode] = useState('');
  const [outputCode, setOutputCode] = useState('');
  const [userInstructions, setUserInstructions] = useState('');
  const [isDebugging, setIsDebugging] = useState(false);

  const handleDebugCode = async () => {
    if (!inputCode.trim()) {
      alert('Please enter the code to debug.');
      return;
    }

    setIsDebugging(true);

    const requestBody = {
      prompt: `Debug the following code and fix all errors${
        userInstructions ? `, considering these instructions: ${userInstructions}` : ''
      }. Just return the fixed code without explanations.\n\n${inputCode}`,
    };

    try {
      const rawOutput = await generateCode(requestBody);
      const filteredOutput = rawOutput
        .replace(/```[\s\S]*?\n/g, '') // Remove Markdown code blocks
        .replace(/```\s*$/, '') // Remove trailing Markdown code block
        .trim();
      setOutputCode(filteredOutput);
    } catch (error) {
      console.error('Error debugging code:', error);
    } finally {
      setIsDebugging(false);
    }
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(outputCode);
    alert('Output code copied to clipboard!');
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-4 font-poppins text-white">
      <div className="flex flex-col w-full max-w-4xl space-y-6">
        {/* Input Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Code Debugger</h2>

          <label className="block text-gray-300 font-medium mb-2 text-left">Your Code</label>
          <CodeMirror
            value={inputCode}
            height="200px"
            extensions={[javascript()]}
            theme="dark"
            onChange={(value) => setInputCode(value)}
          />

          <label className="block text-gray-300 font-medium mt-4 mb-2 text-left">
            Additional Instructions (optional)
          </label>
          <textarea
            value={userInstructions}
            onChange={(e) => setUserInstructions(e.target.value)}
            placeholder="Add specific instructions for the debugger (e.g., 'Optimize for performance')."
            className="w-full p-2 h-20 border border-gray-500 rounded-md bg-gray-700 text-white focus:outline-none focus:border-blue-500"
          />

          <button
            onClick={handleDebugCode}
            className={`mt-6 text-white px-4 py-2 rounded-md transition ${
              isDebugging ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={isDebugging}
          >
            {isDebugging ? 'Debugging...' : 'Debug Code'}
          </button>
        </div>

        {/* Output Section */}
        {outputCode && (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="relative flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-300">Fixed Code</h2>
              <button
                onClick={handleCopyOutput}
                className="bg-gray-600 text-gray-300 hover:text-gray-300 px-4 py-2 rounded-md"
              >
                <FaCopy />
              </button>
            </div>

            <CodeMirror
              value={outputCode}
              height="400px"
              extensions={[javascript()]}
              theme="dark"
              editable={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeDebugger;