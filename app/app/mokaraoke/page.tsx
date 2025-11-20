// pages/index.js
import Link from 'next/link';
import ActivityFeed from "@/components/ActivityFeed";

export default function Home() {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Navigation */}
            <nav className="flex items-center justify-between px-8 py-4 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                    <img src="/favicon.ico" alt="MoKaraoki Logo" className="h-8 w-8" />
                    <span className="font-bold text-lg text-blue-600">MoFlo</span>
                </div>
                <div className="space-x-6">
                    <Link href="/mokaraoke/create" className="text-blue-600 font-semibold hover:underline">
                        Create
                    </Link>
                    <Link href="/mokaraoke/view" className="text-gray-700 hover:text-blue-600 font-semibold">
                        View
                    </Link>
                </div>
            </nav>
            {/* Main Content */}
            <ActivityFeed />
        </div>
    );
}
