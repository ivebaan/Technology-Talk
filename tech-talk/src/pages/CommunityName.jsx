import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Postcard from "../components/cards/Postcard";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import cover from "../assets/images/cover.jpg";
import { getCommunityByName } from "../api/api";

export default function CommunityName() {
  const { communityName } = useParams(); // URL param: /r/something
  const [communityData, setCommunityData] = useState(null);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      getCommunityByName(communityName)
      .then((res) => {
        setCommunityData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setCommunityData(null);
        setLoading(false);
      });
  }, [communityName]);

  const CircleIcon = ({ bgColor, text }) => (
    <div className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`}>
      {text}
    </div>
  );

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-xl font-semibold">Loading…</h1>
      </div>
    );
  }

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
          <div
            className="w-full h-32 bg-cover bg-center"
            style={{ backgroundImage: `url(${cover})` }}
          ></div>

          <div className="p-5 flex justify-between items-center">
            <div className="flex items-center gap-4">
              {/* Replace with backend-provided icon if available */}
              <CircleIcon bgColor="bg-black" text={communityData.name[0].toUpperCase()} />

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

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/app/create-post")}
                className="bg-[#820000] text-white px-4 py-2 rounded-full hover:bg-[#a30000] cursor-pointer"
              >
                Create Post
              </button>

              <button
                onClick={() => setJoined(!joined)}
                className={`px-4 py-2 rounded-full border cursor-pointer ${
                  joined
                    ? "bg-gray-200 border-gray-400 text-gray-700"
                    : "bg-[#820000] text-white border-[#820000]"
                } hover:opacity-90`}
              >
                {joined ? "Joined" : "Join"}
              </button>
            </div>
          </div>
        </div>

        {/* Community Posts */}
        <div className="space-y-4">
          {communityData.posts && communityData.posts.length > 0 ? (
            communityData.posts.map((post) => (
              <Postcard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No posts yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
