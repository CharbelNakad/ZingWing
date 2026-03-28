import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MissionsList from "./pages/MissionsList";
import MissionDetails from "./pages/MissionDetails";
import AddMission from "./pages/AddMission";
import EditMission from "./pages/EditMission";
import DeleteMission from "./pages/DeleteMission";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/missions" element={<MissionsList />} />
          <Route path="/missions/new" element={<AddMission />} />
          <Route path="/missions/:id" element={<MissionDetails />} />
          <Route path="/missions/:id/edit" element={<EditMission />} />
          <Route path="/missions/:id/delete" element={<DeleteMission />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
