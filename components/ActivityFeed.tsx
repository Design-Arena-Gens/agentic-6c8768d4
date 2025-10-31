import { Activity } from '@/lib/types';

interface ActivityFeedProps {
  activities: Activity[];
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'upload':
        return '📤';
      case 'enrollment':
        return '✏️';
      case 'completion':
        return '✅';
      case 'course_created':
        return '🎓';
      default:
        return '📌';
    }
  };

  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center text-xl">
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-semibold">{activity.userName}</span>{' '}
                <span className="text-gray-600">{activity.description}</span>
              </p>
              {activity.courseName && (
                <p className="text-sm text-primary-600 mt-1">{activity.courseName}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">{getRelativeTime(activity.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
