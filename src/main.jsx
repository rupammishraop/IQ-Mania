import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import './index.css';
import App from './App.jsx';  // App is the main component
import RegistrationForm from './components/RegistrationForm.jsx';
import QuizComponent from './components/QuizComponent.jsx';
import { FormDataProvider } from './components/FormDataContext.jsx';  // Correct import

// Define the routes for the app
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}> {/* Main component */}
      <Route path="" element={<RegistrationForm />} />
      <Route path="quiz" element={<QuizComponent />} />
    </Route>
  )
);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormDataProvider> {/* Wrap the router with the provider */}
      <RouterProvider router={router} />
    </FormDataProvider>
  </StrictMode>
);
