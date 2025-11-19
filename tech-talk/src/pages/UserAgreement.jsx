import React from "react";

function UserAgreement() {
  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl font-bold mb-5">User Agreement</h1>

      <div className="bg-white border border-gray-200 rounded-lg shadow p-6 max-h-[100vh] overflow-y-auto space-y-4">
        <p>
          Welcome to our platform. By accessing or using our website, you agree
          to comply with the following terms and conditions. Please read them
          carefully.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Acceptance of Terms</h2>
        <p>
          By using our services, you agree to be bound by this User Agreement,
          our Privacy Policy, and any applicable laws and regulations.
        </p>

        <h2 className="text-xl font-semibold mt-4">2. Use of the Platform</h2>
        <p>
          You agree to use the platform responsibly and not engage in any
          activities that may harm the platform or other users. Prohibited
          behaviors include, but are not limited to, spamming, harassment, or
          uploading malicious content.
        </p>

        <h2 className="text-xl font-semibold mt-4">3. Intellectual Property</h2>
        <p>
          All content on this platform, including text, images, and code, is
          the property of the platform or its licensors. You may not use,
          reproduce, or distribute any content without proper authorization.
        </p>

        <h2 className="text-xl font-semibold mt-4">4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your access to the
          platform at any time for violations of this agreement or applicable
          laws.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Changes to the Agreement</h2>
        <p>
          We may update this User Agreement from time to time. Your continued
          use of the platform after changes indicates your acceptance of the
          updated terms.
        </p>

        <p className="text-gray-500 mt-5 text-sm">
          Last updated: November 20, 2025
        </p>
      </div>
    </div>
  );
}

export default UserAgreement;
