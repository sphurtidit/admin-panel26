import React, { useEffect, useState } from 'react';
import { fetchAllEvents, getRegistrationsByCategory } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { Button } from '@/components/ui/button';
import Loading from './Loading'; // Table component
import RegistrationBody from './RegistrationBody';

function RegistrationsByEvents() {
  const { userAuthToken } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  useEffect(() => {
    const fetchEventsData = async () => {
      try {
        const data = await fetchAllEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventsData();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setSelectedCategory(null);
    setRegistrations([]);
  };

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    setCategoryLoading(true);
    console.log('category', category);
    try {
      const response = await getRegistrationsByCategory({
        id: category._id,
        headers: { Authorization: `Bearer ${userAuthToken}` },
      });
      console.log(response);
      setRegistrations(response);
    } catch (error) {
      console.error('Error fetching registration data:', error);
      setRegistrations([]);
    } finally {
      setCategoryLoading(false);
    }
  };

  return (
    <div className="m-16">
      {loading ? (
        <Loading />
      ) : (
        <>
          {/* Event Selection */}
          <div className="flex gap-4 mb-6">
            {events.map((event) => (
              <Button
                key={event._id}
                onClick={() => handleEventClick(event)}
                className={`p-2 ${selectedEvent === event ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  } rounded`}
              >
                {event.name}
              </Button>
            ))}
          </div>

          {/* Category Selection */}
          {selectedEvent && (
            <div className="mb-6">
              <h2 className="text-xl font-bold">Select a Category for {selectedEvent.name}</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                {selectedEvent.eventCategory.map((category) => (
                  <Button
                    key={category._id}
                    onClick={() => handleCategoryClick(category)}
                    className={`p-2 ${selectedCategory === category ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                      } rounded`}
                  >
                    {category.categoryName}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {
            registrations.length > 0 && (
              <RegistrationBody registration={registrations} /> // Table component    
            )
          }
        </>
      )}
    </div>
  );
}

export default RegistrationsByEvents;
