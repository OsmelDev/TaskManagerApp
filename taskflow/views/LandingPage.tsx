"use client";
import { useActions } from "@/app/user_home/hooks/useActions";
import Header from "@/components/Header";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Loading from "@/components/Loading";
import React, { useEffect } from "react";

const LandingPage = () => {
  const { checkUser, reloadTasks, isLoading } = useActions();

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen  bg-black from-blue-50 via-white to-purple-50">
      <Header />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
