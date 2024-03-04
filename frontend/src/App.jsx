import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import FormantsInput from "./pages/FormantInput";
import Result from "./pages/Result";

function App() {
  return (
    <div className="w-screen">
      <Router>
        <div className="w-screen">
          <Routes>
            <Route exact path="/" element={<Welcome />}></Route>
            <Route path="/form" element={<FormantsInput />}></Route>
            <Route path="/result" element={<Result />}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
