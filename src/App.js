// src/App.js

import React, { useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
import FooterComponent from "./components/FooterComponent.js";
import AppBar from "./components/AppBar.js";
import HomePage from "./components/HomePage.js";
import CodeGenerator from "./components/CodeGenerator.js";
import CodeStyles from "./components/CodeStyles.js";
import CodeExplain from "./components/CodeExplain.js";
import CodeDebugger from "./components/CodeDebugger.js";

function App() {
  const footerRef = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Router>
      <div>
        <AppBar scrollToFooter={scrollToFooter} /> 
        {/* Define Routes */}
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/" element={<HomePage />} />
          <Route path="/code-generator" element={<CodeGenerator />} />
          <Route path="/code-styles" element={<CodeStyles />} />
          <Route path="/code-explain" element={<CodeExplain />} />
          <Route path="/code-debug" element={<CodeDebugger/>}/>
          {/* Add more routes as needed */}
        </Routes>
      <FooterComponent ref={footerRef} />
      </div>
    </Router>
  );
}

export default App;