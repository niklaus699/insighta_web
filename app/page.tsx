export default function LandingPage() {
  // Use the environment variable with a fallback for local dev
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
  const GITHUB_AUTH_URL = `${API_BASE_URL}/auth/github`;

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-4xl font-black">Insighta Labs+</h1>
      <p className="text-gray-500">Enterprise vulnerability management simplified.</p>
      <a 
        href={GITHUB_AUTH_URL}
        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition"
      >
        Continue with GitHub
      </a>
    </div>
  );
}