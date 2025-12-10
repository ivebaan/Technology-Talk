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
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with maroon accent */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8 border-b-4 border-[#820000]">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {title}
          </h1>
          <p className="text-gray-600 text-base">
            <span className="inline-block bg-red-50 text-[#820000] px-4 py-1 rounded-full text-sm font-semibold">
              Last Updated: {lastRevised}
            </span>
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-8 border-l-4 border-[#820000]">
              <h3 className="font-bold text-lg text-gray-900 mb-6 uppercase tracking-wide">
                Contents
              </h3>
              
              <nav className="space-y-2">
                {sidebarItems?.map((item) => {
                  const itemId = generateId(item);
                  const isActive = activeSection === itemId;
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(itemId)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all font-medium text-sm ${
                        isActive
                          ? "bg-[#820000] text-white"
                          : "text-gray-700 hover:bg-gray-100 hover:text-[#820000]"
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-8 pt-6 border-t border-gray-200 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2 text-sm">Document Info</h4>
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
                    className="bg-white rounded-xl shadow-md p-8 border-l-4 border-[#820000] hover:shadow-lg transition-all"
                  >
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                      {title}
                    </h2>
                    <div className="prose prose-sm max-w-none text-gray-700 space-y-4 leading-relaxed">
                      {content}
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Footer spacer */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
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
          className="fixed bottom-8 right-8 bg-[#820000] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}
