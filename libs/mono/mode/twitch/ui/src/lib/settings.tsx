import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  useTwitchStreamQuery,
  useUpdateTwitchStreamMutation,
} from './twitch-stream.api';
import { SaveFormPanel } from '@dream/mono-components-save-form';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

const ValidationSchema = Yup.object().shape({
  channelKey: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(/[0-9a-zA-Z_]+/)
    .lowercase()
    .required('Required'),
});

export const ChannelTwitchModeSettings = () => {
  const { channelId } = useCommunityChannel();

  const twitchStreamQuery = useTwitchStreamQuery({
    variables: { channelId },
    skip: !channelId,
  });
  const [updateTwitchStream] = useUpdateTwitchStreamMutation({
    onCompleted: (data) => {
      formik.resetForm({
        values: {
          channelKey: data?.updateTwitchStream?.channelKey,
        },
      });
    },
  });

  const twitchStream = twitchStreamQuery?.data?.twitchStream;
  const channelKey = twitchStream?.channelKey;

  const formik = useFormik({
    initialValues: {
      channelKey,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateTwitchStream({
        variables: { input: { ...values, channelId } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
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

      <SaveFormPanel show={formik.dirty} reset={() => formik.resetForm()} />
    </form>
  );
};
