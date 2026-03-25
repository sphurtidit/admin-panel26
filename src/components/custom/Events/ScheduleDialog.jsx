import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { createSchedule, fetchEventById } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { isCategoryAllowedForSport } from '@/lib/sportCategoryRules';

function ScheduleDialog({ fetchSchedule }) {
  const [isOpen, setIsOpen] = useState(false);
  const { userAuthToken } = useAuth();
  const { eventCategoryId, id } = useParams();
  const [categoryValidation, setCategoryValidation] = useState({
    sportName: '',
    categoryName: '',
    allowed: true,
  });
  const [formTextData, setFormTestData] = useState({
    order: 0,
    teamA: '',
    teamB: '',
    startTime: '',
    isMatchComplete: false,
    score: '',
    winner: '',
    matchName: '',
    venue: '',
  });

  const handelTextData = (event) => {
    const { id, value } = event.target;
    setFormTestData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  useEffect(() => {
    const validateCategory = async () => {
      if (!id || !eventCategoryId) {
        return;
      }

      const eventData = await fetchEventById({ id });
      const selectedCategory = eventData?.eventCategory?.find(
        (category) => category._id === eventCategoryId
      );

      const sportName = eventData?.name || '';
      const categoryName = selectedCategory?.categoryName || '';
      const allowed = isCategoryAllowedForSport(sportName, categoryName);

      setCategoryValidation({
        sportName,
        categoryName,
        allowed,
      });
    };

    validateCategory();
  }, [id, eventCategoryId]);

  const handelFormSubmit = async (event) => {
    event.preventDefault();

    if (!categoryValidation.allowed) {
      toast('Invalid Fixture Category', {
        description: `${categoryValidation.categoryName} fixtures are not allowed for ${categoryValidation.sportName}.`,
      });
      return;
    }

    const finalData = {
      ...formTextData,
      eventCategoryId,
    };
    console.log(finalData);
    const data = await createSchedule({
      data: finalData,
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
    });

    setIsOpen(false);

    fetchSchedule();

    console.log(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Fixture</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handelFormSubmit}>
          <DialogHeader>
            <DialogTitle>Add a new Fixture</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="order" className="text-right">
                Order
              </Label>
              <Input
                id="order"
                placeholder="0 or 1"
                className="col-span-3"
                value={formTextData.order}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamA" className="text-right">
                Team A
              </Label>
              <Input
                id="teamA"
                className="col-span-3"
                value={formTextData.teamA}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="teamB" className="text-right">
                Team B
              </Label>
              <Input
                id="teamB"
                className="col-span-3"
                value={formTextData.teamB}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="startTime" className="text-right">
                Start Time
              </Label>
              <Input
                id="startTime"
                className="col-span-3"
                value={formTextData.startTime}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isMatchComplete" className="text-right">
                Is Match Complete
              </Label>
              <Input
                id="isMatchComplete"
                className="col-span-3"
                value={formTextData.isMatchComplete}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="score" className="text-right">
                Score
              </Label>
              <Input
                id="score"
                className="col-span-3"
                value={formTextData.score}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="score" className="text-right">
                Venue
              </Label>
              <Input
                id="venue"
                className="col-span-3"
                value={formTextData.venue}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="winner" className="text-right">
                Winner
              </Label>
              <Input
                id="winner"
                className="col-span-3"
                value={formTextData.winner}
                onChange={handelTextData}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="matchName" className="text-right">
                Match Name
              </Label>
              <Input
                id="matchName"
                className="col-span-3"
                value={formTextData.matchName}
                onChange={handelTextData}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ScheduleDialog;
