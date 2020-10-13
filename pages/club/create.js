import { gql, useMutation } from '@apollo/client';
import { Block } from 'baseui/block';
import { Button, KIND as BUTTON_KIND } from 'baseui/button';
import { FormControl } from 'baseui/form-control';
import { Heading } from 'baseui/heading';
import { Delete } from 'baseui/icon';
import { Input } from 'baseui/input';
import { Notification, KIND as NOTIFICATION_KIND } from 'baseui/notification';
import { Textarea } from 'baseui/textarea';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import slugify from 'slugify';

import Link from '../../components/link';

const CreateClub = () => {
  const [createClub, { data, error, loading }] = useMutation(gql`
    mutation CreateClub(
      $description: String
      $location: String!
      $name: String!
      $slug: String!
      $website: String
    ) {
      createClub(
        description: $description
        location: $location
        name: $name
        slug: $slug
        website: $website
      ) {
        slug
      }
    }
  `);

  const {
    control,
    errors,
    formState,
    getValues,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      description: '',
      location: '',
      name: '',
      slug: '',
      website: '',
    },
  });

  const { dirtyFields } = formState;

  const onSubmit = (data) => {
    createClub({ variables: data });
  };

  const onNameChange = (onChange) => (event) => {
    onChange(event);

    const { value } = event.target;
    if (!dirtyFields.slug) {
      setValue('slug', slugify(value, { lower: true, strict: true }));
    }
  };

  const onResetSlug = () => {
    reset({
      ...getValues(),
      slug: slugify(getValues('name'), { lower: true, strict: true }),
    });
  };

  return (
    <>
      <Heading>Create Club</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Name" error={errors.name && 'Please enter a name'}>
          <Controller
            control={control}
            name="name"
            render={({ name, onChange, value }) => (
              <Input
                name={name}
                value={value}
                onChange={onNameChange(onChange)}
              />
            )}
            rules={{ required: true }}
          />
        </FormControl>
        <FormControl
          label="Slug"
          error={errors.slug && 'Please enter a unique slug'}
        >
          <Controller
            as={Input}
            control={control}
            endEnhancer={() => (
              <Button
                kind={BUTTON_KIND.minimal}
                type="button"
                $style={{ marginRight: '-22px' }}
                onClick={onResetSlug}
              >
                <Delete />
              </Button>
            )}
            name="slug"
            rules={{ required: true }}
            startEnhancer={() => (
              <Block
                alignItems="center"
                alignSelf="stretch"
                backgroundColor="#ddd"
                display="flex"
                marginLeft="-22px"
                padding="0 14px"
              >
                clubhub.xyz/club/
              </Block>
            )}
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
        {data?.createClub?.slug && (
          <Notification kind={NOTIFICATION_KIND.positive}>
            Club created!{' '}
            <Link href={`/club/${data.createClub.slug}`}>View</Link>
          </Notification>
        )}
        {error && (
          <Notification kind={NOTIFICATION_KIND.negative}>
            Error creating club
          </Notification>
        )}
      </form>
    </>
  );
};

export default CreateClub;
