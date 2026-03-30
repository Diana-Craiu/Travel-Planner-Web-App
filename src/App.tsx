import Menu from "./components/Menu";
import Acasa from "./pages/Acasa";
import Footer from "./components/Footer";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import Creaza from "./pages/Creaza";
import Login from "./pages/Login";
import Cont from "./pages/Cont";
import Vremea from "./pages/Vremea";
import Itinerariu from "./pages/Itinerariu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
function App() {
  // const [alertVisible, setAlertVisibility] = useState(false);

  return (
    <>
      <AuthProvider>
        <div>
          <Menu></Menu>
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Acasa />} />
            <Route path="acasa" element={<Acasa />} />
            <Route path="feedback" element={<Feedback />} />
            <Route path="about" element={<About />} />
            <Route path="creaza" element={<Creaza />} />
            <Route path="login" element={<Login />} />
            <Route path="cont" element={<Cont />} />
            <Route path="vremea" element={<Vremea />} />
            <Route path="itinerariu" element={<Itinerariu />} />
          </Routes>
        </Router>
      </AuthProvider>
      <Footer></Footer>
    </>
  );
}

export default App;
