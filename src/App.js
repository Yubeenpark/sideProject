import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';
import Login from './Login.jsx';
import Register from './Register'; // 가입 컴포넌트
import Info from './Info.jsx';

function App() {
    return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </Router>
    );
}

export default App;