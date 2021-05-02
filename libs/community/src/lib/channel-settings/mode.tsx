import React from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import {
  useChannelQuery,
  useCommunityQuery,
  useUpdateChannelMutation,
  useDeleteChannelMutation,
} from '@dream/types';
import { ChannelModeCard } from '../channel-mode';
import { channelMods } from '../channel-mods';

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

export const ChannelSettingsMode = () => {
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

  const [createChannel] = useUpdateChannelMutation({
    onCompleted: (data) => {
      router.push(`/${communityName}/${data.updateChannel.name}`);
    },
  });

  const [deleteChannel] = useDeleteChannelMutation({
    onCompleted: () => {
      router.push(`/${communityName}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: channel?.name,
      title: channel?.title,
      mode: channel?.mode,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      createChannel({
        variables: { input: { ...values, communityId, channelId } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return <div>Mode</div>;
};
