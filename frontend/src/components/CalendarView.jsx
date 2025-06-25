import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import '../styles/CalendarView.css';

// Global cache for persistance
const apodCache = {};

const CalendarView = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);
  const [calendarRange, setCalendarRange] = useState({ start: null, end: null });
  //const apodCache = useRef({});


  // Fetch APODs for the current visible month range
  useEffect(() => {
    const loadAPODsForMonth = async () => {
      if (!calendarRange.start || !calendarRange.end) return;

      // Checking cache for apod data before fetching
      const startDate = new Date(calendarRange.start);
      const key = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}`;

      if (apodCache[key]) {
        console.log("Retreiving from cache");
        setEvents(apodCache[key]);
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:5000/api/apod-range?start_date=${calendarRange.start}&end_date=${calendarRange.end}`
        );

        const events = res.data.map((entry) => ({
          title: 'APOD',
          date: entry.date,
          backgroundColor: '#007BFF',
          extendedProps: {
            img: entry.url,
            copyright: entry.copyright || 'NASA',
          },
        }));

        apodCache[key] = events;
        setEvents(events);
      } catch (err) {
        console.error('Failed to load APODs:', err);
        setEvents([]);
      }
    };

    loadAPODsForMonth();
  }, [calendarRange]);

  
  // Handle month navigation
  const handleDatesSet = (range) => {
    const start = new Date(range.startStr);
    const end = new Date(range.endStr);
    const today = new Date();

    // Computing the cache key
    const year = start.getFullYear();
    const month = String(start.getMonth() + 1).padStart(2, 0);
    const cacheKey = `${year}-${month}`;

    // Skip if viewing a future month
    if (start > today) {
      setCalendarRange({ start: null, end: null });
      setEvents([]);
      return;
    }

    const realStart = new Date(start.getFullYear(), start.getMonth(), 1).toISOString().split('T')[0];
    const realEnd = (end > today ? today : end).toISOString().split('T')[0];

    setCalendarRange({ start: realStart, end: realEnd });
  };

  const handleEventClick = (info) => {
    //alert(`Clicked ${info.event.title}`);
    const date = info.event.startStr;
    navigate(`/apod/${date}`);
  };

  const handleMouseEnter = (el, imgUrl) => {
    if (hideTimeout) clearTimeout(hideTimeout);
    const rect = el.getBoundingClientRect();
    setHoveredEvent({
      img: imgUrl,
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredEvent(null);
    }, 300);
    setHideTimeout(timeout);
  };

  const renderEventContent = (eventInfo) => {
    const copyright = eventInfo.event.extendedProps.copyright;
    return (
      <div className="calendar-dot-label-wrapper">
        <div className="calendar-dot" />
        <div className="calendar-label">{copyright}</div>
      </div>
    );
  };

  const onEventDidMount = (info) => {
    const { img } = info.event.extendedProps;
    info.el.addEventListener('mouseenter', () => handleMouseEnter(info.el, img));
    info.el.addEventListener('mouseleave', handleMouseLeave);
  };

  return (
    <div className="calendar-wrapper">
      <div className="calendar-container">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          eventContent={renderEventContent}
          eventClick={handleEventClick}
          eventDidMount={onEventDidMount}
          datesSet={handleDatesSet}
        />
      </div>

      {hoveredEvent && (
        <div
          className="calendar-tooltip"
          style={{
            top: hoveredEvent.top - 280,
            left: hoveredEvent.left - 80,
          }}
          onMouseEnter={() => hideTimeout && clearTimeout(hideTimeout)}
          onMouseLeave={handleMouseLeave}
        >
          <img src={hoveredEvent.img} alt="APOD Preview" />
        </div>
      )}
    </div>
  );
};

export default CalendarView;
