import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DateLoc from './components/component/date-loc-dialogue';
import BusDialogue from './components/component/bus-dialogue';
import SignUpLogin from './components/component/signup-login';
import { DashboardTest } from './components/component/dashboard-test';
import { BusesList } from './components/component/buses-list';
import { MainPage } from './components/component/main-page';

function App() {
    return (
        // create a react router
        <Router>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/date-loc" element={<DateLoc />} />
                <Route path="/bus-dialogue" element={<BusDialogue />} />
                <Route path="/signup-login" element={<SignUpLogin />} />
            </Routes>
        </Router>
    )
}

export default App