import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useUpdateChannelSettingsMutation } from './types';
import { useCommunityChannel } from './use-community-channel';
import { urlNameRegExp } from '@dream/utils/regexp/url-name';
import { SaveFormPanel } from '@dream/components/save-form';

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

export const ChannelSettingsOverview: React.FC = () => {
  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';
  const { community, channel, channelId, communityId } = useCommunityChannel();

  const formik = useFormik({
    initialValues: {
      name: channel?.name,
      title: channel?.title,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateChannelSettings({
        variables: { input: { ...values, communityId, channelId } },
      });
    },
  });

  const [updateChannelSettings] = useUpdateChannelSettingsMutation({
    onCompleted: (data) => {
      formik.resetForm({
        values: {
          name: data?.updateChannelSettings?.name,
          title: data?.updateChannelSettings?.title,
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
          {origin}/{community?.name}/
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
