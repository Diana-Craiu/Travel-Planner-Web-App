import "../styles/Navbar.css";
import { useAuth } from "../contexts/authContext";

const Menu = () => {
  const { userLoggedIn } = useAuth();

  return (
    <>
      <nav className="nav-font">
        <div className="wrapper">
          <div className="logo">
            <a href="/">WanderWeave</a>
          </div>
          <input type="radio" name="slider" id="menu-btn" />
          <input type="radio" name="slider" id="close-btn" />
          <ul className="nav-links">
            <label htmlFor="close-btn" className="btn close-btn">
              <i className="fas fa-times"></i>
            </label>
            <li>
              <a href="/">Acasă</a>
            </li>
            <li>
              <a href="/about">Despre</a>
            </li>
            <li>
              <a href="#" className="desktop-item">
                Servicii
              </a>
              <input type="checkbox" id="showDrop" />
              <label htmlFor="showDrop" className="mobile-item">
                Servicii
              </label>
              <ul className="drop-menu">
                <li>
                  <a href="/creaza">Crează itinerariu</a>
                </li>
                <li>
                  <a
                    href="https://www.booking.com/index.ro.html?aid=2311236;label=ro-ro-booking-desktop-LNohG83GXptcOuYmW1foQQS652796014449:pl:ta:p1:p2:ac:ap:neg:fi:tikwd-65526620:lp20903:li:dec:dm;ws=&gad_source=1&gclid=CjwKCAjwouexBhAuEiwAtW_Zx6p_7MUQfOav2NZNFHHm83srvhQytiE83QfhK7ACUDde1fu611K-yBoCH_YQAvD_BwE"
                    target="_blank"
                  >
                    Booking
                  </a>
                </li>
                <li>
                  <a href="/vremea">Vremea</a>
                </li>
                <li>
                  <a
                    href="https://zilesinopti.ro/evenimente-romania/"
                    target="_blank"
                  >
                    Descoperă
                  </a>
                </li>
                <li>
                  <a href="https://www.vola.ro/" target="_blank">
                    Zboruri
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/feedback">Feedback</a>
            </li>
            {userLoggedIn ? (
              <>
                {console.log("userLoggedIn:", userLoggedIn)}
                <li>
                  <a href="/cont">Cont</a>
                </li>
                <script>alert("User logat")</script>
              </>
            ) : (
              <>
                {console.log("userLoggedIn:", userLoggedIn)}
                <li>
                  <a href="/login">Login</a>
                </li>
              </>
            )}
          </ul>
          <label htmlFor="menu-btn" className="btn menu-btn">
            <i className="fas fa-bars"></i>
          </label>
        </div>
      </nav>
    </>
  );
};

export default Menu;
