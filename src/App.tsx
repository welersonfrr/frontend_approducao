import React from "react";
import "./App.css";
import SearchOp from "./pages/SearchOp";
import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import ProductionDetails from "./pages/ProductionDetails";

function App() {
  return (
    <AnimatePresence>
      <main className="w-screen h-auto flex flex-col">
        <Routes>
          <Route path="/*" element={<SearchOp />} />
          <Route path="/production" element={<ProductionDetails />} />
        </Routes>
      </main>
    </AnimatePresence>
  );
}

export default App;
