// Random user
const getRandomUser = (): string => {
    const names = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Charlie Lee"];
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
};

// Random action
const getRandomAction = (): string => {
    const actions = [
        "created a new lead",
        "viewed the dashboard",
        "scheduled a demo",
        "updated a record",
        "commented on a task",
    ];
    const randomIndex = Math.floor(Math.random() * actions.length);
    return actions[randomIndex];
};

// Random time
const getRandomTime = (): string => {
    const times = [
        "2 mins ago",
        "10 mins ago",
        "30 mins ago",
        "1 hour ago",
        "yesterday",
    ];
    const randomIndex = Math.floor(Math.random() * times.length);
    return times[randomIndex];
};

// Generate random activities
type Activity = {
    id: number;
    user: string;
    action: string;
    time: string;
};

const nRandomActivities = (count: number): Activity[] =>
    Array.from({ length: count }, (_, index) => ({
        id: index,
        user: getRandomUser(),
        action: getRandomAction(),
        time: getRandomTime(),
    }));

const ActivityFeed = () => {

    const numActivities = 3;
    return <main className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8">Activity Feed</h1>

        <ul className="space-y-4">
            {nRandomActivities(numActivities).map((a : Activity) => (
                <li key={a.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
                    <p className="text-gray-900 font-semibold">
                        <span className="text-blue-600">{a.user}</span> {a.action}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{a.time}</p>
                </li>
            ))}
        </ul>
    </main>
}
export default ActivityFeed