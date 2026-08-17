import React, { useState } from "react";
import { GlobalFilters, SentimentLabel } from "./types";
import { Sidebar, NavPage } from "./components/Sidebar";
import { Header } from "./components/Header";
import { GlobalFiltersBar } from "./components/GlobalFiltersBar";
import { ActiveFilterChips } from "./components/ActiveFilterChips";
import { AboutPrototypeModal } from "./components/AboutPrototypeModal";
import { getFilteredReviews } from "./data/dynamicAnalyticsEngine";

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

const INITIAL_FILTERS: GlobalFilters = {
  period: "Últimos 90 días",
  brand: null,
  province: null,
  city: null,
  branch: null,
  flavor: null,
  topic: null,
  sentiment: null,
  source: null,
  searchQuery: "",
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>("home");
  const [filters, setFilters] = useState<GlobalFilters>(INITIAL_FILTERS);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleSelectPage = (page: NavPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveFilter = (key: keyof GlobalFilters) => {
    setFilters((prev) => {
      const updated = { ...prev, [key]: key === "searchQuery" ? "" : null };
      // Cascade clear downstream dependencies if parent dimension is removed
      if (key === "brand") {
        updated.province = null;
        updated.city = null;
        updated.branch = null;
      } else if (key === "province") {
        updated.city = null;
        updated.branch = null;
      } else if (key === "city") {
        updated.branch = null;
      }
      return updated;
    });
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  // Drill-down callbacks
  const handleDrillDownSentiment = (sentiment: SentimentLabel) => {
    setFilters((prev) => ({ ...prev, sentiment }));
    handleSelectPage("reviews-explorer");
  };

  const handleDrillDownTopic = (topic: string) => {
    setFilters((prev) => ({ ...prev, topic }));
    handleSelectPage("reviews-explorer");
  };

  const handleDrillDownCell = (topic: string, sentiment: SentimentLabel) => {
    setFilters((prev) => ({
      ...prev,
      topic: topic === "Todos" ? null : topic,
      sentiment: sentiment,
    }));
    handleSelectPage("reviews-explorer");
  };

  const handleSelectFlavor = (flavor: string) => {
    setFilters((prev) => ({ ...prev, flavor }));
  };

  const handleDrillDownReviewFlavor = (flavor: string, topic?: string) => {
    setFilters((prev) => ({
      ...prev,
      flavor,
      topic: topic || prev.topic,
    }));
    handleSelectPage("reviews-explorer");
  };

  const handleSelectBranch = (branchId: string) => {
    setFilters((prev) => ({ ...prev, branch: branchId }));
  };

  const handleSelectProvince = (province: string) => {
    setFilters((prev) => ({
      ...prev,
      province,
      city: null,
      branch: null,
    }));
  };

  const handleSelectBrand = (brand: string) => {
    setFilters((prev) => ({
      ...prev,
      brand,
      province: null,
      city: null,
      branch: null,
    }));
  };

  // Compute number of matching reviews
  const filteredReviewsCount = getFilteredReviews(filters).length;

  const isAnalyticalPage =
    currentPage !== "home" &&
    currentPage !== "academic-report" &&
    currentPage !== "ai-methodology";

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 flex antialiased font-['Plus_Jakarta_Sans']">
      {/* Sidebar Navigation */}
      <Sidebar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onOpenAboutModal={() => setIsAboutModalOpen(true)}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <Header
          currentPage={currentPage}
          onSelectPage={handleSelectPage}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenAboutModal={() => setIsAboutModalOpen(true)}
          searchQuery={filters.searchQuery || ""}
          onSearchChange={(q) => setFilters((prev) => ({ ...prev, searchQuery: q }))}
        />

        {/* Global Filter Bar (shown on all analytical pages) */}
        {isAnalyticalPage && (
          <>
            <GlobalFiltersBar filters={filters} onFilterChange={setFilters} />
            <ActiveFilterChips
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onResetFilters={handleResetFilters}
              filteredCount={filteredReviewsCount}
            />
          </>
        )}

        {/* Page Views */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentPage === "home" && <HomePage onSelectPage={handleSelectPage} />}

          {currentPage === "overview" && (
            <OverviewPage
              filters={filters}
              onSelectPage={handleSelectPage}
              onDrillDownSentiment={handleDrillDownSentiment}
              onDrillDownTopic={handleDrillDownTopic}
            />
          )}

          {currentPage === "voice-of-customer" && (
            <VoiceOfCustomerPage
              filters={filters}
              onSelectPage={handleSelectPage}
              onDrillDownCell={handleDrillDownCell}
            />
          )}

          {currentPage === "topics" && (
            <TopicsPage
              filters={filters}
              onSelectPage={handleSelectPage}
              onDrillDownTopic={handleDrillDownTopic}
            />
          )}

          {currentPage === "products" && (
            <ProductsPage
              filters={filters}
              onSelectPage={handleSelectPage}
              onSelectFlavor={handleSelectFlavor}
              onDrillDownReview={handleDrillDownReviewFlavor}
            />
          )}

          {currentPage === "geography" && (
            <GeographyPage
              filters={filters}
              onSelectPage={handleSelectPage}
              onSelectBranch={handleSelectBranch}
              onSelectProvince={handleSelectProvince}
            />
          )}

          {currentPage === "competition" && (
            <CompetitionPage
              filters={filters}
              onSelectPage={handleSelectPage}
              onSelectBrand={handleSelectBrand}
            />
          )}

          {currentPage === "promotions" && <PromotionsPage filters={filters as any} />}

          {currentPage === "decision-lab" && <DecisionLabPage filters={filters as any} />}

          {currentPage === "reviews-explorer" && (
            <ReviewsExplorerPage
              filters={filters}
              onFilterChange={setFilters}
            />
          )}

          {currentPage === "ai-methodology" && <AiMethodologyPage />}

          {currentPage === "academic-report" && <AcademicReportPage />}
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
