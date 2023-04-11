import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Staff from "./components/staff_member/Staff";
import Enter from "./components/Enter";
import StaffInfo from "./components/staff_member/StaffInfo";
import Dashboard from "./components/dashboard/Dashboard";
import Animals from "./components/animal/Animals";
import Events from "./components/events/Events";
import Tickets from "./components/Tickets";
import Habitats from "./components/habitats/Habitats";
import EditStaffMember from "./components/staff_member/EditStaffMember";
import AddStaffMember from "./components/staff_member/AddStaffMember";
import EditAnimal from "./components/animal/EditAnimal";
import AddAnimal from "./components/animal/AddAnimal";
import AddHabitat from "./components/habitats/AddHabitat";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Enter />} />
        <Route path="/animals" element={<Animals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<Events />} />
        <Route path="/habitats" element={<Habitats />} />
        <Route path="/staff" element={<Staff />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/staff/:id" element={<StaffInfo />} />
        <Route path="/staff/edit/:id" element={<EditStaffMember />} />
        <Route path="/staff/add" element={<AddStaffMember />} />
        <Route path="/animal/edit/:id" element={<EditAnimal />} />
        <Route path="/animal/add" element={<AddAnimal />} />
        <Route path="/habitat/add" element={<AddHabitat />} />
      </Routes>
    </Router>
  );
}

export default App;
