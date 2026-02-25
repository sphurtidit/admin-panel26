import React, { useState } from 'react';
import EventCaregoryFormFields from './EventCaregoryFormFields';
import { CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createCategory } from '@/services/api/apiAdmin';
import useAuth from '@/store/useAuth';
import { toast } from 'sonner';

function EventCategoryForm({ eventId, setEventId }) {
  const { userAuthToken } = useAuth();
  const [disabled, setDisabled] = useState(false);

  const handelEventSubmit = async (event) => {
    setDisabled(true);
    event.preventDefault();
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
          <EventCaregoryFormFields
            fieldname={'Category Name'}
            value={category.categoryName}
            handelCategory={handelCategory}
            name="categoryName"
          />
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
