import React from "react";
import { Header } from "./Header";

interface PageProps {
  children: React.ReactNode;
}

export const Page: React.FC<PageProps> = ({ children }) => (
  <div className="min-h-screen bg-gray-50 text-gray-900">
    <Header />
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">{children}</div>
  </div>
);
