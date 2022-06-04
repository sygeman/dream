import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  useTwitchStreamQuery,
  useUpdateTwitchStreamMutation,
} from './twitch-stream.api';
import { SaveFormPanel } from '@dream/mono-components-save-form';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

interface IFormInput {
  channelKey: string;
}

export const ChannelTwitchModeSettings = () => {
  const { channelId } = useCommunityChannel();

  const twitchStreamQuery = useTwitchStreamQuery({
    variables: { channelId },
    skip: !channelId,
  });

  const twitchStream = twitchStreamQuery?.data?.twitchStream;
  const channelKey = twitchStream?.channelKey;

  const defaultValues = { channelKey };

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>();

  const [updateTwitchStream] = useUpdateTwitchStreamMutation({
    onCompleted: (data) => {
      reset({
        channelKey: data?.updateTwitchStream?.channelKey,
      });
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [channelKey]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateTwitchStream({
      variables: { input: { ...data, channelId } },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center mb-2">
        <label htmlFor="channelKey" className="text-accent text-xs mr-2">
          https://www.twitch.tv/
        </label>
        <input
          autoFocus
          {...register('channelKey', {
            required: true,
            minLength: 1,
            maxLength: 50,
            pattern: /[0-9a-zA-Z_]+/,
          })}
          placeholder="sygeman"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>
      <SaveFormPanel show={isDirty} reset={() => reset(defaultValues)} />
    </form>
  );
};
