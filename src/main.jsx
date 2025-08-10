import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Toaster } from 'react-hot-toast';
import "./index.css";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#f8f9ff',
            color: '#333',
            fontFamily: '"M PLUS Rounded 1c", sans-serif',
            borderRadius: '10px',
            border: '2px solid #646ff0',
          },
          success: {
            iconTheme: {
              primary: '#646ff0',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#d33',
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  </StrictMode>
);