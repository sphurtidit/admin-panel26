import React, { useEffect, useState } from 'react';
import RegistrationBody from './RegistrationBody';
import { getAllRegistrations } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';

function AllRegistrations() {
  const userAuthToken = useAuth();
  const [registration, setRegistration] = useState([]);

  const fetchRegistration = async () => {
    const { data } = await getAllRegistrations({
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });
    setRegistration(data);
  };

  console.log(registration);

  useEffect(() => {
    fetchRegistration();
  }, []);

  if (!registration) return <div>Loading...</div>;

  return (
    <RegistrationBody
      registration={registration}
      fetchRegistration={fetchRegistration}
    />
  );
}

export default AllRegistrations;
