import React from "react";

const PrivacyPolicy = () => {
  const sidebarItems = [
    "Introduction",
    "Tech-talk Is a Public Platform",
    "What Information We Collect",
    "How We Use Your Information",
    "How We Share Your Information",
    "How We Protect Your Information",
    "Your Rights and Choices",
    "Changes to This Policy",
    "Contact Us",
  ];

  const sectionsContent = {
    Introduction: "At Reddit, we believe privacy is a right...",
    "Reddit Is a Public Platform": "Reddit content is public by default...",
    "What Information We Collect": "We collect minimal information such as...",
    "How We Use Your Information": "We use data to improve services and...",
    "How We Share Your Information": "We do not sell your data, but may share with...",
    "How We Protect Your Information": "We use encryption and other measures to...",
    "Your Rights and Choices": "You can access, correct, or delete your info...",
    "Changes to This Policy": "We may update this policy from time to time...",
    "Contact Us": "Reach out to privacy@reddit.com for questions...",
  };

  const generateId = (title) =>
    title
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "")
      .toLowerCase();

  return (
    <div className="bg-white min-h-screen text-maroon-900 p-8 mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-maroon-800">
        Privacy & Policy
      </h1>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-1/4 mr-8">
          <nav>
            <h3 className="font-semibold mb-2">Jump to</h3>
            <ul>
              {sidebarItems.map((item) => (
                <li key={item} className="mb-1">
                  <a href={`#${generateId(item)}`} className="hover:underline">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <h4 className="mt-6 font-semibold">Revisions</h4>
          <ul>
            <li>May 29, 2025</li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="w-3/4">
          <p className="mb-6">
            <strong>Effective:</strong> June 28, 2025.{" "}
            <strong>Last Revised:</strong> May 29, 2025.
          </p>

          {sidebarItems.map((title) => (
            <section key={title} id={generateId(title)} className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">{title}</h2>
              <p>{sectionsContent[title]}</p>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
