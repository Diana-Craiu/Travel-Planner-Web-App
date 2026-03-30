import { 
    GoogleAuthProvider,
    FacebookAuthProvider,  
    createUserWithEmailAndPassword, 
    sendEmailVerification, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    sendPasswordResetEmail
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  // creare utilizator cu email si parola + validare email utilizator
  export const doCreateUserWithEmailAndPassword = async (email: string, password: string): Promise<any> => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created:', userCredential.user);
      await sendEmailVerification(userCredential.user);
      console.log('Email verification sent');
      return userCredential;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };
  
  // autentificare dupa email si parola
  export const doSignInWithEmailAndPassword = async (email: string, password: string): Promise<any> => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (!userCredential.user.emailVerified) {
        throw new Error("Te rugăm verifică adresa de email și accesează link-ul primit pentru a finaliza înregistrarea.");
      }
      console.log('User signed in:', userCredential.user);
      return userCredential;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };
  
  // autentificare cu contul de google
  export const doSignInWithGoogle = async (): Promise<any> => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Google:', result.user);
      return result;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

   // autentificare cu contul de facebook
  export const doSignInWithFacebook = async (): Promise<any> => {
    try {
      const provider = new FacebookAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('User signed in with Facebook:', result.user);
      return result;
    } catch (error) {
      console.error('Error signing in with Facebook:', error);
      throw error;
    }
  };
  
  // logout
  export const doSignOut = async (): Promise<void> => {
    try {
      await signOut(auth);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };
  
  // resetarea parolei
  export const doPasswordReset = async (email: string): Promise<void> => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Password reset email sent');
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };