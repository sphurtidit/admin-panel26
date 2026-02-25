import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import EventCreateForm from '@/components/custom/Events/EventCreateForm';
import EventCategoryForm from '@/components/custom/Events/EventCategoryForm';
import { useState } from 'react';

function CreateEvent() {
  const [eventId, setEventId] = useState('');

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Create New Event</CardTitle>
            <CardDescription>
              You can create a sports event with in two category Boys and Girls
            </CardDescription>
            <CardContent>
              {/* Event Form */}
              <EventCreateForm setEventId={setEventId} />
              {/* Event Form */}
              <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
                <Card className="flex-1">
                  <CardHeader>
                    <CardTitle>Event category (Boys or Girls)</CardTitle>
                    <CardDescription>Create a evet category</CardDescription>
                    {/* Event Category Form */}
                    <EventCategoryForm
                      eventId={eventId}
                      setEventId={setEventId}
                    />
                    {/* Event Category Form */}
                  </CardHeader>
                </Card>
              </div>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default CreateEvent;
