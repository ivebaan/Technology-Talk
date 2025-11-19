 const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left transform transition hover:scale-105 hover:shadow-md">
    <div className="flex items-center mb-3 space-x-3">
      <div className="p-2 bg-rose-50 rounded-full">{icon}</div>
      <h3 className="text-lg font-semibold text-rose-800">{title}</h3>
    </div>
    <p className="text-gray-600 text-sm">{desc}</p>
  </div>
);
export default FeatureCard;