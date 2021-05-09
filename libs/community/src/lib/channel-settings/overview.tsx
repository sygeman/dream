import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  useChannelQuery,
  useCommunityQuery,
  useUpdateChannelMutation,
} from '@dream/types';
import { urlNameRegExp } from '@dream/utils/regexp';
import { SaveFormPanel } from '@dream/components';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(urlNameRegExp)
    .lowercase()
    .required('Required'),
});

export const ChannelSettingsOverview = () => {
  const router = useRouter();
  const communityName =
    typeof router.query?.community === 'string' && router.query?.community;
  const channelName =
    typeof router.query?.channel === 'string' && router.query?.channel;

  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';

  const communityQuery = useCommunityQuery({
    variables: { name: communityName },
    skip: !communityName,
  });
  const community = communityQuery?.data?.community;
  const communityId = community?.id;

  const channelQuery = useChannelQuery({
    variables: { name: channelName },
    skip: !channelName,
  });
  const channel = channelQuery?.data?.channel;
  const channelId = channel?.id;

  const formik = useFormik({
    initialValues: {
      name: channel?.name,
      title: channel?.title,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateChannel({
        variables: { input: { ...values, communityId, channelId } },
      });
    },
  });

  const [updateChannel] = useUpdateChannelMutation({
    onCompleted: (data) => {
      formik.resetForm({
        values: {
          name: data?.updateChannel?.name,
          title: data?.updateChannel?.title,
        },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="text-accent text-xs">
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
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
          {origin}/{communityName}/
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
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <SaveFormPanel show={formik.dirty} reset={() => formik.resetForm()} />
    </form>
  );
};
