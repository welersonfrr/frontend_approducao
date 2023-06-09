import React from "react";
import "./App.css";
import SearchOp from "./pages/SearchOp";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import ProductionDetails from "./pages/ProductionDetails";
import Login from "./pages/Login";
import Print from "./pages/Print";
import TotalProduction from "./pages/TotalProduction";
import Confirmation from "./pages/Confirmation";
import Productions from "./pages/Productions";

function App() {
  return (
    <AnimatePresence>
      <main className="w-screen h-auto flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<SearchOp />} />
          <Route path="/production" element={<ProductionDetails />} />
          <Route path="/print" element={<Print />} />
          <Route path="/data" element={<Productions />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </main>
    </AnimatePresence>
  );
}

export default App;
