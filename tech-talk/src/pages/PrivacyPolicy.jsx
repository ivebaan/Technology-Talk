import React from "react";
import PolicyPage from "./PolicyPage";

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
    Introduction: (
      <div className="space-y-4">
        <p>
          Technology-Talk is an online, course-based platform created for the
          CIT-U community. It enables students to collaborate, engage in
          academic discussions, and share knowledge in a safe and well-organized
          environment.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, and protect your
          information when using Tech-Talk.
        </p>
      </div>
    ),

    "Tech-talk Is a Public Platform": (
      <div className="space-y-4">
        <p>
          Tech-Talk functions as a public platform within CIT-U.
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>
            Posts, comments, and shared content may be visible to other students.
          </li>
          <li>
            Your private account details—such as email, student ID, and
            password—are never made public.
          </li>
          <li>
            Be mindful when posting personal or sensitive information.
          </li>
        </ul>

        <p>
          Anything you share inside a course community may be viewed by other
          members.
        </p>
      </div>
    ),

    "What Information We Collect": (
      <div className="space-y-4">
        <p>We may collect the following information when you use Tech-Talk:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Account information (display name, student email)</li>
          <li>Course or department affiliation</li>
          <li>Posts, comments, likes, and community interactions</li>
          <li>Login activity and device information</li>
        </ul>
      </div>
    ),

    "How We Use Your Information": (
      <div className="space-y-4">
        <p>Your information helps us:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Improve platform performance and user experience</li>
          <li>Support moderation and ensure community safety</li>
          <li>Identify and reward active contributors through gamification</li>
        </ul>
      </div>
    ),

    "How We Share Your Information": (
      <div className="space-y-4">
        <p>
          Tech-Talk does not sell your personal information. However, we may
          share necessary data with:
        </p>

        <ul className="list-disc ml-6 space-y-2">
          <li>CIT-U administrators for academic or disciplinary purposes</li>
          <li>Platform moderators for community safety</li>
          <li>Service providers supporting system operations</li>
        </ul>

        <p>We share only what is required and nothing more.</p>
      </div>
    ),

    "How We Protect Your Information": (
      <div className="space-y-4">
        <p>We implement several security measures, including:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Encrypted data storage</li>
          <li>Secure authentication and password protection</li>
          <li>Restricted access to sensitive student information</li>
          <li>Regular system monitoring for threats</li>
        </ul>
      </div>
    ),

    "Your Rights and Choices": (
      <div className="space-y-4">
        <p>As a Tech-Talk user, you have the right to:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li>Access and update your account information</li>
          <li>Request deletion of your data</li>
          <li>Control your notification settings</li>
          <li>Report misuse, harassment, or inappropriate content</li>
        </ul>
      </div>
    ),

    "Changes to This Policy": (
      <div className="space-y-4">
        <p>
          We may update this Privacy Policy to enhance transparency or reflect
          changes in university guidelines. Any updates will be posted on this
          page with a revised effective date.
        </p>
      </div>
    ),

    "Contact Us": (
      <div className="space-y-4">
        <p>For questions or concerns regarding privacy, contact us at:</p>

        <ul className="list-disc ml-6 space-y-2">
          <li>joshuaphilip.ang@gmail.com</li>
          <li>vankehrby.lubanga@gmail.com</li>
          <li>rodivan@gmail.com</li>
        </ul>
      </div>
    ),
  };

  const generateId = (title) =>
    title
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9\-]/g, "")
      .toLowerCase();

  return (
    <PolicyPage
      title="Privacy & Policy"
      sections={sectionsContent}
      sidebarItems={sidebarItems}
      lastRevised="December 10, 2025"
    />
  );
};

export default PrivacyPolicy;
