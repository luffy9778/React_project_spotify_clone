import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DataProvider } from "./context/DataContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { SearchProvider } from "./context/SearchContext";
import { AudioProvider } from "./context/SongContext";
import {disableReactDevTools} from "@fvilers/disable-react-devtools"

if(process.env.NODE_ENV==="production")disableReactDevTools()
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DataProvider>
          <UserProvider>
            <AudioProvider>
              <SearchProvider>
                <App />
              </SearchProvider>
            </AudioProvider>
          </UserProvider>
        </DataProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
