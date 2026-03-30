import React, { useState, ChangeEvent, FormEvent } from "react";
import "../styles/Feedback.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    nume: "",
    email: "",
    nrContact: "",
    mesaj: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/send_email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subject: "Feedback utilizator WanderWeave",
          content: `
            Nume utilizator: ${formData.nume}
            Email: ${formData.email}
            Nr de contact: ${formData.nrContact}
            Feedback: ${formData.mesaj}
          `,
        }),
      });

      if (response.ok) {
        console.log("Email trimis cu succes!");
        alert("Email trimis cu succes!");
        setFormData({
          nume: "",
          email: "",
          nrContact: "",
          mesaj: "",
        });
      } else {
        console.error("Eroare la trimiterea emailului.");
      }
    } catch (error) {
      console.error("Eroare la trimiterea emailului:", error);
    }
  };

  const handleCancel = () => {
    setFormData({
      nume: "",
      email: "",
      nrContact: "",
      mesaj: "",
    });
  };

  return (
    <>
      <main className="bodyFeedback">
        <div className="background">
          <div className="container">
            <div className="screen">
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close"></div>
                  <div className="screen-header-button maximize"></div>
                  <div className="screen-header-button minimize"></div>
                </div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>CONTACTEAZĂ-NE</span>
                  </div>
                  <div className="app-contact">
                    CONTACT INFO : diana-mihaela.craiu"&#64;"student.tuiasi.ro
                  </div>
                </div>
                <div className="screen-body-item">
                  <div className="app-form">
                    <form onSubmit={handleSubmit}>
                      <div className="app-form-group">
                        <input
                          className="app-form-control"
                          id="nume"
                          placeholder="NUME"
                          value={formData.nume}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="app-form-group">
                        <input
                          className="app-form-control"
                          id="email"
                          placeholder="EMAIL"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="app-form-group">
                        <input
                          className="app-form-control"
                          id="nrContact"
                          placeholder="NR. CONTACT"
                          value={formData.nrContact}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="app-form-group message">
                        <input
                          className="app-form-control"
                          id="mesaj"
                          placeholder="MESAJ"
                          value={formData.mesaj}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="app-form-group buttons">
                        <button
                          type="button"
                          className="app-form-button"
                          onClick={handleCancel}
                        >
                          ANULEAZA
                        </button>
                        <button type="submit" className="app-form-button">
                          TRIMITE
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Feedback;
