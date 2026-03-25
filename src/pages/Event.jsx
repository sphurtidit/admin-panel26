import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  fetchEventById,
  deleteEvent,
  deleteCategory,
} from '@/services/api/apiAdmin';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from './Loading';
import useAuth from '@/store/useAuth';
import EventUpdateDialog from '@/components/custom/Events/EventUpdateDialog';
import EventCategoryUpdateDialog from '@/components/custom/Events/EventCategoryUpdateDialog';

const getCategoryLabel = (categoryName) =>
  categoryName === 'Standard' ? 'Boys' : categoryName;

function Event() {
  const id = useParams();
  const [eventDetails, setEventDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const { userAuthToken } = useAuth();
  const navigate = useNavigate();

  const fetchEvent = async () => {
    const data = await fetchEventById(id);
    setEventDetails(data);
    setLoading(false);
  };

  const deleteEventHandler = async () => {
    setDisabled(true);
    try {
      await deleteEvent({
        id: id.id,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      navigate('/all-events');
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  const handelDeleteEventCategory = async (id) => {
    setDisabled(true);
    try {
      await deleteCategory({
        id,
        headers: {
          Authorization: `Bearer ${userAuthToken}`,
        },
      });
      await fetchEvent();
    } catch (error) {
      console.log(error);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {loading ? (
        <Loading />
      ) : (
        <>
          <h1 className="mb-6 text-3xl uppercase sm:text-4xl">{eventDetails.name}</h1>
          <div>
            <Button variant="outline">Rulebook</Button>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-3 xl:grid-cols-2">
            {eventDetails.eventCategory?.map((elm, inx) => {
              return (
                <Card className="flex-1" key={elm._id}>
                  <CardHeader>
                    <CardTitle className="uppercase text-2xl">
                      {getCategoryLabel(elm.categoryName)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="w-full overflow-x-auto">
                      <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Registration Fees
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.registrationFees}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Prize Winner
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.prizeWinner}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Prize RunnerUp
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.prizeRunnerUp}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Minimum Number
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.minNumber}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Maximum Number
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.maxNumber}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Prize Visible
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.isPrizeVisible ? (
                              <span className="text-green-300">True</span>
                            ) : (
                              <span className="text-red-300">False</span>
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Registration Open
                          </TableCell>
                          <TableCell className="text-right">
                            {elm.registrationOpen ? (
                              <span className="text-green-300">True</span>
                            ) : (
                              <span className="text-red-300">False</span>
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    </div>
                  </CardContent>
                  <CardFooter className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Link to={`fixtures/${elm._id}`}>
                      <Button className="w-full sm:w-auto">Fixtures</Button>
                    </Link>
                    <div className="flex w-full flex-wrap gap-3 sm:w-auto">
                      <Button
                        onClick={() => {
                          handelDeleteEventCategory(elm._id);
                        }}
                        disabled={disabled}
                        className="w-full sm:w-auto"
                      >
                        Delete Category
                      </Button>
                      <EventCategoryUpdateDialog
                        data={elm}
                        fetchEvent={fetchEvent}
                      />
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant="outline"
              onClick={deleteEventHandler}
              disabled={disabled}
              className="w-full sm:w-auto"
            >
              Delete Event
            </Button>
            <EventUpdateDialog />
          </div>
        </>
      )}
    </div>
  );
}

export default Event;
