import React, { useState, FormEvent, MouseEvent } from "react";
import "../styles/Creaza.css";
import DateRangeCalculator from "../components/DataCalculator";

const Creaza = () => {
  const [destinatieStart, setDestinatieStart] = useState("");
  const [destinatie, setDestinatie] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [turismTypes, setTurismTypes] = useState<string[]>([]);
  const [nrZile, setNrZile] = useState<string>("");

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setTurismTypes([...turismTypes, value]);
    } else {
      setTurismTypes(turismTypes.filter((type) => type !== value));
    }
  };

  const handleDurationChange = (duration: number) => {
    setNrZile(duration.toString());
  };

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    const button = e.target as HTMLButtonElement;
    button.disabled = true;
    try {
      const response = await fetch("http://localhost:5000/get_attractions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          city: destinatie,
          startCity: destinatieStart,
          turismTypes: turismTypes,
          nrZile: nrZile,
        }),
      });
      const data = await response.json();
      if (data.error) {
        setErrorMessage(data.error);
      } else {
        window.location.href = `/itinerariu?destinatieStart=${destinatieStart}&destinatie=${destinatie}&attractions=${encodeURIComponent(
          data.attractions
        )}&program=${encodeURIComponent(
          data.program
        )}&ruta=${encodeURIComponent(data.ruta)}&mapUrl=${encodeURIComponent(
          `https://www.google.com/maps?q=directions+from+${destinatieStart}+to+${destinatie}`
        )}&timp=${encodeURIComponent(
          data.timp
        )}&detalii_rute=${encodeURIComponent(
          data.detalii_rute
        )}&recomandare=${encodeURIComponent(data.recomandare)}`;
      }
    } catch (error) {
      console.error("Eroare:", error);
      setErrorMessage(
        "A apărut o eroare. Vă rugăm să încercați din nou mai târziu."
      );
    } finally {
      setLoading(false);
      button.disabled = false;
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="bodyCreaza">
        <div className="containerCreaza">
          <section className="image image1"></section>
          <section className="heading">
            <h1 id="creazaH1">Începeți să vă creați itinerariul...</h1>
            <h1 id="creazaH1">Alegeți destinația...</h1>
          </section>
          <section className="text" id="customSection1">
            <form>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Destinatie Start"
                  value={destinatieStart}
                  onChange={(e) => setDestinatieStart(e.target.value)}
                  required
                />
                <label htmlFor="destinatieStart" className="form__label">
                  De la
                </label>
              </div>
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Destinatie"
                  value={destinatie}
                  onChange={(e) => setDestinatie(e.target.value)}
                  required
                />
                <label htmlFor="destinatie" className="form__label">
                  Până la
                </label>
              </div>
              <br />
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </section>
          <section className="image image2"></section>
          <section className="heading">
            <h1 id="creazaH1">Alegeți perioada dorită...</h1>
          </section>
          <section className="text" id="customSection2">
            <DateRangeCalculator onDurationChange={handleDurationChange} />
          </section>

          <section className="image image3"></section>
          <section className="heading">
            <h1 id="creazaH1">Opțional alegeți tipul de turism...</h1>
          </section>
          <section className="text" id="customSection3">
            <div className="form__group field">
              <input
                type="checkbox"
                id="turism_1"
                value="Turism de recreere şi agrement"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_1">Turism de recreere şi agrement</label>
              <br />
              <input
                type="checkbox"
                id="turism_2"
                value="Turism balnear"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_2">Turism balnear</label>
              <br />
              <input
                type="checkbox"
                id="turism_3"
                value="Turism cultural ştiinţific"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_3">Turism cultural ştiinţific</label>
              <br />
              <input
                type="checkbox"
                id="turism_4"
                value="Turism de afaceri"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_4">Turism de afaceri</label>
              <br />
              <input
                type="checkbox"
                id="turism_5"
                value="Turism sportiv"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_5">Turism sportiv</label>
              <br />
              <input
                type="checkbox"
                id="turism_6"
                value="Turism de cumparaturi"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_6">Turism de cumparaturi</label>
              <br />
              <input
                type="checkbox"
                id="turism_7"
                value="Turism religios"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_7">Turism religios</label>
              <br />
              <input
                type="checkbox"
                id="turism_8"
                value="Turism culinar"
                name="turism"
                onChange={handleCheckboxChange}
              />
              <label htmlFor="turism_8">Turism culinar</label>
              <br />
            </div>
          </section>

          <section className="image image4"></section>
          <section className="heading">
            <h1 id="creaza2H1">
              Mai rămâne doar să vă bucurați de itinerariul ales...
            </h1>
          </section>
          <section className="text" id="customSection4">
            <button type="submit" id="button-85" onClick={handleSubmit}>
              {loading ? "Căutare în curs..." : "Caută atracții turistice"}
            </button>
          </section>
          {loading && (
            <div className="loader-overlay">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Creaza;
