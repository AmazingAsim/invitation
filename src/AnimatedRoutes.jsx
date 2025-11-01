// src/AnimatedRoutes.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import App from "./App";
import Venue from "./slides/Venue";
import Card from "./slides/Card";
import PageWrapper from "./PageWrapper";
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageWrapper key="home">
            <App />
          </PageWrapper>
        } />
        <Route path="/venue" element={
          <PageWrapper key="venue">
            <Venue />
          </PageWrapper>
        } />
        <Route path="/card" element={
          <PageWrapper key="card">
            <Card />
          </PageWrapper>
        } />
        <Route path="/:guest" element={
          <PageWrapper key="guest">
            <App />
          </PageWrapper>
        } />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;