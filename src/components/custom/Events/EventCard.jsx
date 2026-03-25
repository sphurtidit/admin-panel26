import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import React from 'react';
import { Link } from 'react-router-dom';
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://s26-backend.onrender.com'
).replace(/\/$/, '');

function EventCard({ data }) {
  const handleDownload = async () => {
    const link = document.createElement('a');
    link.href = `${API_BASE_URL}/public${data.rulebook}`;
    link.target = '_blank'; // Opens in a new tab, optional
    link.download = `${data.name} rulebook.pdf`; // Optional: set a filename for downloading
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant={'outline'} onClick={handleDownload}>
          Rulebook
        </Button>
        <Link to={`/event/${data._id}`}>
          <Button variant="default">View Event</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default EventCard;
