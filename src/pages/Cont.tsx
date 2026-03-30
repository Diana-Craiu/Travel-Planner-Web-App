import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import "../styles/Cont.css";
import { useNavigate } from "react-router-dom";

type Preference = {
  destinatieStart: string;
  destinatie: string;
  attractions: string[];
  timp: string;
  ruta: string;
};

const Cont = () => {
  const { currentUser, userLoggedIn } = useAuth();
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      if (!currentUser) return;
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/get_preferences", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: currentUser.uid }),
        });
        const data = await response.json();
        if (response.ok) {
          setPreferences(data.preferences);
        } else {
          console.error("Eroare la extragerea preferințelor:", data.error);
        }
      } catch (error) {
        console.error("Eroare la extragerea preferințelor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, [currentUser]);

  if (!userLoggedIn) {
    return (
      <div className="bodyCont">
        <div className="revealCont">
          <h2 className="h2cont">
            Vă rugăm să vă logați pentru a accesa această pagină.
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="bodyCont">
      <h2 className="titleCont">Bun venit!</h2>
      <h1 className="subtitleCont">Sunteți logat ca: {currentUser?.email}</h1>
      <h2 className="preferencesTitle">Preferințele mele</h2>

      <div className="preferencesSection">
        {loading ? (
          <p>Se încarcă preferințele...</p>
        ) : preferences.length === 0 ? (
          <p>Nu aveți preferințe salvate.</p>
        ) : (
          <div className="scrollContainer">
            <div className="preferencesGrid">
              {preferences.map((preference, index) => (
                <div key={index} className="cardCont">
                  <h3>Preferința {index + 1}</h3>
                  <p>De la: {preference.destinatieStart}</p>
                  <p>Până la: {preference.destinatie}</p>
                  <p>Atracții: {preference.attractions.join(", ")}</p>
                  <p>Timp: {preference.timp}</p>
                  <p>Rută: {preference.ruta}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="logoutButtonCont" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Cont;
