import { AgentProfile } from "@/components/AgentProfile";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 gradient-text">My Profile</h1>
        <AgentProfile agentId="12345" />
      </div>
    </div>
  );
}
