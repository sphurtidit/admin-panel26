import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllEvents } from '@/services/api/apiAdmin';
import Loading from './Loading';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const getCategoryLabel = (categoryName) =>
  categoryName === 'Standard' ? 'Boys' : categoryName;

function Fixtures() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEvents = async () => {
      const data = await fetchAllEvents();
      setEvents(data || []);
      setLoading(false);
    };

    getEvents();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl uppercase sm:text-4xl">Fixtures</h1>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {events.map((event) => (
          <Card key={event._id}>
            <CardHeader>
              <CardTitle className="uppercase">{event.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {event.eventCategory?.map((category) => (
                  <Link
                    key={category._id}
                    to={`/event/${event._id}/fixtures/${category._id}`}
                  >
                    <Button variant="outline">
                      {getCategoryLabel(category.categoryName)} Fixtures
                    </Button>
                  </Link>
                ))}
                {!event.eventCategory?.length && (
                  <p className="text-sm text-muted-foreground">
                    No categories found for this event.
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Link to={`/event/${event._id}`}>
                <Button>Open Event</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Fixtures;
