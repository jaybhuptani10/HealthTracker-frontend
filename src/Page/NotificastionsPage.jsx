import { useState, useEffect } from "react";
import { Bell, Settings, Check, X } from "lucide-react";

// Custom card component with improved styling
const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${className}`}
    >
      {children}
    </div>
  );
};

// Custom card content component with better spacing
const CardContent = ({ children, className = "" }) => {
  return <div className={`p-5 ${className}`}>{children}</div>;
};

const generateNotifications = () => {
  const notifications = [
    {
      id: 1,
      type: "goal",
      title: "Daily Calorie Goal Reached",
      message:
        "Congratulations! You've reached your daily target of 2000 calories.",
      time: "Today, 8:43 PM",
      read: false,
      priority: "high",
    },
    {
      id: 2,
      type: "trend",
      title: "Weekly Calorie Trend",
      message:
        "Your calorie intake has been 15% below your target for the past 7 days.",
      time: "Yesterday, 9:12 AM",
      read: true,
      priority: "medium",
    },
    {
      id: 3,
      type: "macros",
      title: "Protein Goal Not Met",
      message:
        "You're currently at 75% of your daily protein goal. Consider adding a protein-rich snack.",
      time: "Feb 26, 10:30 AM",
      read: false,
      priority: "medium",
    },
    {
      id: 4,
      type: "reminder",
      title: "Meal Tracking Reminder",
      message: "Don't forget to log your lunch today!",
      time: "Feb 26, 12:00 PM",
      read: true,
      priority: "low",
    },
    {
      id: 5,
      type: "goal",
      title: "Monthly Goal Progress",
      message:
        "You're on track to meet your monthly calorie average goal of 2000 kcal.",
      time: "Feb 25, 3:15 PM",
      read: false,
      priority: "medium",
    },
    {
      id: 6,
      type: "macros",
      title: "Carb Intake Alert",
      message: "Your carb intake has exceeded your daily target by 20%.",
      time: "Feb 24, 7:30 PM",
      read: true,
      priority: "high",
    },
    {
      id: 7,
      type: "reminder",
      title: "Water Intake Reminder",
      message:
        "You've only logged 3 glasses of water today. Remember to stay hydrated!",
      time: "Feb 23, 2:45 PM",
      read: true,
      priority: "low",
    },
  ];

  return notifications;
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-blue-500";
    case "low":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getTypeIcon = (type) => {
  switch (type) {
    case "goal":
      return "🎯";
    case "trend":
      return "📈";
    case "macros":
      return "🍽️";
    case "reminder":
      return "⏰";
    default:
      return "📝";
  }
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    // Simulating API call to get notifications
    setNotifications(generateNotifications());
  }, []);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    return notification.priority === filter;
  });

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="p-6 w-full max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Bell className="h-7 w-7 mr-3 text-blue-600" />
          <h1 className="text-2xl font-bold">Notifications</h1>
          {unreadCount > 0 && (
            <span className="ml-3 bg-blue-500 text-white text-sm font-medium px-3 py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 text-sm font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Mark all as read
          </button>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex space-x-3">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("unread")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "unread"
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            Unread
          </button>
          <button
            onClick={() => setFilter("high")}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === "high"
                ? "bg-blue-500 text-white"
                : "bg-white hover:bg-gray-100"
            }`}
          >
            High Priority
          </button>
        </div>
      </div>

      {showSettings && (
        <Card className="mb-8">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">
              Notification Settings
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-md">Daily goal notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-md">Macronutrient alerts</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-md">Weekly trend reports</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-md">Meal logging reminders</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="sr-only peer"
                  />
                  <div className="w-14 h-7 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`${
                notification.read ? "bg-white" : "bg-blue-50"
              } hover:shadow-lg transition-shadow`}
            >
              <CardContent>
                <div className="flex items-start">
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${getPriorityColor(
                      notification.priority
                    )} text-white text-xl mr-4`}
                  >
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-semibold">
                        {notification.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {notification.time}
                      </span>
                    </div>
                    <p className="text-md text-gray-600 mt-2">
                      {notification.message}
                    </p>
                  </div>
                  <div className="flex-shrink-0 ml-3 space-x-2">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        title="Mark as read"
                      >
                        <Check className="h-5 w-5 text-green-600" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                      title="Delete"
                    >
                      <X className="h-5 w-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-10 text-center">
              <p className="text-gray-500 text-lg">
                No notifications to display
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
