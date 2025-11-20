const activities = [
    { id: 1, user: 'John Doe', action: 'created a new lead', time: '2 mins ago' },
    { id: 2, user: 'Jane Smith', action: 'viewed the dashboard', time: '10 mins ago' },
    { id: 3, user: 'Alice Johnson', action: 'scheduled a demo', time: '1 hour ago' },
];
const ActivityFeed = () => {
    return <main className="max-w-4xl mx-auto px-8 py-10">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-8">Activity Feed</h1>

        <ul className="space-y-4">
            {activities.map(({ id, user, action, time }) => (
                <li key={id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-50">
                    <p className="text-gray-900 font-semibold">
                        <span className="text-blue-600">{user}</span> {action}
                    </p>
                    <p className="text-gray-500 text-sm mt-1">{time}</p>
                </li>
            ))}
        </ul>
    </main>
}
export default ActivityFeed