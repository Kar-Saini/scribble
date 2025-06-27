import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";
import { Toaster } from "react-hot-toast";
import Draw from "./components/Draw";

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/draw" element={<Draw />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
