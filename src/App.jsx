import React from 'react';
import { Playground } from './components/component/playground';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Component from './components/component/ai';

function App() {
    return (
        <Router basename="/Tic-Tac-Toe-Vite">
            <Routes>
                <Route path="/" element={<Playground />} />
                <Route path="/AI" element={<Component />} />
            </Routes>
        </Router>
    )
}

export default App