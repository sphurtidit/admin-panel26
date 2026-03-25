import React, { useEffect, useMemo, useState } from 'react';
import EventCaregoryFormFields from './EventCaregoryFormFields';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createCategory, fetchEventById } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { getAllowedCategoriesForSport } from '@/lib/sportCategoryRules';

function EventCategoryForm({ eventId, setEventId }) {
  const { userAuthToken } = useAuth();
  const [disabled, setDisabled] = useState(false);
  const [eventName, setEventName] = useState('');

  const allowedCategories = useMemo(
    () => getAllowedCategoriesForSport(eventName),
    [eventName]
  );

  useEffect(() => {
    const getEventDetails = async () => {
      if (!eventId) {
        setEventName('');
        return;
      }

      const data = await fetchEventById({ id: eventId });
      setEventName(data?.name || '');
    };

    getEventDetails();
  }, [eventId]);

  useEffect(() => {
    if (!category.categoryName && allowedCategories.length) {
      setCategory((prev) => ({
        ...prev,
        categoryName: allowedCategories[0],
      }));
    }
  }, [allowedCategories]);

  const handelEventSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();

    if (!allowedCategories.includes(category.categoryName)) {
      toast('Invalid Category', {
        description: `Only ${allowedCategories.join(' / ')} category is allowed for ${eventName || 'this sport'}.`,
      });
      setDisabled(false);
      return;
    }

    const eventCategoryData = {
      ...category,
      eventId,
    };

    await createCategory({
      headers: {
        Authorization: `Bearer ${userAuthToken}`,
      },
      eventCategoryData,
    });

    setDisabled(false);

    toast('Event Category Created Succefully', {
      description: `Event category has been created for ${category.categoryName}`,
    });
    return;
  };

  const initialStateForm = {
    categoryName: '',
    registrationFees: '',
    minNumber: '',
    maxNumber: '',
    prizeWinner: '',
    prizeRunnerUp: '',
  };

  const handelClearForm = () => {
    setCategory(initialStateForm);
    setEventId('');
  };

  const [category, setCategory] = useState(initialStateForm);

  const handelCategory = (event) => {
    const { name, value } = event.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form type="submit" onSubmit={handelEventSubmit}>
      <CardContent>
        <div className="flex gap-3 flex-wrap">
          <EventCaregoryFormFields
            fieldname={'Event Id'}
            value={eventId}
            name="eventId"
            disabled={true}
          />
          <div className="basis-3/12 flex-1">
            <Label className="mb-2 block">Category Name</Label>
            <Select
              value={category.categoryName}
              onValueChange={(value) =>
                setCategory((prev) => ({
                  ...prev,
                  categoryName: value,
                }))
              }
              disabled={!eventId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {allowedCategories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <EventCaregoryFormFields
            fieldname={'Registration Fees'}
            value={category.registrationFees}
            handelCategory={handelCategory}
            name="registrationFees"
          />
          <EventCaregoryFormFields
            fieldname={'Minimum Number'}
            value={category.minNumber}
            handelCategory={handelCategory}
            name="minNumber"
          />
          <EventCaregoryFormFields
            fieldname={'Maximum Number'}
            value={category.maxNumber}
            handelCategory={handelCategory}
            name="maxNumber"
          />
          <EventCaregoryFormFields
            fieldname={'Prize Winner'}
            value={category.prizeWinner}
            handelCategory={handelCategory}
            name="prizeWinner"
          />
          <EventCaregoryFormFields
            fieldname={'Prize RunnerUp'}
            value={category.prizeRunnerUp}
            handelCategory={handelCategory}
            name="prizeRunnerUp"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" type="submit" disabled={disabled}>
          Submit
        </Button>
        <Button variant="outline" type="button" onClick={handelClearForm}>
          Clear Form
        </Button>
      </CardFooter>
    </form>
  );
}

export default EventCategoryForm;
