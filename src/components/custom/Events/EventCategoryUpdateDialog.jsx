import React, { useState } from 'react';
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
import { updateCategory } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';

function EventCategoryUpdateDialog({ data, fetchEvent }) {
  const { userAuthToken } = useAuth();
  console.log(data);
  const [isOpen, setIsOpen] = useState(false);
  const [categoryData, setCategoryData] = useState({
    registrationFees: data.registrationFees,
    minNumber: data.minNumber,
    maxNumber: data.maxNumber,
    prizeWinner: data.prizeWinner,
    prizeRunnerUp: data.prizeRunnerUp,
    isPrizeVisible: data.isPrizeVisible ? true : false,
    registrationOpen: data.registrationOpen ? true : false,
  });

  const handelCategoryData = (e) => {
    setCategoryData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handelFormSubmit = async (e) => {
    e.preventDefault();
    const res = await updateCategory({
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
      data: {
        id: data._id,
        ...categoryData,
      },
    });
    setIsOpen(false);
    fetchEvent();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Event Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={(e) => handelFormSubmit(e)}>
          <DialogHeader>
            <DialogTitle>Edit Event Category</DialogTitle>
            <DialogDescription>
              Make changes to your Event Category here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registrationFees" className="text-right">
                Registration Fees
              </Label>
              <Input
                id="registrationFees"
                className="col-span-3"
                value={categoryData.registrationFees}
                onChange={(e) => handelCategoryData(e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="minNumber" className="text-right">
                Minimum Number
              </Label>
              <Input
                id="minNumber"
                placeholder={data.minNumber}
                className="col-span-3"
                value={categoryData.minNumber}
                onChange={(e) => handelCategoryData(e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="maxNumber" className="text-right">
                Maximum Number
              </Label>
              <Input
                id="maxNumber"
                placeholder={data.maxNumber}
                className="col-span-3"
                value={categoryData.maxNumber}
                onChange={(e) => handelCategoryData(e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizeWinner" className="text-right">
                Prize Winner
              </Label>
              <Input
                id="prizeWinner"
                placeholder={data.prizeWinner}
                className="col-span-3"
                value={categoryData.prizeWinner}
                onChange={(e) => handelCategoryData(e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="prizeRunnerUp" className="text-right">
                Prize Runner Up
              </Label>
              <Input
                id="prizeRunnerUp"
                placeholder={data.prizeRunnerUp}
                className="col-span-3"
                value={categoryData.prizeRunnerUp}
                onChange={(e) => handelCategoryData(e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isPrizeVisible" className="text-right">
                Is Prize Visible
              </Label>
              <Input
                id="isPrizeVisible"
                className="col-span-3"
                onChange={(e) => handelCategoryData(e)}
                value={categoryData.isPrizeVisible}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="registrationOpen" className="text-right">
                Registration Open
              </Label>
              <Input
                id="registrationOpen"
                className="col-span-3"
                onChange={(e) => handelCategoryData(e)}
                value={categoryData.registrationOpen}
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

export default EventCategoryUpdateDialog;
