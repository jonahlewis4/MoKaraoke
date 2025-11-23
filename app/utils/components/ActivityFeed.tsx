import {useEffect, useState} from "react";
import {getAllUploadedVideos} from "@/utils/supabase/db";
import {SanitizedVideo} from "@/app/api/karaoke/generated/all/route";
import {getUploadedVideos} from "@/utils/clientHttp/getUploadedVideos";


const getRandomEngagementActivity = (): { action: string; count: number } => {
    const activityTypes = ["likes", "comments", "views"];
    const type = activityTypes[Math.floor(Math.random() * activityTypes.length)];
    const count = Math.floor(Math.random() * 500) + 1; // 1-500 engagements
    return { action: type, count };
};

const getRandomTime = (): string => {
    const times = [
        "just now",
        "2 mins ago",
        "10 mins ago",
        "30 mins ago",
        "1 hour ago",
        "yesterday",
    ];
    const randomIndex = Math.floor(Math.random() * times.length);
    return times[randomIndex];
};

type Activity = {
    video: SanitizedVideo;
    id: number;
    action: string;
    time: string;
};

const generateActivitiesFromVideos = (videos: SanitizedVideo[]): Activity[] => {
    if (videos.length === 0) return [];

    const numActivities = Math.min(5, videos.length);
    const activities: Activity[] = [];

    for (let i = 0; i < numActivities; i++) {
        const randomVideo = videos[Math.floor(Math.random() * videos.length)];
        const { action, count: engagement } = getRandomEngagementActivity();

        activities.push({
            id: i,
            video: randomVideo,
            action: `received ${engagement} ${action}`,
            time: getRandomTime(),
        });
    }

    return activities;
};

const ActivityFeed = () => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadActivities = async () => {
            try {
                const videos = await getUploadedVideos();
                const generatedActivities = generateActivitiesFromVideos(videos);
                setActivities(generatedActivities);
            } catch (error) {
                console.error('Failed to fetch videos:', error);
            } finally {
                setLoading(false);
            }
        }
        loadActivities();
    }, []);

    if (loading) {
        return <div className="max-w-4xl mx-auto px-8 py-10">Loading...</div>;
    }

    if (activities.length === 0) {
        return <div className="max-w-4xl mx-auto px-8 py-10">No activities yet</div>;
    }

    return (
        <main className="max-w-4xl mx-auto px-8 py-10">
            <h1 className="text-3xl font-extrabold text-blue-700 mb-8">Activity Feed</h1>

            <ul className="space-y-4">
                {activities.map((a) => (
                    <li
                        key={a.id}
                        className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50 space-x-4"
                    >
                        {/* Video Thumbnail - extract from YouTube URL */}
                        <img
                            src={`https://img.youtube.com/vi/${extractYouTubeId(a.video.youtubeUrl)}/hqdefault.jpg`}
                            alt={a.video.title}
                            className="w-32 h-18 object-cover rounded border-2 border-gray-900"
                        />

                        {/* Text Content */}
                        <div>
                            <p className="text-gray-900 font-semibold">
                                <span className="text-blue-600">{a.video.title}</span> {a.action}
                            </p>
                            <p className="text-gray-500 text-sm mt-1">{a.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );

}
// Helper function to extract YouTube video ID from URL
const extractYouTubeId = (url: string): string => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : '';
};
export default ActivityFeed