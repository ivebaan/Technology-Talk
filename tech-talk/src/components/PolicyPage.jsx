import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function PolicyPage({ title, sections, sidebarItems, lastRevised }) {
  const [activeSection, setActiveSection] = useState(sidebarItems?.[0] || "");
  const [showToTop, setShowToTop] = useState(false);
  const [mainScrollContainer, setMainScrollContainer] = useState(null);

  const generateId = (title) =>
    title
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "")
      .toLowerCase();

  useEffect(() => {
    const handleScroll = () => {
      if (mainScrollContainer) {
        setShowToTop(mainScrollContainer.scrollTop > 300);
      } else {
        setShowToTop(window.scrollY > 300);
      }
    };

    const scrollTarget = mainScrollContainer || window;
    if (mainScrollContainer) {
      mainScrollContainer.addEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (mainScrollContainer) {
        mainScrollContainer.removeEventListener("scroll", handleScroll);
      } else {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [mainScrollContainer]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    if (mainScrollContainer) {
      mainScrollContainer.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-red-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with maroon accent */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8 border-b-4 border-[#820000] overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#820000] to-[#a30000] opacity-5 rounded-full -mr-16 -mt-16"></div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#820000] mb-3 relative z-10">
            {title}
          </h1>
          <p className="text-gray-600 text-lg">
            <span className="inline-block bg-red-100 text-[#820000] px-4 py-1 rounded-full text-sm font-semibold">
              Last Updated: {lastRevised}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-xl p-6 sticky top-8 border-l-4 border-[#820000]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-[#820000] to-[#a30000] rounded-full"></div>
                <h3 className="font-bold text-xl text-[#820000] uppercase tracking-widest">
                  Contents
                </h3>
              </div>
              
              <nav className="space-y-3">
                {sidebarItems?.map((item) => {
                  const itemId = generateId(item);
                  const isActive = activeSection === itemId;
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(itemId)}
                      className={`w-full text-left px-5 py-3 rounded-lg transition-all duration-300 font-medium text-sm group relative overflow-hidden ${
                        isActive
                          ? "bg-gradient-to-r from-[#820000] to-[#a30000] text-white shadow-lg scale-105"
                          : "text-gray-700 hover:bg-red-50 hover:text-[#820000] hover:translate-x-1"
                      }`}
                    >
                      <div className="relative z-10 flex items-center gap-2">
                        <span className={`transition-all ${isActive ? "text-white" : "text-[#820000]"}`}>
                          ›
                        </span>
                        {item}
                      </div>
                      {!isActive && (
                        <div className="absolute inset-y-0 right-0 w-1 bg-[#820000] transform scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></div>
                      )}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t-2 border-red-200 bg-gradient-to-br from-red-50 to-transparent p-4 rounded-lg">
                <h4 className="font-bold text-[#820000] mb-2 text-sm uppercase tracking-wider">
                  📋 Document Info
                </h4>
                <p className="text-xs text-gray-600">
                  Version {lastRevised}
                </p>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:flex-1">
            <div className="space-y-6">
              {sidebarItems?.map((title) => {
                const sectionId = generateId(title);
                const content = sections[title];
                return (
                  <article
                    key={title}
                    id={sectionId}
                    className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-[#820000] hover:shadow-xl transition-all duration-300 hover:translate-y-1 group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-1.5 h-12 bg-gradient-to-b from-[#820000] to-[#a30000] rounded-full flex-shrink-0 group-hover:h-16 transition-all"></div>
                      <div className="flex-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#820000] mb-4">
                          {title}
                        </h2>
                        <div className="prose prose-sm max-w-none text-gray-700 space-y-4 leading-relaxed">
                          {content}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Footer spacer */}
            <div className="mt-12 pt-8 border-t-2 border-red-200 text-center">
              <p className="text-gray-500 text-sm">
                End of {title}
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-br from-[#820000] to-[#a30000] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all duration-200 animate-bounce z-40 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
