import React, { useState } from "react";

// Tech-Talk Dashboard
// Single-file React component styled with Tailwind CSS.
// Usage: Drop this file into a React app (Vite / CRA), ensure Tailwind is configured,
// then import and render <TechTalkDashboard /> in App.jsx.

export default function TechTalkDashboard() {
  const [posts, setPosts] = useState(samplePosts);
  const [query, setQuery] = useState("");
  const [composer, setComposer] = useState({ title: "", body: "", community: "r/technology" });

  function submitPost(e) {
    e.preventDefault();
    if (!composer.title.trim() && !composer.body.trim()) return;
    const newPost = {
      id: Date.now(),
      title: composer.title || "Untitled",
      body: composer.body,
      community: composer.community,
      author: "u/you",
      votes: 1,
      comments: 0,
      time: "just now",
    };
    setPosts([newPost, ...posts]);
    setComposer({ title: "", body: "", community: composer.community });
  }

  function upvote(id) {
    setPosts(posts.map(p => (p.id === id ? { ...p, votes: p.votes + 1 } : p)));
  }
  function downvote(id) {
    setPosts(posts.map(p => (p.id === id ? { ...p, votes: Math.max(0, p.votes - 1) } : p)));
  }

  const filtered = posts.filter(
    p =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.body.toLowerCase().includes(query.toLowerCase()) ||
      p.community.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Navbar query={query} setQuery={setQuery} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3">
          <Sidebar />
        </aside>

        <main className="col-span-12 lg:col-span-6">
          <Composer
            composer={composer}
            setComposer={setComposer}
            submitPost={submitPost}
          />

          <div className="mt-6 space-y-4">
            {filtered.length === 0 ? (
              <div className="p-6 bg-white rounded shadow text-center text-slate-500">
                No posts found.
              </div>
            ) : (
              filtered.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  upvote={() => upvote(post.id)}
                  downvote={() => downvote(post.id)}
                />
              ))
            )}
          </div>
        </main>

        <aside className="hidden lg:block lg:col-span-3">
          <RightSidebar />
        </aside>
      </div>
    </div>
  );
}

// ---------- Components ---------- //

function Navbar({ query, setQuery }) {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Brand />
            <nav className="hidden md:flex gap-2 text-sm text-slate-600">
              <a className="px-3 py-2 rounded hover:bg-slate-100">Home</a>
              <a className="px-3 py-2 rounded hover:bg-slate-100">Popular</a>
              <a className="px-3 py-2 rounded hover:bg-slate-100">Communities</a>
            </nav>
          </div>

          <div className="flex-1 mx-4">
            <div className="relative">
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search Tech-Talk"
                className="w-full rounded-lg border px-3 py-2 bg-slate-50 focus:outline-none"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">⌘K</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded bg-indigo-600 text-white text-sm">Create Post</button>
            <ProfileBadge />
          </div>
        </div>
      </div>
    </header>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-9 h-9 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">T</div>
      <div className="font-semibold">Tech-Talk</div>
    </div>
  );
}

function ProfileBadge() {
  return (
    <div className="flex items-center gap-2 border rounded px-2 py-1 text-sm">
      <div className="w-6 h-6 rounded-full bg-slate-300" />
      <div className="hidden sm:block">u/you</div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="sticky top-6 space-y-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold">Home</h3>
        <p className="text-sm text-slate-500 mt-1">Welcome to Tech-Talk — a tech community inspired by Reddit.</p>
        <div className="mt-3 flex gap-2">
          <button className="px-3 py-1 rounded border text-sm">For you</button>
          <button className="px-3 py-1 rounded border text-sm">Following</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-medium">Your Communities</h4>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li className="flex items-center justify-between">
            <span>r/technology</span>
            <span className="text-xs text-slate-400">12.3k</span>
          </li>
          <li className="flex items-center justify-between">
            <span>r/programming</span>
            <span className="text-xs text-slate-400">8.1k</span>
          </li>
          <li className="flex items-center justify-between">
            <span>r/webdev</span>
            <span className="text-xs text-slate-400">4.9k</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded shadow text-sm text-slate-600">
        <div className="font-medium mb-2">Create Community</div>
        <button className="w-full py-2 rounded bg-emerald-500 text-white text-sm">+ New</button>
      </div>
    </div>
  );
}

function Composer({ composer, setComposer, submitPost }) {
  return (
    <form onSubmit={submitPost} className="bg-white p-4 rounded shadow">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-slate-300" />
        <input
          className="flex-1 rounded border px-3 py-2"
          placeholder="Title"
          value={composer.title}
          onChange={e => setComposer({ ...composer, title: e.target.value })}
        />
        <select
          className="border rounded px-2 py-2 text-sm"
          value={composer.community}
          onChange={e => setComposer({ ...composer, community: e.target.value })}
        >
          <option>r/technology</option>
          <option>r/programming</option>
          <option>r/webdev</option>
        </select>
      </div>

      <textarea
        className="w-full mt-3 rounded border p-3 min-h-[80px]"
        placeholder="Share something to the community"
        value={composer.body}
        onChange={e => setComposer({ ...composer, body: e.target.value })}
      />

      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-slate-500">Markdown supported • 0/10k</div>
        <div className="flex gap-2">
          <button type="button" className="px-3 py-1 rounded border">Cancel</button>
          <button type="submit" className="px-4 py-1 rounded bg-indigo-600 text-white">Post</button>
        </div>
      </div>
    </form>
  );
}

function PostCard({ post, upvote, downvote }) {
  return (
    <article className="bg-white rounded shadow flex">
      <div className="flex flex-col items-center justify-start w-12 p-3 border-r">
        <button onClick={upvote} className="text-sm">▲</button>
        <div className="text-xs font-medium py-1">{post.votes}</div>
        <button onClick={downvote} className="text-sm">▼</button>
      </div>

      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="font-medium">{post.community}</span>
          <span>•</span>
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.time}</span>
        </div>

        <h3 className="mt-2 font-semibold text-slate-800">{post.title}</h3>
        {post.body && <p className="mt-2 text-sm text-slate-600">{post.body}</p>}

        <div className="mt-3 flex items-center gap-4 text-sm text-slate-500">
          <button className="flex items-center gap-2">💬 {post.comments} comments</button>
          <button className="flex items-center gap-2">🔗 Share</button>
        </div>
      </div>

      <div className="w-20 p-3 hidden md:block text-xs text-slate-500">
        {/* Placeholder for thumbnails, polls, or link previews */}
        <div className="bg-slate-100 rounded h-16 flex items-center justify-center">Preview</div>
      </div>
    </article>
  );
}

function RightSidebar() {
  return (
    <div className="space-y-6 sticky top-6">
      <div className="bg-white p-4 rounded shadow">
        <h4 className="font-medium">Trending</h4>
        <ol className="mt-3 text-sm text-slate-600 space-y-2">
          <li>AI advancements</li>
          <li>Web performance</li>
          <li>New JS frameworks</li>
        </ol>
      </div>

      <div className="bg-white p-4 rounded shadow text-sm">
        <div className="font-medium">How Tech-Talk works</div>
        <p className="mt-2 text-slate-500">Upvote, comment, and join communities to see more relevant content.</p>
      </div>

      <div className="bg-white p-4 rounded shadow text-sm">
        <div className="font-medium mb-2">Join a community</div>
        <button className="w-full py-2 rounded bg-indigo-600 text-white">Explore</button>
      </div>
    </div>
  );
}

// ---------- Sample data ---------- //

const samplePosts = [
  {
    id: 1,
    title: "Announcing my open-source CLI tool for deployments",
    body: "Built a tiny CLI to speed up my deployments — supports Node, Python, and Docker.",
    community: "r/technology",
    author: "u/alex99",
    votes: 124,
    comments: 24,
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "What's your favorite React pattern in 2025?",
    body: "I'm curious whether people still prefer hooks + context or are migrating to new state libraries.",
    community: "r/programming",
    author: "u/devgirl",
    votes: 86,
    comments: 41,
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "How I shaved 300ms off page load",
    body: "Small tips that helped me reduce the TTFB and improve Lighthouse scores.",
    community: "r/webdev",
    author: "u/frontender",
    votes: 52,
    comments: 10,
    time: "1 day ago",
  },
];
