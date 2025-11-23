import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Postcard from "../components/cards/Postcard";
import { FaCheckCircle } from "react-icons/fa";
import cover from "../assets/images/cover.jpg";

const mockCommunities = {
  citacad: {
    name: "CITAcademics",
    description: "Academic discussions and updates for CIT students.",
    icon: { bgColor: "bg-yellow-400", text: "☀" },
    posts: [
      {
        id: 1,
        title: "Midterm schedule released!",
        content: "Check the syllabus section for details.",
        author: "Admin",
        verified: true,
        community: "CITAcademics",
        votes: 12,
        voteStatus: null,
        comments: 5,
      },
      {
        id: 2,
        title: "Tips for passing CSIT228",
        content: "Here are some study tips…",
        author: "Student123",
        verified: false,
        community: "CITAcademics",
        votes: 8,
        voteStatus: null,
        comments: 2,
      },
    ],
  },
  citech: {
    name: "BSIT",
    description: "Technology and coding discussions.",
    icon: { bgColor: "bg-gray-400", text: "🖥️" },
    posts: [
      {
        id: 1,
        title: "React 18 new features",
        content: "React 18 introduces concurrent mode and other updates.",
        author: "TechGuru",
        verified: true,
        community: "BSIT",
        votes: 15,
        voteStatus: null,
        comments: 6,
      },
      {
        id: 2,
        title: "Best VS Code extensions",
        content: "Use Prettier, ESLint, and GitLens for productivity.",
        author: "DevStudent",
        verified: false,
        community: "BSIT",
        votes: 9,
        voteStatus: null,
        comments: 3,
      },
    ],
  },
  citlove: {
    name: "CITHeartzz",
    description: "Community for friendship, love, and support.",
    icon: { bgColor: "bg-red-800", text: "❤︎" },
    posts: [
      {
        id: 1,
        title: "Looking for study buddy",
        content: "Anyone studying CIT this semester? Let's form a group!",
        author: "LoverBoy",
        verified: false,
        community: "CITHeartzz",
        votes: 20,
        voteStatus: null,
        comments: 7,
      },
      {
        id: 2,
        title: "Valentine's Day event",
        content: "Planning something fun for Valentine’s! Join us!",
        author: "HeartQueen",
        verified: false,
        community: "CITHeartzz",
        votes: 18,
        voteStatus: null,
        comments: 5,
      },
    ],
  },
  citmentalhealth: {
    name: "CITMentalHealth",
    description: "Support and resources for mental health.",
    icon: { bgColor: "bg-green-800", text: "💭" },
    posts: [
      {
        id: 1,
        title: "Stress management tips",
        content: "Try deep breathing, walking, meditation, and journaling.",
        author: "MindHelper",
        verified: true,
        community: "CITMentalHealth",
        votes: 22,
        voteStatus: null,
        comments: 8,
      },
      {
        id: 2,
        title: "Meditation session tomorrow",
        content: "Join us on Zoom at 5 PM for a guided meditation session.",
        author: "CalmAdmin",
        verified: false,
        community: "CITMentalHealth",
        votes: 14,
        voteStatus: null,
        comments: 4,
      },
    ],
  },
};

export default function CommunityName() {
  const { communityName } = useParams();
  const [communityData, setCommunityData] = useState(null);
  const [joined, setJoined] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const data = mockCommunities[communityName];
    setCommunityData(data || null);
  }, [communityName]);

  const CircleIcon = ({ bgColor, text }) => (
    <div
      className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`}
    >
      {text}
    </div>
  );

  if (!communityData) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Community not found</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 max-w-4xl mx-auto p-6 space-y-6">
        {/* Community Header */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          {/* Cover Banner */}
          <div
            className="w-full h-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${cover})` }}
          ></div>

          {/* Content Under Banner */}
          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <CircleIcon {...communityData.icon} />

              <div>
                <div className="flex items-center">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    r/{communityData.name}
                  </h1>
                  <span className="flex items-center text-green-600 text-xs px-2 mt-1">
                    <FaCheckCircle size={14} />
                  </span>
                </div>

                <p className="text-gray-700 text-sm mt-1">
                  {communityData.description}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/app/create-post")}
                className="bg-[#820000] text-white px-4 py-2 rounded-full hover:bg-[#a30000] transition cursor-pointer"
              >
                Create Post
              </button>

              <button
                onClick={() => setJoined(!joined)}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  joined
                    ? "bg-gray-200 border-gray-400 text-gray-700"
                    : "bg-[#820000] text-white border-[#820000]"
                } hover:opacity-90 transition`}
              >
                {joined ? "Joined" : "Join"}
              </button>
            </div>
          </div>
        </div>

        {/* Post Feed */}
        <div className="space-y-4">
          {communityData.posts.map((post) => (
            <Postcard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
