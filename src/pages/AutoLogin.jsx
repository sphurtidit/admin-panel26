import { verify } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Loading from './Loading';

function AutoLogin() {
  const { setAutoLogin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Default to true to show loading initially

  const userAuthInfo = JSON.parse(localStorage.getItem('userAuthinfo')) || {};
  const { state } = userAuthInfo;

  useEffect(() => {
    const fetchAdmin = async () => {
      if (state?.userAuthToken) {
        try {
          const data = await verify({
            headers: {
              Authorization: `Bearer ${state.userAuthToken}`,
            },
          });

          setAutoLogin({ data });

          if (location.pathname !== '/login') {
            navigate(location.pathname); // Navigate to current pathname if not login page
          }
        } catch (err) {
          console.log('Error verifying user:', err);
        } finally {
          setLoading(false); // Stop loading after verification
        }
      } else {
        setLoading(false); // Stop loading if no token exists
      }
    };

    if (isAuthenticated) {
      return;
    }

    fetchAdmin();
  }, [state?.userAuthToken, setAutoLogin, location.pathname, navigate]);

  // Show Loading component while loading
  if (loading) {
    return <Loading />;
  }

  // Render the children components when not loading
  return <Outlet />;
}

export default AutoLogin;
