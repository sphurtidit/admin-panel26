import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createEvent } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { toast } from 'sonner';

function EventCreateForm({ setEventId }) {
  const { userAuthToken } = useAuth();
  const [coordinater, setCoordinater] = useState([]);
  const [eventName, setEventName] = useState('');
  const [file, setFile] = useState(null);
  const [disabled, setdisabled] = useState(false);

  const formData = new FormData();

  const handelEventSubmit = async (event) => {
    event.preventDefault();
    setdisabled(true);
    formData.append('name', eventName);
    formData.append('rulebook', file);

    try {
      const data = await createEvent({
        formData,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });

      if (data.status == 403) {
        toast('Authorization Failed', {
          description: `You are not authorized for this action`,
        });
        return;
      }

      setEventId(data._id);

      setdisabled(false);
      toast('Event Created', {
        description: `New Event has been Created`,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setEventName('');
      setFile(null);
      document.getElementById('fileInput').value = '';
    }
  };

  const handelFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form onSubmit={handelEventSubmit}>
      <div className="my-6 flex flex-col gap-6">
        <div className="flex gap-2 flex-col">
          <Label>Enter Event Name</Label>
          <Input
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => {
              setEventName(e.target.value);
            }}
          />
        </div>
        <div className="flex gap-3 flex-col">
          <Label>Enter Event Name</Label>
          <Input
            type="file"
            id="fileInput"
            onChange={handelFile}
            accept="application/pdf"
          />
        </div>
        <div>
          <Button type="submit" disabled={disabled}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}

export default EventCreateForm;
