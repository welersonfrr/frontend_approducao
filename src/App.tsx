import React from "react";
import "./App.css";
import SearchOp from "./pages/SearchOp";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import ProductionDetails from "./pages/ProductionDetails";
import Login from "./pages/Login";
import Print from "./pages/Print";

function App() {
  return (
    <AnimatePresence>
      <main className="w-screen h-auto flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<SearchOp />} />
          <Route path="/production" element={<ProductionDetails />} />
          <Route path="/print" element={<Print />} />
        </Routes>
      </main>
    </AnimatePresence>
  );
}

export default App;
