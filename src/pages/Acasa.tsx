// import React from 'react'
import "../styles/Acasa.css";
const Acasa = () => {
  return (
    <>
      <main className="body">
        <div className="external">
          <div className="horizontal-scroll-wrapper">
            <div className="img-wrapper slower">
              <a
                href="https://palatulculturii.ro/"
                target="_blank"
                rel="noopener"
                className="image-link"
              >
                <img
                  src="./Imagini/PalaceOfCulture.jpeg"
                  alt="Palatul Culturii Iasi"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Palatul Culturii Iasi</p>
              </div>
            </div>

            <div className="img-wrapper faster">
              <a
                href="https://www.salinaturda.eu/"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="./Imagini/SalinaTurda.jpeg"
                  alt="Salina Turda"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Salina Turda</p>
              </div>
            </div>

            <div className="img-wrapper slower vertical">
              <a href="https://peles.ro/" target="_blank" rel="noopener">
                <img
                  src="/Imagini/CastelulPeles.jpeg"
                  alt="Castelul Peles Sinaia"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Castelul Peles Sinaia</p>
              </div>
            </div>

            <div className="img-wrapper slower slower-down">
              <a href="https://castelulbran.ro/" target="_blank" rel="noopener">
                <img
                  src="/Imagini/BranCastle.jpeg"
                  alt="Castelul Bran Brasov"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Castelul Bran Brasov</p>
              </div>
            </div>

            <div className="img-wrapper">
              <a
                href="https://castelulcorvinilor.ro/"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="/Imagini/CastelulCorvinilor.jpeg"
                  alt="Castelul Corvinilor Sighisoara"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Castelul Corvinilor Sighisoara</p>
              </div>
            </div>

            <div className="img-wrapper slower">
              <a
                href="https://romaniasalbatica.ro/ro/rezervatie-biosfera/delta-dunarii"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="/Imagini/DeltaDunarii.jpeg"
                  alt="Delta Dunarii Dobrogea"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Delta Dunarii Dobrogea</p>
              </div>
            </div>

            <div className="img-wrapper faster1">
              <a
                href="https://mocanita-maramures.com/"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="/Imagini/Mocanita.jpeg"
                  alt="Mocanita Maramures"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Mocanita Maramures</p>
              </div>
            </div>

            <div className="img-wrapper slower slower2">
              <a href="http://cic.cdep.ro/" target="_blank" rel="noopener">
                <img
                  src="/Imagini/PalatulParlamentului.jpeg"
                  alt="Palatul Parlamentului Bucuresti"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Palatul Parlamentului Bucuresti</p>
              </div>
            </div>

            <div className="img-wrapper">
              <a href="https://www.mohos.ro/ro" target="_blank" rel="noopener">
                <img
                  src="/Imagini/LaculSfantaAna.jpg"
                  alt="Lacul Sfanta Ana Harghita"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Lacul Sfanta Ana Harghita</p>
              </div>
            </div>

            <div className="img-wrapper slower">
              <a
                href="https://viziteazaalbaiulia.ro/ce-program-au-obiectivele-turistice-din-albaiulia/"
                target="_blank"
                rel="noopener"
              >
                <img
                  src="/Imagini/CetateaAlbaIulia.jpg"
                  alt="Cetatea Alba Iulia"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Cetatea Alba Iulia</p>
              </div>
            </div>

            <div className="img-wrapper slower last">
              <a href="https://valeazanelor.ro/" target="_blank" rel="noopener">
                <img
                  src="/Imagini/ValeaZanelor.jpeg"
                  alt="Valea Zanelor Sibiu"
                  className="imgAcasa"
                />
              </a>
              <div className="overlay">
                <p className="overlay-text">Valea Zanelor Sibiu</p>
              </div>
            </div>
          </div>

          <div className="spatiu"></div>
          <p className="scroll-info">
            <span className="icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                version="1.1"
                x="0px"
                y="0px"
                viewBox="0 0 100 100"
              >
                <path d="M50,67.1c-0.6,0-1.2-0.2-1.8-0.7c-3.8-3.8-7.7-7.7-11.5-11.5c-2.3-2.3,1.2-5.8,3.5-3.5c2.5,2.5,4.9,4.9,7.4,7.4      c0-13.7,0-27.4,0-41.2c0-0.6,0.2-1.2,0.5-1.5c0,0,0,0,0,0c0.4-0.6,1.1-1,2-0.9c13.7,0.3,26.4,7.2,33.5,19.1      C96.5,55.9,84.7,85,60.2,91.6C35.5,98.2,11.6,79.1,11.1,54c-0.1-3.2,4.9-3.2,5,0c0.3,13.8,8.4,26.4,21.3,31.5      c12.5,5,27.1,1.9,36.6-7.5c9.5-9.5,12.5-24.1,7.5-36.6c-4.8-12.1-16.3-20.1-29-21.2c0,12.8,0,25.5,0,38.3      c2.5-2.5,4.9-4.9,7.4-7.4c2.3-2.3,5.8,1.3,3.5,3.5c-3.9,3.9-7.8,7.8-11.8,11.8C51.2,66.9,50.6,67.1,50,67.1z" />
              </svg>
            </span>{" "}
            Derulează în jos pentru mai multe informații
          </p>
        </div>
        <div className="containerTitluAcasa">
          <h1 className="h1TitluAcasa">Știați că...</h1>
        </div>
        <div className="containerAcasaWrapper">
          <div className="containerAcasa">
            <section className="introAcasa"></section>

            <div className="metaAcasa">
              <div className="meta__innerAcasa">
                <h3 className="h3Acasa">Știați că...</h3>
                <p className="pAcasa">
                  Al doilea glaciar subteran ca mărime din Europa, Ghețarul din
                  Peștera Scărișoara, se găsește sub Munții Bihor din România.
                  Are un volum de 75.000 de metri cubi și are o vechime de peste
                  3.500 de ani.{" "}
                  <a
                    href="https://www.libertatea.ro/lifestyle/curiozitati-despre-romania-4627658"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aflați mai multe...
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="containerAcasa2">
            <section className="introAcasa2"></section>

            <div className="metaAcasa">
              <div className="meta__innerAcasa">
                <h3 className="h3Acasa">Știați că...</h3>
                <p className="pAcasa">
                  Statuia lui Decebal, sculptata intr-o stanca de la Cazanele
                  Dunarii, este cea mai inalta sculptura in piatra din Europa,
                  avand 55 de m inaltime.{" "}
                  <a
                    href="https://www.cistour.ro/blog/romania/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aflați mai multe...
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="containerAcasa3">
            <section className="introAcasa3"></section>

            <div className="metaAcasa">
              <div className="meta__innerAcasa">
                <h3 className="h3Acasa">Știați că...</h3>
                <p className="pAcasa">
                  Padurea Baciu din Cluj Napoca a fost considerata cea mai
                  paranormala zona de pe planeta.{" "}
                  <a
                    href="https://radioda.ro/2020/11/17/38-de-lucruri-uimitoare-despre-romania-pe-care-nu-le-stiai/ "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aflați mai multe...
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <div className="containerAcasaWrapper">
          <div className="containerAcasa4">
            <section className="introAcasa4"></section>

            <div className="metaAcasa">
              <div className="meta__innerAcasa">
                <h3 className="h3Acasa">Știați că...</h3>
                <p className="pAcasa">
                  Castelul Peleș din Sinaia a fost primul de pe continent
                  complet iluminat electric (1888).{" "}
                  <a
                    href="https://playtech.ro/2021/10-lucruri-mai-putin-stiute-despre-romania/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aflați mai multe...
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="containerAcasa5">
            <section className="introAcasa5"></section>

            <div className="metaAcasa">
              <div className="meta__innerAcasa">
                <h3 className="h3Acasa">Știați că...</h3>
                <p className="pAcasa">
                  Cea mai înaltă clădire din România este „Sky Tower”, parte a
                  complexului Floreasca City Center din București. Finalizată în
                  2012, clădirea are o înălțime de 137 m și 37 de etaje. Citeşte
                  întreaga ştire: Curiozități despre România. Ce nu știai despre
                  România{" "}
                  <a
                    href="https://www.lumeasatului.ro/stiri-agricultura/social/8779-stiati-ca-despre-romania.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aflați mai multe...
                  </a>
                </p>
              </div>
            </div>
          </div>
          <div className="containerAcasa6">
            <section className="introAcasa6"></section>

            <div className="metaAcasa">
              <div className="meta__innerAcasa">
                <h3 className="h3Acasa">Știați că...</h3>
                <p className="pAcasa">
                  Singurul papirus întreg din Europa a fost descoperit în
                  România. Acesta este scris în greaca veche, datează din
                  secolul al IV-lea î.Hr și a fost descoperit la Mangalia în
                  1959. Papirusul a fost trimis în același an la Moscova pentru
                  restaurare și conservare și pentru a fi descifrat. A fost
                  returnat României în anul 2011.{" "}
                  <a
                    href="https://radioda.ro/2020/11/17/38-de-lucruri-uimitoare-despre-romania-pe-care-nu-le-stiai/ "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    aflați mai multe...
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="containerTitluAcasa">
          <h1 className="h1TitluAcasa">Dacă vreți să aflați mai multe...</h1>
        </div>
        <div className="containerAcasaWrapper2">
          <div className="centerAcasa">
            <div className="article-cardAcasa">
              <div className="contentAcasa">
                <p className="dateAcasa">Lansat în noiembrie 2018</p>
                <p className="titleAcasa">călător în bascheți.</p>
              </div>
              <a
                href="https://calatorinbascheti.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://fpm.ro/wp-content/uploads/image-001-5.png"
                  alt="article-cover"
                />
              </a>
            </div>
          </div>
          <div className="centerAcasa">
            <div className="article-cardAcasa">
              <div className="contentAcasa">
                <p className="dateAcasa">Lansat in 2013</p>
                <p className="titleAcasa">Travelminit</p>
              </div>
              <a
                href="https://blog.travelminit.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://s.szalas.hu/images/mainpage/ogimages/travelminit.jpg"
                  alt="article-cover"
                />
              </a>
            </div>
          </div>
          <div className="centerAcasa">
            <div className="article-cardAcasa">
              <div className="contentAcasa">
                <p className="dateAcasa">Lansat in iulie 2015</p>
                <p className="titleAcasa">Aventurescu</p>
              </div>
              <a
                href="https://aventurescu.ro/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://aventurescu.ro/wp-content/uploads/2015/08/default-image.jpg"
                  alt="article-cover"
                />
              </a>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="containerTitluAcasa">
          <h1 className="h1TitluAcasa">Sfaturi de călătorie...</h1>
        </div>
        <div className="wrapper">
          <div className="scroll-cards">
            <article className="scroll-cards__item" aria-label="Wie - 1">
              <h2 className="h2Info">
                Planifică bine tipul de vacanță pe care ți-l dorești
              </h2>
              <br />
              <p className="pInfo">
                Pentru cei mai mulți oameni, ultimii doi ani au fost dificili,
                iar vacanța de Paște sau viitoarea vacanță de vară pot fi
                experiențe așteptate cu nerăbdare. Așadar, este important să
                faci ca acestea să merite cu adevărat, deci gândește-te bine la
                ce fel de experiență îți dorești. Relaxare? Aventură? Amândouă?
                Locuri noi sau locuri pe care le-ai mai văzut?
              </p>
            </article>
            <article className="scroll-cards__item" aria-label="Wie - 1">
              <h2 className="h2Info">
                Asigură-te că ai la tine toate actele necesare{" "}
              </h2>{" "}
              <br />
              <p className="pInfo">
                Unul dintre cele mai importante lucruri de verificat înainte de
                a călători este că ai toate actele personale și cele solicitate
                de țara în care te vei afla: în unele țări poți călători doar cu
                buletinul, în timp ce în alte zone ai nevoie de pașaport, iar în
                altele și de vize pe care trebuie să le iei din timp.
              </p>
            </article>
            <article className="scroll-cards__item" aria-label="Wie - 1">
              <h2 className="h2Info">Verifică la ce bagaje ai dreptul</h2>{" "}
              <br />
              <p className="pInfo">
                Dacă urmează ca drumul spre destinația aleasă de tine pentru
                vacanță să îl faci cu avionul, asigură-te că știi ce fel de
                bagaje ai dreptul să iei cu tine, în ce număr și ce dimensiuni
                trebuie să aibă, pentru a nu te pomeni că trebuie să plătești
                suplimentar la aeroport. Dacă ai și bagaj de mână, și de cală, e
                bine să îți pui în bagajul de mână obiectele esențiale și de
                valoare (acte, telefon, chei, laptop, încărcătoare etc.), dar și
                câteva haine, în eventualitatea nefericită în care bagajul de
                cală se rătăcește.
              </p>
            </article>
            <article className="scroll-cards__item" aria-label="Wie - 1">
              <h2>
                Nu cheltui mai mult decât e necesar în planificarea vacanței
              </h2>{" "}
              <br />
              <p className="pInfo">
                Având în vedere că în vacanțe oamenii tind să cheltuie mai mulți
                bani, este o idee bună să îți faci un plan inteligent de
                cheltuială. Planifică-ți, din timp, bugetul pentru cazare și
                drum și fă-ți o estimare pentru cheltuielile zilnice din timpul
                vacanței, așa încât să nu ai parte de surprize odată ce te afli
                la destinație.
              </p>
            </article>
            <article className="scroll-cards__item" aria-label="Wie - 1">
              <h2 className="h2Info">Ia-ți la tine o trusă de medicamente</h2>{" "}
              <br />
              <p className="pInfo">
                Dacă bagajul de vacanță îți permite, ia cu tine și o trusă de
                medicamente care ar trebui să acopere nevoile pentru cele mai
                obișnuite simptome și afecțiuni care pot apărea în vacanță, cum
                ar fi dureri de cap sau de gât, greață, balonare, diaree sau
                constipație. Dacă suferi de boli cronice pentru care faci
                tratament regulat, nu uita să-ți iei cu tine medicamentele și
                rețetele doveditoare, precum și orice dispozitive medicale de
                care ai nevoie (cum ar fi glucometrul pentru diabetici).
              </p>
            </article>
          </div>
        </div>
        <div className="containerTitluAcasa">
          <h1 className="h1TitluAcasa">
            Vă dorim o vacanță cât mai plăcută...
          </h1>
        </div>
      </main>
      {/* <Slider /> */}
    </>
  );
};

export default Acasa;
