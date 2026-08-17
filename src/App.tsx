import React, { useState } from "react";
import { FilterState } from "./types";
import { Sidebar, NavPage } from "./components/Sidebar";
import { Header } from "./components/Header";
import { GlobalFiltersBar } from "./components/GlobalFiltersBar";
import { AboutPrototypeModal } from "./components/AboutPrototypeModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { OverviewPage } from "./pages/OverviewPage";
import { VoiceOfCustomerPage } from "./pages/VoiceOfCustomerPage";
import { TopicsPage } from "./pages/TopicsPage";
import { ProductsPage } from "./pages/ProductsPage";
import { GeographyPage } from "./pages/GeographyPage";
import { CompetitionPage } from "./pages/CompetitionPage";
import { PromotionsPage } from "./pages/PromotionsPage";
import { DecisionLabPage } from "./pages/DecisionLabPage";
import { ReviewsExplorerPage } from "./pages/ReviewsExplorerPage";
import { AiMethodologyPage } from "./pages/AiMethodologyPage";
import { AcademicReportPage } from "./pages/AcademicReportPage";

const INITIAL_FILTERS: FilterState = {
  period: "Últimos 90 días",
  brand: "Todas",
  province: "Todas",
  branch: "Todas las sucursales",
  source: "Todas las fuentes",
  sentiment: "Todos",
  topic: "Todos los tópicos",
  searchQuery: "",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSelectPage = (page: NavPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex flex-col md:flex-row antialiased font-['Plus_Jakarta_Sans']">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentPage={currentPage}
          onSelectPage={handleSelectPage}
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
        />

        {/* Global Filter Bar (shown on analytical pages) */}
        {currentPage !== "home" && currentPage !== "academic" && currentPage !== "methodology" && (
          <GlobalFiltersBar filters={filters} onFilterChange={setFilters} />
        )}

        {/* Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === "home" && <HomePage onSelectPage={handleSelectPage} />}
          {currentPage === "overview" && <OverviewPage filters={filters} onSelectPage={handleSelectPage} />}
          {currentPage === "voc" && <VoiceOfCustomerPage filters={filters} />}
          {currentPage === "topics" && <TopicsPage filters={filters} />}
          {currentPage === "products" && <ProductsPage filters={filters} onSelectPage={handleSelectPage} />}
          {currentPage === "geography" && <GeographyPage filters={filters} />}
          {currentPage === "competition" && <CompetitionPage filters={filters} />}
          {currentPage === "promotions" && <PromotionsPage filters={filters} />}
          {currentPage === "decision-lab" && <DecisionLabPage filters={filters} />}
          {currentPage === "reviews" && <ReviewsExplorerPage filters={filters} />}
          {currentPage === "methodology" && <AiMethodologyPage />}
          {currentPage === "academic" && <AcademicReportPage />}
        </main>
      </div>

      {/* Transparency / Methodology Modal */}
      <AboutPrototypeModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
      />
    </div>
  );
}
