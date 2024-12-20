import React from 'react';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import logo from '../assets/codebotlogo.png';
const Footer = React.forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="bg-white/5 backdrop-blur-lg text-gray-700 py-10   border-gray-300">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
         
          <div className="max-w-md text-center md:text-left">
         
            <span className="text-2xl font-bold text-white">
            Code<span className="text-green-500">Bot</span>
          </span>
            <p className="text-gray-300">
            CodeBot is an AI-powered tool designed to help developers and learners understand code effortlessly. By pasting code into the editor, users can generate detailed, step-by-step explanations powered by advanced AI technology. Perfect for debugging, learning, and exploring code functionality, CodeBot simplifies even the most complex programming concepts in seconds.            </p>
          </div>

         
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Contact Me</h2>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/tharindu-sandeepa99/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-500 transition"
              >
                <FaLinkedin className="mr-2 text-xl" />
                <span>LinkedIn</span>
              </a>
              <a
                href="mailto:katharindusandeepa@gmail.com"
                className="flex items-center text-gray-300 hover:text-blue-500 transition"
              >
                <FaEnvelope className="mr-2 text-xl" />
                <span>katharindusandeepa@gmail.com</span>
              </a>
              <a
                href="https://github.com/Tharindu-Sandeepa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-300 hover:text-blue-500 transition"
              >
                <FaGithub className="mr-2 text-xl" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
       

     
      <div className="flex flex-col items-center mt- text-center text-gray-500 text-sm">
         
          <img
            src={logo}
            alt="AiPen Logo"
            className="w-16 h-16 md:w-20 md:h-20 object-contain mb-4"
          />
          <p>&copy; {new Date().getFullYear()} Tharindu Sandeepa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

export default Footer;