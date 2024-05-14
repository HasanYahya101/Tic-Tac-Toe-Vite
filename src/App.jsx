import React from 'react';

import DateLoc from './components/component/date-loc-dialogue';
import BusDialogue from './components/component/bus-dialogue';
import SignUpLogin from './components/component/signup-login';
import { DashboardTest } from './components/component/dashboard-test';
import { BusesList } from './components/component/buses-list';

function App() {


    return (
        <DashboardTest />
        //<BusesList dep_loc={"Lahore"} arr_loc={"Islamabad"} date={"17"} month={"5"} year={"2024"} />
    )
}

export default App
