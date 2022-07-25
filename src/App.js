import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import io from "socket.io-client";
import "./App.css";

import RoomContext from "./contexte/roomContext";
import SocketContext from "./contexte/socketContext";

import FirstPage from "./pages/FirstPage/FirstPage";
import SecondPage from "./pages/SecondPage/SecondPage";

function App() {
  const [socket, setSocket] = useState(null);

  const [room, setRoom] = useState({});
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      <Router>
        <SocketContext.Provider value={{ socket, setSocket }}>
          <RoomContext.Provider
            value={{ room, setRoom, username, setUsername }}
          >
            <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/chat/:id" element={<SecondPage />} />
            </Routes>
          </RoomContext.Provider>
        </SocketContext.Provider>
      </Router>
    </div>
  );
}

export default App;
