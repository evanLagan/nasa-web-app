import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';
import '../styles/CalendarView.css';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [hoveredEvent, setHoveredEvent] = useState(null);
  const [hideTimeout, setHideTimeout] = useState(null);

  useEffect(() => {
    const loadAPOD = async () => {
      const today = new Date().toISOString().split('T')[0];
      try {
        const res = await axios.get(`http://localhost:5000/api/apod?date=${today}`);
        setEvents([
          {
            title: 'APOD',
            date: today,
            backgroundColor: '#007BFF',
            extendedProps: { 
                img: res.data.url,
                copyright: res.data.copyright 
            },
          },
        ]);
        console.log(res);
      } catch (err) {
        console.error('Failed to load APOD:', err);
      }
    };
    loadAPOD();
  }, []);

  const handleEventClick = (info) => {
    alert(`Clicked ${info.event.title}`);
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
    console.log(eventInfo);
    const copyright = eventInfo.event.extendedProps.copyright;
    console.log(copyright);
    return (
        <div className="calendar-dot-label-wrapper">
            <div className="calendar-dot">
                <div className="calendar-label">
                    {copyright || 'NASA'}
                </div>
            </div>
        </div>
    )
 };

  const onEventDidMount = (info) => {
    const imgUrl = info.event.extendedProps.img;
    info.el.addEventListener('mouseenter', () => handleMouseEnter(info.el, imgUrl));
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
        />
      </div>
      {hoveredEvent && (
        <div
          className="calendar-tooltip"
          style={{
            top: hoveredEvent.top - 320,
            left: hoveredEvent.left - 150,
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
