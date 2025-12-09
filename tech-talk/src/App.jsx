import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Communities from "./pages/Communities";
import Landing from "./components/layout/Landing";
import Settings from "./pages/Settings";
import CreatePost from "./pages/CreatePost";
import CreateCommunities from "./pages/CreateCommunities";
import { UserProvider } from "./context/UserContext";
import Profile from "./pages/Profile";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Notifications from "./pages/Notifications";
import CommunityName from "./pages/CommunityName";
import Trend from "./pages/Trend";
import Favorites from "./pages/Favorites";
import UserAgreement from "./pages/UserAgreement";
import PostPage from "./pages/PostPage";
import PostEdit from "./pages/PostEdit";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/technology" element={<Landing />} />

          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="communities" element={<Communities />} />
            <Route path="settings" element={<Settings />} />
            <Route path="create-post" element={<CreatePost />} />
            <Route path="create-community" element={<CreateCommunities />} />
            <Route path="profile" element={<Profile />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            {/* <Route path="notifications" element={<Notifications />} /> */}

            <Route path="r/:communityName" element={<CommunityName />} />

            <Route path="trending" element={<Trend />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="user-agreement" element={<UserAgreement />} />
            <Route path="post/:postId" element={<PostPage />} />
            <Route path="post/:postId/edit" element={<PostEdit />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
