import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Postcard from "../components/cards/Postcard";
import { FaCheckCircle } from "react-icons/fa";
import cover from "../assets/images/cover.jpg";
import {
  getCommunityByName,
  joinCommunity,
  leaveCommunity,
  getJoinedCommunities,
  getAllFavorites,
  addToFavorites,
  deleteFavoriteById,
  votePost,
  getAllPosts,
} from "../api/api";
import { UserContext } from "../context/UserContext";
import Popup from "../components/cards/Popup";

export default function CommunityName() {
  const { communityName } = useParams();
  const [communityData, setCommunityData] = useState(null);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
    const [popup, setPopup] = useState(null);
  const navigate = useNavigate();

  // Get logged-in user from context
  const { currentUser } = useContext(UserContext);
  const userId = currentUser?.id || currentUser?.userId;

  // Fetch community info and check if user has joined
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get community by name
        const communityRes = await getCommunityByName(communityName);
        const community = communityRes.data;
        setCommunityData(community);

        // Fetch all posts and filter by community ID
        const postsRes = await getAllPosts();
        const filteredPosts = postsRes.data.filter(
          (post) => post.community?.id === community.communityId
        );
        setCommunityPosts(filteredPosts);

        // Check if user is in joined communities
        if (userId) {
          const joinedRes = await getJoinedCommunities(userId);
          const joinedCommunityIds = joinedRes.data.map(
            (uc) => uc.community.communityId
          );
          setJoined(joinedCommunityIds.includes(community.communityId));

          // Fetch user's favorites
          const favRes = await getAllFavorites();
          const userFavs = favRes.data
            .filter((f) => f.post && f.user?.id === userId)
            .map((f) => f.post.id);
          setFavoriteIds(userFavs);
        }
      } catch (err) {
        console.error("Error fetching community data:", err);
        setCommunityData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [communityName, userId]);

  const handleJoinToggle = async () => {
    if (!communityData || !userId) return;

    try {
      if (joined) {
        await leaveCommunity(userId, communityData.communityId);
        setJoined(false);
        setPopup({ message: "You left the community!", type: "success" });
      } else {
        await joinCommunity(userId, communityData.communityId);
        setJoined(true);
        setPopup({ message: "You joined the community!", type: "success" });
      }
    } catch (err) {
      console.error("Error joining/leaving community:", err);
    }
  };

  const handleThreeDots = (e, id) => {
    e.stopPropagation();
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  const handleAddToFavorites = async (postId) => {
    if (!userId) return;

    try {
      const isFav = favoriteIds.includes(postId);
      if (isFav) {
        const favRes = await getAllFavorites();
        const favItem = favRes.data.find(
          (f) => f.post?.id === postId && f.user?.id === userId
        );
        if (favItem) {
          await deleteFavoriteById(favItem.favoriteId);
          setFavoriteIds((prev) => prev.filter((id) => id !== postId));
        }
      } else {
        await addToFavorites(postId, userId);
        setFavoriteIds((prev) => [...prev, postId]);
        setPopup({ message: "Post added to favorites!", type: "success" });
      }
    } catch (err) {
      console.error("Error updating favorites:", err);
      setPopup({ message: "Failed to update favorites.", type: "error" });
    }
  };

  const handleVote = async (postId, type) => {
    if (!userId) {
      console.warn("No userId found");
      return;
    }

    // Instant UI update
    setCommunityPosts((prev) => {
      return prev.map((post) => {
        if (post.id === postId) {
          let newVotes = post.votes || 0;
          if (type === "up") {
            if (post.voteStatus === "up") {
              newVotes -= 1;
              return { ...post, votes: newVotes, voteStatus: null };
            }
            newVotes += post.voteStatus === "down" ? 2 : 1;
            return { ...post, votes: newVotes, voteStatus: "up" };
          } else if (type === "down") {
            if (post.voteStatus === "down") {
              newVotes += 1;
              return { ...post, votes: newVotes, voteStatus: null };
            }
            newVotes -= post.voteStatus === "up" ? 2 : 1;
            return { ...post, votes: newVotes, voteStatus: "down" };
          }
        }
        return post;
      });
    });

    // Sync with backend
    try {
      const response = await votePost(postId, type, userId);
      setCommunityPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, votes: response.data.votes } : post
        )
      );
    } catch (err) {
      console.error("Vote sync failed:", err);
    }
  };

  const CircleIcon = ({ bgColor, text }) => (
    <div className={`${bgColor} w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg`}>{text}</div>
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

          <div className="p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <CircleIcon
                bgColor="bg-[#820000]"
                text={communityData.name[0].toUpperCase()}
              />

              <div>
                <div className="flex items-center">
                  <h1 className="text-lg font-bold text-gray-900">
                    r/{communityData.name}
                  </h1>
                  {communityData.verified && (
                    <span className="text-green-600 text-xs ml-2">
                      <FaCheckCircle size={12} />
                    </span>
                  )}
                </div>

                <p className="text-gray-600 text-xs mt-1 line-clamp-1">
                  {communityData.description}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() =>
                  navigate("/app/create-post", {
                    state: {
                      communityId: communityData.communityId,
                      communityName: communityData.name,
                    },
                  })
                }
                className="bg-[#820000] text-white px-3 py-1.5 rounded text-xs font-semibold hover:shadow-md cursor-pointer"
              >
                Post
              </button>

              <button
                onClick={handleJoinToggle}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition-all ${
                  joined
                    ? "bg-gray-200 text-gray-700"
                    : "bg-[#820000] text-white"
                } `}
              >
                {joined ? "Joined" : "Join"}
              </button>
            </div>
          </div>
        </div>

        {/* Community Posts */}
        <div className="space-y-3">
          {communityPosts && communityPosts.length > 0 ? (
            communityPosts.map((post) => (
              <Postcard
                key={post.id}
                post={post}
                handleVote={handleVote}
                handleThreeDots={handleThreeDots}
                handleAddToFavorites={handleAddToFavorites}
                isFavorite={favoriteIds.includes(post.id)}
                openDropdown={openDropdown}
              />
            ))
          ) : (
            <p className="bg-white rounded-lg p-8 text-center text-gray-500 text-sm border border-gray-200">No posts yet.</p>
          )}
        </div>
      </div>
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  );
}
