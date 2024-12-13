import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AnimatedBackground } from 'animated-backgrounds';
import AiButton from '../components/ai-button.tsx';

const HomePage = () => {
  const [changingText, setChangingText] = useState('debugging');
  const [fadeTransition, setFadeTransition] = useState(true);

  const words = useMemo(() => ['debugging', 'coding', 'automation', 'development'], []);
  const colors = useMemo(() => ['text-indigo-400', 'text-teal-400', 'text-yellow-400', 'text-pink-400'], []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeTransition(false);
      setTimeout(() => {
        setChangingText((prev) => {
          const currentIndex = words.indexOf(prev);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setFadeTransition(true);
      }, 400);
    }, 5000); 

    return () => clearInterval(interval);
  }, [words]);

  const getColorForWord = (word) => colors[words.indexOf(word)];

  return (
    <div className="min-h-screen flex flex-col items-center font-popins justify-center p-6 relative text-gray-100 bg-black-100">
      <AnimatedBackground animationName="starryNight"  style={{ opacity: 0.4 , zIndex: 0  }} />

      {/* Header Section */}
      <header className="text-center max-w-3xl mx-auto mb-4"  style={{ zIndex: 1  }}>
        <h1 className="text-5xl md:text-6xl font-bold  mb-4 leading-snug " style={{ color: "#7ed957" }}>
          AI-powered Tools for{' '}
          <span
            className={`transition-opacity duration-300 ${
              fadeTransition ? 'opacity-100' : 'opacity-0'
            } ${getColorForWord(changingText)}`}
          >
            {changingText}
          </span>{' '}
          and More
        </h1>
        <p className="text-lg text-white-300 mt-4 max-w-lg mx-auto leading-relaxed">
          Supercharge your coding workflow with CodeBot.ai. Automate debugging, improve code quality, and accelerate your development process with cutting-edge AI tools.
        </p>
      </header>

      {/* <AiButton /> */}

       {/* Content Sections */}
       <section className="mt-10 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-gray-300">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-green-400 mb-4">Debug Smarter</h3>
            <p>Identify issues instantly and resolve them with AI-driven insights.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Code Optimization</h3>
            <p>Refactor your code for performance and maintainability.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-yellow-400 mb-4">Custom Solutions</h3>
            <p>Generate solutions tailored to your project needs.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg transform hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold text-pink-400 mb-4">AI Integration</h3>
            <p>Seamlessly integrate AI tools into your existing workflow.</p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Button */}
      <div className="mt-16 flex justify-center">
        <Link to="/code-generator">
          <AiButton />
        </Link>
      
      </div>
    </div>
  );
};

export default HomePage;