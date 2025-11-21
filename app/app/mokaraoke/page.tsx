// pages/index.js
import Link from 'next/link';
import ActivityFeed from "@/utils/components/ActivityFeed";



export default function Home() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Main Content */}
            <ActivityFeed />
        </div>
    );
}
