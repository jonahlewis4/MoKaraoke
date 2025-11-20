
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

type Video = {
    title: string;
    thumbnail: string;
};

const getRandomVideo = ():Video => {
    const videos: Video[] = [
        {
            title: "Backstreet Boys -- I Want It That Way (Karaoke)",
            thumbnail: "https://i.ytimg.com/vi/NxilU56kPu0/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLDq1HAOdbLcaVne6UqBt0mhGLS6sw"
        },
        {
            title: "Green Day -- Basket Case (Karaoke)",
            thumbnail: "https://i.ytimg.com/vi/v1E0bVAIixI/hqdefault.jpg?sqp=-oaymwEnCOADEI4CSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLBmpUtJDq1sAEtdXH_QH32jL8BWbA"
        },
        {
            title: "Britney Spears -- Toxic (Karaoke)",
            thumbnail: "https://i.ytimg.com/vi/b64R9mrSHc4/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCACVANnO3b9QTmN_6AuOKr1x2bOA"
        },
        {
            title: "MIA -- Paper Planes (Karaoke)",
            thumbnail: "https://i.ytimg.com/vi/W7ww4cDwdMQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLD-Rq74a90XZs7-iRCeChOVCUV18A"
        },
        {
            title: "MGMT -- Kids (Karaoke)",
            thumbnail: "https://i.ytimg.com/vi/EXrQDvZoQNQ/hq720.jpg?sqp=-oaymwEnCNAFEJQDSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLAP-o-BQFiN2xxpWqmY8iTgnEvZKA"
        }

    ]
    const randomIndex = Math.floor(Math.random() * videos.length);
    return videos[randomIndex];
}

type Activity = {
    video: Video;
    id: number;
    action: string;
    time: string;
};
// Generate a list of video engagement activities
const nRandomVideoActivities = (count: number) =>
    Array.from({ length: count }, (_, index) => {
        const video = getRandomVideo();
        const { action, count: engagement } = getRandomEngagementActivity();

        return {
            id: index,
            video: video,
            action: `${video.title} received ${engagement} ${action}`,
            time: getRandomTime(),
        };
    });

const ActivityFeed = () => {

    //TODO future idea: add the platform
    //TODO future idea: allow click to open video
    const numActivities = 5;
    return <main className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8">Activity Feed</h1>

        <ul className="space-y-4">
            {nRandomVideoActivities(numActivities).map((a) => (
                <li
                    key={a.id}
                    className="flex items-center p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50 space-x-4"
                >
                    {/* Video Thumbnail */}
                    <img
                        src={a.video.thumbnail}
                        alt={a.video.title}
                        className="w-32 h-18 object-cover rounded border-2 border-gray-900"
                    />

                    {/* Text Content */}
                    <div>
                        <p className="text-gray-900 font-semibold">
                            <span className="text-blue-600">{a.video.title}</span> {a.action.replace(a.video.title, "")}
                        </p>
                        <p className="text-gray-500 text-sm mt-1">{a.time}</p>
                    </div>
                </li>
            ))}

        </ul>
    </main>
}
export default ActivityFeed