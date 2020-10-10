import { gql, useMutation } from '@apollo/client';
import { Button } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Heading } from 'baseui/heading';
import { Input } from 'baseui/input';
import { Notification, KIND } from 'baseui/notification';
import { Textarea } from 'baseui/textarea';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import Link from '../../components/link';

const CreateClub = () => {
  const [createClub, { data, error, loading }] = useMutation(gql`
    mutation CreateClub(
      $description: String
      $location: String!
      $name: String!
      $website: String
    ) {
      createClub(
        description: $description
        location: $location
        name: $name
        website: $website
      ) {
        id
      }
    }
  `);

  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      description: '',
      name: '',
      location: '',
      website: '',
    },
  });

  const onSubmit = (data) => {
    createClub({ variables: data });
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
        <FormControl label="Description">
          <Controller as={Textarea} control={control} name="description" />
        </FormControl>
        <Button type="submit" isLoading={loading} onClick={handleSubmit}>
          Create
        </Button>
        {data?.createClub?.id && (
          <Notification kind={KIND.positive}>
            Club created! <Link href={`/club/${data.createClub.id}`}>View</Link>
          </Notification>
        )}
        {error && (
          <Notification kind={KIND.negative}>Error creating club</Notification>
        )}
      </form>
    </>
  );
};

export default CreateClub;
