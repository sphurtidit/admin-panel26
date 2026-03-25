import './App.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { Layout } from './components/custom/Layout';
import Users from './pages/Users';
import CreateEvent from './pages/CreateEvent';
import AllEvents from './pages/AllEvents';
import AllPayments from './pages/AllPayments';
import PaymentsByEvent from './pages/PaymentsByEvent';
import AllRegistrations from './pages/AllRegistrations';
import RegistrationsByEvent from './pages/RegistrationsByEvent';
import Login from './pages/Login';
import Protected from './pages/Protected';
import { Toaster } from './components/ui/sonner';
import AutoLogin from './pages/AutoLogin';
import Event from './pages/Event';
import Schedule from './pages/Schedule';
import Fixtures from './pages/Fixtures';

const router = createHashRouter([
  {
    element: <AutoLogin />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        element: <Protected />,
        children: [
          {
            element: <Layout />,
            children: [
              {
                path: '/',
                element: <Home />,
              },

              {
                path: '/users',
                element: <Users />,
              },
              {
                path: '/create-event',
                element: <CreateEvent />,
              },
              {
                path: '/all-events',
                element: <AllEvents />,
              },
              {
                path: '/fixtures',
                element: <Fixtures />,
              },
              {
                path: 'event/:id',
                element: <Event />,
              },
              {
                path: 'event/:id/:schedule',
                element: <Schedule />,
              },
              {
                path: 'event/:id/schedule/:eventCategoryId',
                element: <Schedule />,
              },
              {
                path: 'event/:id/fixtures/:eventCategoryId',
                element: <Schedule />,
              },
              {
                path: '/all-payments',
                element: <AllPayments />,
              },
              {
                path: '/payments-by-event',
                element: <PaymentsByEvent />,
              },
              {
                path: '/all-registrations',
                element: <AllRegistrations />,
              },
              {
                path: '/registrations-by-event',
                element: <RegistrationsByEvent />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
