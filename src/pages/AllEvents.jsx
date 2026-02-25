import EventCard from '@/components/custom/Events/EventCard';
import React, { useEffect, useState } from 'react';
import { fetchAllEvents } from '@/services/api/apiAdmin';
import { Button } from '@/components/ui/button';
import Loading from './Loading';

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await fetchAllEvents();
      setEvents(data);
      setLoading(false);
    };
    fetchEvents();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {events.map((elm, inx) => {
              return (
                <div key={elm._id}>
                  <EventCard data={elm} key={elm._id} />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default AllEvents;
