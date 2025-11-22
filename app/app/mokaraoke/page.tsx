// pages/index.js
import Link from 'next/link';
import ActivityFeed from "@/utils/components/ActivityFeed";
import {getDownloadLinkForUuidResource} from "@/utils/clientHttp/getDownloadLinkForUuidResource";



export default function Home() {
    return <video autoPlay loop muted className="w-full h-screen object-cover"
        src={getDownloadLinkForUuidResource("1234567890")}
    ></video>

    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Main Content */}
            <ActivityFeed />
        </div>
    );
}
