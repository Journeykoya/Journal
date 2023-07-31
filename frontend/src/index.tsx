import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const client = new QueryClient();

root.render(
  <React.StrictMode>
      <QueryClientProvider client={client}>
      <BrowserRouter>
     <Routes>
       <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="home" element={<Home />} />
         <Route path="contact" element={<Contact />} />
         <Route path="*" element={<NotFound />} />
       </Route>
     </Routes>
   </BrowserRouter>
    </QueryClientProvider>
  
 </React.StrictMode>
);
