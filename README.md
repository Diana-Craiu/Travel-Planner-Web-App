# Travel Planning Web Application

This project is a web application that generates personalized travel itineraries based on user preferences.

The application collects travel data using web scraping, processes it using regex and NLP techniques, and generates recommendations using pre-trained transformer models.

It includes a Flask backend, a React + TypeScript frontend, and integrates Firebase for authentication and data storage. Mapbox and Google Maps APIs are used for location visualization and geocoding.

## Features
- Personalized travel itinerary generation
- Web scraping and data processing
- Natural language processing using transformer models
- Interactive map visualization (Mapbox, Google Maps)
- User authentication (Firebase)
- Responsive frontend (React + TypeScript)

## Technologies
- Flask (backend)
- React + TypeScript (frontend)
- Firebase Firestore & Authentication
- Mapbox API & Google Maps API
- Transformers (NLP)

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
