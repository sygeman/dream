import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  useChannelQuery,
  useTwitchStreamQuery,
  useUpdateTwitchStreamMutation,
} from '@dream/types';

const ValidationSchema = Yup.object().shape({
  channelKey: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/[0-9a-zA-Z_]+/)
    .lowercase()
    .required('Required'),
});

export const ChannelModeTwitchStreamSettings = () => {
  const { query } = useRouter();
  const channelName = typeof query?.channel === 'string' && query?.channel;

  const channelQuery = useChannelQuery({
    variables: { name: channelName },
    skip: !channelName,
  });

  const channel = channelQuery?.data?.channel;

  const twitchStreamQuery = useTwitchStreamQuery({
    variables: { channelId: channel?.id },
    skip: !channel?.id,
  });
  const [updateTwitchStream] = useUpdateTwitchStreamMutation();

  const twitchStream = twitchStreamQuery?.data?.twitchStream;
  const channelKey = twitchStream?.channelKey;

  const formik = useFormik({
    initialValues: {
      channelKey,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateTwitchStream({
        variables: { input: { ...values, channelId: channel?.id } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    // <div className="h-screen w-full flex flex-1">
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="flex items-center mb-2">
        <label htmlFor="channelKey" className="text-accent text-xs mr-2">
          https://www.twitch.tv/
        </label>
        <input
          autoFocus
          id="channelKey"
          name="channelKey"
          type="text"
          minLength={1}
          maxLength={50}
          placeholder="sygeman"
          onChange={formik.handleChange}
          value={formik.values.channelKey}
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx('btn btn-primary', isError && 'cursor-not-allowed')}
        >
          Save
        </button>
      </div>
    </form>
    // </div>
  );
};
