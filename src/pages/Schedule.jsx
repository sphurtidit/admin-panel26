import ScheduleDialog from '@/components/custom/Events/ScheduleDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { deleteSchedule, getSchedule } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import ScheduleUpdateDialog from '@/components/custom/Events/ScheduleUpdateDialog';

const invoices = [
  {
    invoice: 'Order',
    totalAmount: '1',
  },
  {
    invoice: 'Start Time',
    totalAmount: '1',
  },
];

function Schedule() {
  const { eventCategoryId } = useParams();
  const [schedules, setSchedules] = useState(null);
  const { userAuthToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const fetchSchedule = async () => {
    const data = await getSchedule(eventCategoryId);
    setSchedules(data.data);

    setLoading(false);
  };

  const handelDeleteSchedule = async (id) => {
    setDisabled(true);
    const data = await deleteSchedule({
      id,
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });
    await fetchSchedule();
    setDisabled(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="m-16">
      <div>
        <ScheduleDialog fetchSchedule={fetchSchedule} />
      </div>
      <div className="mt-16 flex gap-2 flex-wrap">
        {schedules &&
          schedules.map((elm, inx) => {
            return (
              <Card key={elm._id} className="mb-3 basis-1/4 grow">
                <CardHeader>
                  <CardTitle>Schedule {inx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Table Start */}
                  <Table>
                    <TableCaption>
                      The Winner of this match is {elm.winner}
                    </TableCaption>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Order</TableCell>
                        <TableCell className="text-right">
                          {elm.order}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Match Name
                        </TableCell>
                        <TableCell className="text-right">
                          {elm.matchName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Score</TableCell>
                        <TableCell className="text-right">
                          {elm.score}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">
                          Start Time
                        </TableCell>
                        <TableCell className="text-right">
                          {elm.startTime}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Team A</TableCell>
                        <TableCell className="text-right">
                          {elm.teamA}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Team B</TableCell>
                        <TableCell className="text-right">
                          {elm.teamB}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">winner</TableCell>
                        <TableCell className="text-right">
                          {elm.winner}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  {/* Table End */}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    onClick={() => handelDeleteSchedule(elm._id)}
                    disabled={disabled}
                  >
                    Delete Schedule
                  </Button>
                  <ScheduleUpdateDialog
                    data={elm}
                    fetchSchedule={fetchSchedule}
                  />
                </CardFooter>
              </Card>
            );
          })}
      </div>
    </div>
  );
}

export default Schedule;
