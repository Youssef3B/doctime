import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Modal } from "antd";
import Datepicker from "react-tailwindcss-datepicker";

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
        className="bg-white rounded-xl shadow-lg p-2"
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  return (
    <>
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

        <div className="flex justify-between gap-2 order-3 sm:order-3">
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

          <Button type="primary" onClick={showModal}>
            Add Task
          </Button>
          <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
            <form className="max-w-md mx-auto">
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required=""
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <input
                  type="text"
                  name="event"
                  id="event"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  required=""
                />
                <label
                  htmlFor="event"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Event
                </label>
              </div>
              <div className="relative z-0 w-full mb-5 group">
                <label className="mb-4" htmlFor="date">
                  date
                </label>
                <input type="date" className="w-full mt-2" />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default CalendarPage;
