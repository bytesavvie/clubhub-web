import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Heading } from 'baseui/heading';
import { Input } from 'baseui/input';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

const CreateClub = () => {
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Heading>Create Club</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Name" error={errors.name && 'Please enter a name'}>
          <Controller
            as={Input}
            control={control}
            name="name"
            rules={{ required: true }}
          />
        </FormControl>
        <FormControl
          label="Location"
          error={errors.location && 'Please enter a location'}
        >
          <Controller
            as={Input}
            control={control}
            name="location"
            rules={{ required: true }}
          />
        </FormControl>
        <FormControl label="Website">
          <Controller as={Input} control={control} name="website" />
        </FormControl>
        <Button type="submit" onClick={handleSubmit}>
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateClub;
