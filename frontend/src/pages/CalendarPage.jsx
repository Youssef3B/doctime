import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en-GB");
const localizer = momentLocalizer(moment);

const events = [
  {
    id: 1,
    title: "Team Meeting",
    start: new Date(2025, 1, 10, 10, 0),
    end: new Date(2025, 1, 10, 11, 0),
    type: "meeting",
  },
  {
    id: 2,
    title: "Lunch Break",
    start: new Date(2025, 1, 11, 12, 0),
    end: new Date(2025, 1, 11, 13, 0),
    type: "personal",
  },
  {
    id: 3,
    title: "Project Deadline",
    start: new Date(2025, 1, 15, 15, 0),
    end: new Date(2025, 1, 15, 17, 0),
    type: "deadline",
  },
];

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    media.addListener(listener);
    listener();

    return () => media.removeListener(listener);
  }, [query]);

  return matches;
};

const CalendarPage = () => {
  const [view, setView] = useState("week");
  const [date, setDate] = useState(new Date(2025, 1, 10));
  const isMobile = useMediaQuery("(max-width: 768px)");

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor:
        event.type === "meeting"
          ? "#3182ce"
          : event.type === "personal"
          ? "#38a169"
          : "#c53030",
      borderRadius: "4px",
      color: "white",
      border: "none",
      fontSize: "0.875rem",
      padding: "2px 4px",
    },
  });

  return (
    <div className="max-w-6xl mx-auto ">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        view={view}
        date={date}
        onView={setView}
        onNavigate={setDate}
        eventPropGetter={eventStyleGetter}
        className="bg-white rounded-xl shadow-lg p-2 sm:p-4"
        style={{ height: isMobile ? "70vh" : "80vh" }}
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 20, 0)}
        defaultView={isMobile ? "day" : "week"}
        views={["month", "week", "day", "agenda"]}
        components={{
          toolbar: (props) => <CustomToolbar {...props} isMobile={isMobile} />,
        }}
      />
    </div>
  );
};

const CustomToolbar = ({ label, onNavigate, onView, isMobile }) => {
  const [currentView, setCurrentView] = useState("week");

  const handleViewChange = (view) => {
    setCurrentView(view);
    onView(view);
  };

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between gap-4 mb-4 p-2 bg-gray-50 rounded-lg`}
    >
      <div className="flex gap-2 order-2 sm:order-1">
        <button
          onClick={() => onNavigate("PREV")}
          className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          ‹
        </button>
        <button
          onClick={() => onNavigate("TODAY")}
          className="px-4 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Today
        </button>
        <button
          onClick={() => onNavigate("NEXT")}
          className="px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          ›
        </button>
      </div>

      <div className="text-lg font-semibold text-gray-700 order-1 sm:order-2 text-center">
        {label}
      </div>

      <div className="flex gap-2 order-3 sm:order-3">
        {isMobile ? (
          <select
            value={currentView}
            onChange={(e) => handleViewChange(e.target.value)}
            className="px-3 py-1.5 border rounded-md bg-white text-gray-700"
          >
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        ) : (
          ["month", "week", "day"].map((v) => (
            <button
              key={v}
              onClick={() => handleViewChange(v)}
              className={`px-4 py-1.5 rounded-md transition-colors ${
                currentView === v
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
