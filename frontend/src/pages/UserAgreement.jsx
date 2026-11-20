import React from "react";
import PolicyPage from "./PolicyPage";

function UserAgreement() {
  const sidebarItems = [
    "Welcome",
    "Acceptance of Terms",
    "Use of the Platform",
    "Intellectual Property",
    "User Conduct",
    "Account Responsibilities",
    "Termination",
    "Limitation of Liability",
    "Changes to the Agreement",
  ];

  const sectionsContent = {
    Welcome: (
      <div className="space-y-4">
        <p>
          Welcome to Tech-Talk, an online, course-based platform created for the CIT-U community. 
          By accessing or using our platform, you agree to comply with the following terms and conditions. 
          Please read them carefully.
        </p>
      </div>
    ),

    "Acceptance of Terms": (
      <div className="space-y-4">
        <p>
          By using our services, you agree to be bound by this User Agreement, our Privacy Policy, 
          and any applicable laws and regulations. If you do not agree to these terms, please do not 
          use our platform.
        </p>
      </div>
    ),

    "Use of the Platform": (
      <div className="space-y-4">
        <p>
          You agree to use the platform responsibly and not engage in any activities that may harm 
          the platform or other users. The platform is intended for educational and professional collaboration.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Do not spam or flood with repetitive messages</li>
          <li>Do not harass, bully, or discriminate against other users</li>
          <li>Do not upload malicious, illegal, or offensive content</li>
          <li>Do not attempt to hack or gain unauthorized access</li>
          <li>Respect intellectual property and academic integrity</li>
        </ul>
      </div>
    ),

    "Intellectual Property": (
      <div className="space-y-4">
        <p>
          All content on this platform, including text, images, code, and designs, is the property 
          of the platform, its contributors, or respective licensors.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>You may not reproduce, distribute, or use any content without authorization</li>
          <li>Your contributions remain your intellectual property</li>
          <li>By posting content, you grant the platform a license to display and share it</li>
          <li>Respect the original authors and creators</li>
        </ul>
      </div>
    ),

    "User Conduct": (
      <div className="space-y-4">
        <p>
          Users are expected to maintain respectful and professional behavior at all times.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Treat other users with respect and courtesy</li>
          <li>Avoid hate speech, offensive language, or discriminatory content</li>
          <li>Report inappropriate behavior to moderators</li>
          <li>Follow the community guidelines and standards</li>
          <li>Engage in constructive and meaningful discussions</li>
        </ul>
      </div>
    ),

    "Account Responsibilities": (
      <div className="space-y-4">
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and 
          for all activities that occur under your account.
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Keep your password secure and do not share it</li>
          <li>Notify us immediately of any unauthorized access</li>
          <li>You are liable for all activities conducted through your account</li>
          <li>Provide accurate and up-to-date information</li>
        </ul>
      </div>
    ),

    "Termination": (
      <div className="space-y-4">
        <p>
          We reserve the right to suspend or terminate your access to the platform at any time for:
        </p>
        <ul className="list-disc ml-6 space-y-2">
          <li>Violations of this User Agreement</li>
          <li>Breaches of community guidelines</li>
          <li>Illegal or harmful activities</li>
          <li>Repeated violations despite warnings</li>
          <li>At the discretion of platform administrators</li>
        </ul>
      </div>
    ),

    "Limitation of Liability": (
      <div className="space-y-4">
        <p>
          Tech-Talk is provided on an "as-is" basis. We do not guarantee uninterrupted service or 
          the accuracy of all content. To the fullest extent permitted by law, we are not liable for 
          any damages arising from your use of the platform.
        </p>
      </div>
    ),

    "Changes to the Agreement": (
      <div className="space-y-4">
        <p>
          We may update this User Agreement from time to time to reflect changes in our policies, 
          legal requirements, or platform features. Your continued use of the platform after changes 
          indicates your acceptance of the updated terms.
        </p>
        <p className="text-sm text-gray-500">
          Last updated: December 10,2025
        </p>
      </div>
    ),
  };

  return (
    <PolicyPage
      title="User Agreement"
      sections={sectionsContent}
      sidebarItems={sidebarItems}
      lastRevised="December 10, 2025"
    />
  );
}



export default UserAgreement;
