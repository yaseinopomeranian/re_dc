import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './components/Home';
import TakeStat from './takeshiComponents/TakeStat';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
	    {/* <Route path="/" element={<Home />} /> */} {/* http://<serverIP>:3000/ */}
		<Route path="/TakeStat" element={<TakeStat />} />  {/* http://<serverIP>/takeStat */}
            </Routes>
        </Router>
    );
};

export default App;

