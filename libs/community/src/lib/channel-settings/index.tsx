import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useCommunityQuery, useCreateChannelMutation } from '@dream/types';
import { ChannelModeCard } from './channel-mode';
import { channelMods } from './channel-mods';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  mode: Yup.string().required('Required'),
});

export const ChannelSettings = () => {
  const router = useRouter();

  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';

  const name =
    typeof router.query?.community === 'string' && router.query?.community;

  const communityQuery = useCommunityQuery({
    variables: { name },
    skip: !name,
  });

  const community = communityQuery?.data?.community;

  const communityId = community?.id;

  const [createChannel] = useCreateChannelMutation({
    onCompleted: (data) => {
      router.push(`/${name}/${data.createChannel.name}/settings`);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
      mode: channelMods[0]?.value,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      createChannel({
        variables: { input: { ...values, communityId } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    <form onSubmit={formik.handleSubmit} className="px-4">
      <div className="py-2 mb-2 text-white text-sm uppercase">
        Channel Settings
      </div>
      <label htmlFor="title" className="text-accent text-xs uppercase">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        autoFocus
        minLength={1}
        maxLength={50}
        placeholder="Awesome Channel"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="bg-backgorud text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
          {origin}/{name}/
        </label>
        <input
          id="name"
          name="name"
          type="text"
          minLength={1}
          maxLength={50}
          placeholder="awesome"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="bg-backgorud text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <label className="text-accent text-xs uppercase">Mode</label>

      <div className="my-2">
        {channelMods.map((mode) => (
          <label key={mode.id} className="flex w-full">
            <input
              name="mode"
              type="radio"
              onChange={formik.handleChange}
              value={mode.value}
              checked={formik.values.mode === mode.value}
              className="appearance-none"
            />
            <ChannelModeCard
              color={mode.color}
              icon={mode.icon}
              title={mode.title}
              selected={formik.values.mode === mode.value}
            />
          </label>
        ))}
      </div>

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx('btn-primary', isError && 'cursor-not-allowed')}
        >
          Save
        </button>
      </div>
    </form>
  );
};
