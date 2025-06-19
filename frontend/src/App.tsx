import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Game from "./pages/Game/Game";
import Scoreboard from "./pages/Scoreboard/Scoreboard";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/game/:imageId" element={<Game />} />
                <Route path="/scoreboard/:imageId" element={<Scoreboard />} />
            </Routes>
        </Router>
    );
};

export default App;
