import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <React.StrictMode>
      <QueryClientProvider client={client}>
      <BrowserRouter>
      <App />
 
   </BrowserRouter>
    </QueryClientProvider>
  
 </React.StrictMode>
);
