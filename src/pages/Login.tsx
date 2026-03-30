// src/components/Login.tsx

import React, { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
  doPasswordReset,
  doSignInWithFacebook,
} from "../firebase/auth";
import { useAuth } from "../contexts/authContext";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (userLoggedIn) {
      navigate("/", { replace: true });
    }
  }, [userLoggedIn, navigate]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        const result = await doSignInWithEmailAndPassword(email, password);
        console.log("User signed in:", result.user);
        navigate("/", { replace: true });
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onSubmitRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const result = await doCreateUserWithEmailAndPassword(email, password);
        console.log("User registered:", result.user);
        setSuccessMessage(
          "Te rugăm verifică adresa de email și accesează link-ul primit pentru a finaliza înregistrarea."
        );
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsRegistering(false);
      }
    }
  };

  const onGoogleSignIn = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithGoogle();
        navigate("/", { replace: true });
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onFacebookSignIn = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithFacebook();
        navigate("/", { replace: true });
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onPasswordReset = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    if (!email) {
      setErrorMessage("Te rog introduce email-ul pentru a putea continua.");
      return;
    }
    if (!isResettingPassword) {
      setIsResettingPassword(true);
      try {
        await doPasswordReset(email);
        setSuccessMessage(
          "Te rugăm verifică adresa de email și accesează link-ul primit pentru a finaliza resetarea parolei."
        );
      } catch (error: any) {
        setErrorMessage(error.message);
      } finally {
        setIsResettingPassword(false);
      }
    }
  };

  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpActive(true);
  };

  const handleSignInClick = () => {
    setIsSignUpActive(false);
    setShowErrorMessage(false);
  };

  return (
    <main className="bodyLogin" style={{ position: "relative", zIndex: "1" }}>
      <div
        className={`containerLg ${
          isSignUpActive ? "right-panel-activeLg" : ""
        }`}
      >
        <div className="form-containerLg sign-up-containerLg">
          <form action="#" className="lgForm" onSubmit={onSubmitRegister}>
            <h1 className="lgH1">Creează cont</h1>
            <div className="social-containerLg">
              <button className="socialLg" onClick={onGoogleSignIn}>
                <i className="fab fa-google-plus-g"></i>
              </button>
            </div>
            <span className="lgSpan">
              sau folosește-ți adresa de email pentru înregistrare
            </span>
            <input type="text" placeholder="Nume" className="lgInput" />
            <input
              type="email"
              placeholder="Email"
              className="lgInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Parolă"
              className="lgInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="lgButton">
              Înregistrare
            </button>
            {errorMessage && (
              <p
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {successMessage}
              </p>
            )}
          </form>
        </div>
        <div className="form-containerLg sign-in-containerLg">
          <form action="#" className="lgForm" onSubmit={onSubmit}>
            <h1 className="lgH1">Autentificare</h1>
            {showErrorMessage && (
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "10px",
                }}
              >
                Credențiale invalide! Vă rugăm reîncercați!
              </p>
            )}
            <div className="social-containerLg">
              <button className="socialLg" onClick={onGoogleSignIn}>
                <i className="fab fa-google-plus-g"></i>
              </button>
            </div>
            <span className="lgSpan">sau folosește-ți contul</span>
            <input
              type="email"
              placeholder="Email"
              className="lgInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Parolă"
              className="lgInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#" className="socialLg" onClick={onPasswordReset}>
              Ți-ai uitat parola?
            </a>
            <button
              type="submit"
              className="lgButton"
              onClick={() => setShowErrorMessage(true)}
            >
              Autentificare
            </button>
            {errorMessage && (
              <p
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p
                style={{
                  color: "green",
                  textAlign: "center",
                  marginTop: "10px",
                }}
              >
                {successMessage}
              </p>
            )}
          </form>
        </div>
        <div
          className="overlay-containerLg"
          style={{ position: "relative", zIndex: "1" }}
        >
          <div className="overlayLg">
            <div className="overlay-panelLg overlay-leftLg">
              <h1 className="lgH1">Bun venit înapoi!</h1>
              <p className="lgP">
                Pentru a rămâne conectat cu noi, te rugăm să te autentifici
                folosind informațiile tale personale.
              </p>
              <button className="ghost" onClick={handleSignInClick}>
                Autentificare
              </button>
            </div>
            <div className="overlay-panelLg overlay-rightLg">
              <h1 className="lgH1">Salut!</h1>
              <p className="lgP">
                Introdu câteva detalii și începe călătoria alături de noi.
              </p>
              <button className="ghost" onClick={handleSignUpClick}>
                Înregistrare
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
