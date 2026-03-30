import React, { useState, useRef } from "react";
import "../styles/Itinerariu.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useAuth } from "../contexts/authContext";
// import html2pdf from "html2pdf.js";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import download from "downloadjs";

const Itinerariu = () => {
  const { currentUser } = useAuth();
  const [savingPreferences, setSavingPreferences] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const destinatieStart = urlParams.get("destinatieStart");
  const destinatie = urlParams.get("destinatie");
  const attractions = decodeURIComponent(urlParams.get("attractions") || "");
  const program = decodeURIComponent(urlParams.get("program") || "");
  const mapUrl = decodeURIComponent(urlParams.get("mapUrl") || "");
  const rute = decodeURIComponent(urlParams.get("ruta") || "");
  const timp = decodeURIComponent(urlParams.get("timp") || "");
  const detalii_rute = decodeURIComponent(urlParams.get("detalii_rute") || "");
  const recomandare = decodeURIComponent(urlParams.get("recomandare") || "");

  // console.log("Detalii Itinerariu:", recomandare);
  console.log("Map URL:", mapUrl);

  const parsedAttractions = attractions ? attractions.split("\n") : [];
  const parsedProgram = program ? program.split("\n") : [];
  const parsedTimp = timp ? timp.split("\n") : [];

  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const fullPageRef = useRef<HTMLDivElement>(null);
  const handleRatingChange = (
    index: number,
    rating: number,
    attractionName: string
  ) => {
    console.log(`Rating changed for attraction '${attractionName}': ${rating}`);
    const newRatings = { ...ratings };
    newRatings[attractionName] = rating;
    setRatings(newRatings);
  };

  const handleSubmitRatings = () => {
    console.log("Submitting ratings...");

    const ratingsToSend: { [key: string]: any } = {
      city: destinatie,
    };

    for (const [attraction, rating] of Object.entries(ratings)) {
      const attractionName = attraction.trim();
      const cleanedAttractionName = attractionName.replace(/^\d+\.\s/, "");
      ratingsToSend[cleanedAttractionName] = rating;
    }

    console.log("Ratings to send:", ratingsToSend);
    fetch("http://localhost:5000/submit_ratings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ratingsToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);
        setRatings({});
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  function removeDiacritics(text: string): string {
    const diacriticsMap: { [key: string]: string } = {
      ă: "a",
      â: "a",
      î: "i",
      ș: "s",
      ț: "t",
      Ă: "A",
      Â: "A",
      Î: "I",
      Ș: "S",
      Ț: "T",
    };

    return text.replace(/[ăâîșțĂÂÎȘȚ]/g, (match) => diacriticsMap[match]);
  }

  const handleDownloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFont("Roboto");
    pdf.setFontSize(12);

    const addText = (text: string, y: number) => {
      const lineHeight = 6;
      const margin = 10;
      const maxWidth = pdf.internal.pageSize.width - margin * 2;

      const cleanedText = removeDiacritics(text);

      let splitText = pdf.splitTextToSize(cleanedText, maxWidth);

      if (
        y + splitText.length * lineHeight >
        pdf.internal.pageSize.height - margin
      ) {
        pdf.addPage();
        y = margin;
      }

      splitText.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += lineHeight;
      });

      return y + lineHeight;
    };

    let yOffset = 20;

    yOffset = addText(`Itinerariu ${destinatieStart} - ${destinatie}`, yOffset);

    yOffset = addText("Județe/Orașe aflate pe o rută posibilă:", yOffset);
    if (rute) {
      rute.split("\n").forEach((route) => {
        yOffset = addText(route.trim(), yOffset);
      });
    } else {
      yOffset = addText(
        "Nu există rute disponibile pentru această destinație.",
        yOffset
      );
    }

    yOffset = addText("Atracții turistice:", yOffset);
    if (parsedAttractions.length > 0) {
      parsedAttractions.slice(0, 10).forEach((attraction) => {
        yOffset = addText(attraction, yOffset);
      });
    } else {
      yOffset = addText("Nicio atracție găsită.", yOffset);
    }

    yOffset = addText("Programul atracțiilor turistice:", yOffset);
    if (parsedProgram.length > 0) {
      parsedProgram.slice(0, 10).forEach((programItem) => {
        yOffset = addText(programItem, yOffset);
      });
    } else {
      yOffset = addText("Nu există informații despre program.", yOffset);
    }

    yOffset = addText(
      "Timpul estimativ de vizitare a fiecărei atracții turistice:",
      yOffset
    );
    if (parsedTimp.length > 0) {
      parsedTimp.slice(0, 10).forEach((timpItem) => {
        yOffset = addText(timpItem, yOffset);
      });
    } else {
      yOffset = addText(
        "Nu există informații despre timpul estimativ.",
        yOffset
      );
    }

    yOffset = addText("Itinerariul recomandat de noi:", yOffset);
    if (recomandare) {
      recomandare.split("\n").forEach((elem) => {
        yOffset = addText(elem.trim(), yOffset);
      });
    } else {
      yOffset = addText("Nu există detalii despre itinerariu.", yOffset);
    }

    yOffset = addText("Ce puteți vizita în orașele de mai sus:", yOffset);
    if (detalii_rute) {
      detalii_rute.split("\n").forEach((detail) => {
        yOffset = addText(detail.trim(), yOffset);
      });
    } else {
      yOffset = addText(
        "Nu există detalii despre rute disponibile pentru această destinație.",
        yOffset
      );
    }

    yOffset = addText("Link Google Maps:", yOffset);
    pdf.textWithLink("Vezi harta cu indicații pe Google Maps", 20, yOffset, {
      url: mapUrl,
    });

    pdf.save("itinerariu.pdf");
  };

  const handleSavePreferences = async () => {
    try {
      setSavingPreferences(true);

      if (!currentUser) {
        console.error("Utilizatorul nu este autentificat.");
        return;
      }

      const preferences = {
        destinatieStart,
        destinatie,
        attractions: parsedAttractions,
        timp: parsedTimp,
        ruta: rute,
      };

      const response = await fetch("http://localhost:5000/incarca_preferinte", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.uid,
          preferences,
        }),
      });

      if (response.ok) {
        console.log("Preferințele au fost salvate cu succes!");
      } else {
        console.error("Eroare la salvarea preferințelor:", response.statusText);
      }
    } catch (error) {
      console.error("Eroare la salvarea preferințelor:", error);
    } finally {
      setSavingPreferences(false);
    }
  };

  return (
    <>
      <div className="bodyCreazaIt">
        <div
          className="containerCreazaIt"
          id="itineraryContent"
          ref={fullPageRef}
        >
          <section className="imageIt image1It"></section>
          <section className="headingIt">
            <h1 id="creazaH1It">
              Itinerariu {destinatieStart} - {destinatie}
            </h1>
          </section>
          <br />
          <section className="headingIt">
            <h1 id="creazaH1It">Atracții turistice:</h1>
          </section>
          <section className="textIt" id="customSection1It">
            <ul>
              {parsedAttractions.length > 0 ? (
                parsedAttractions.slice(0, 10).map((attraction, index) => (
                  <li key={index}>
                    {attraction}
                    <div className="rating-stars">
                      <input
                        type="radio"
                        name={`rating-${index}`}
                        id={`rs0-${index}`}
                        checked
                        onChange={() =>
                          handleRatingChange(index, 0, attraction)
                        }
                      />
                      {[1, 2, 3, 4, 5].map((value) => (
                        <React.Fragment key={value}>
                          <input
                            type="radio"
                            name={`rating-${index}`}
                            id={`rs${value}-${index}`}
                            onChange={() =>
                              handleRatingChange(index, value, attraction)
                            }
                          />
                          <label htmlFor={`rs${value}-${index}`}></label>
                        </React.Fragment>
                      ))}
                      <span className="rating-counter">
                        {ratings[attraction] || 0}
                      </span>
                    </div>
                  </li>
                ))
              ) : (
                <li>Nicio atracție găsită</li>
              )}
            </ul>
            <button type="submit" id="button-85" onClick={handleSubmitRatings}>
              Trimite Rating-urile
            </button>
          </section>
          <section className="imageIt image2It"></section>
          <section className="headingIt">
            <h1 id="creazaH1It">Programul atracțiilor turistice:</h1>
          </section>
          <section className="textIt" id="customSection2It">
            <ul>
              {parsedProgram.length > 0 ? (
                parsedProgram
                  .slice(0, 10)
                  .map((programItem, index) => (
                    <li key={index}>{programItem}</li>
                  ))
              ) : (
                <li>Nu există informații despre program</li>
              )}
            </ul>
            <br />
            <h3>
              Atenție! Programul poate varia. Vă rugăm să consultați și site-ul
              aferent atracției.
            </h3>
          </section>
          <section className="imageIt image3It"></section>
          <section className="headingIt">
            <h1 id="creazaH1It">
              Timpul estimativ de vizitare a fiecarei atracțiie turistice:
            </h1>
          </section>
          <section className="textIt" id="customSection3It">
            <ul>
              {parsedTimp.length > 0 ? (
                parsedTimp
                  .slice(0, 10)
                  .map((timpItem, index) => <li key={index}>{timpItem}</li>)
              ) : (
                <li>Nu există informații despre timpul estimativ.</li>
              )}
            </ul>
          </section>
          <section className="imageIt image8It"></section>
          <section className="headingIt">
            <h1 id="creazaH1It">Itinerariul recomandat de noi...</h1>
          </section>
          <section className="textIt" id="customSection8It">
            {recomandare ? (
              <ul className="textIt centered-content">
                {recomandare.split("\n").map((elem, index) => (
                  <li key={index}>{elem.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>Nu există detalii despre itinerariu.</p>
            )}
          </section>
          <section className="imageIt image5It"></section>
          <section className="headingIt">
            <h1 id="creazaH1It">
              Județe/Orașe aflate pe o rută posibilă pe traseul{" "}
              {destinatieStart} - {destinatie}
            </h1>
          </section>
          <section className="textIt" id="customSection5It">
            <br />
            {rute ? (
              <ul>
                {rute.split("\n").map((route, index) => (
                  <li key={index}>{route.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>Nu există rute disponibile pentru această destinație.</p>
            )}
          </section>
          <section className="imageIt image6It"></section>
          <section className="headingIt">
            <h1 id="creazaH1It">Ce puteti vizita în orașele de mai sus:</h1>
          </section>
          <section className="textIt" id="customSection6It">
            {detalii_rute ? (
              <ul className="textIt centered-content">
                {detalii_rute.split("\n").map((detail, index) => (
                  <li key={index}>{detail.trim()}</li>
                ))}
              </ul>
            ) : (
              <p>
                Nu există detalii despre rute disponibile pentru această
                destinație.
              </p>
            )}
          </section>
          <section className="imageIt image4It"></section>
          <section className="headingIt">
            <h1 id="creazaH1Itlast">
              Link Google Maps:{" "}
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#F2F0D6" }}
              >
                Vezi harta cu indicații pe Google Maps
              </a>
            </h1>
          </section>
          <button type="submit" id="button-85It" onClick={handleDownloadPDF}>
            Salvează itinerariul
          </button>
          <button
            type="submit"
            id="button-84It"
            onClick={handleSavePreferences}
            disabled={savingPreferences || !currentUser}
          >
            {savingPreferences ? "Se salvează..." : "Salvează în cont"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Itinerariu;
