import { useParams } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SaveFormPanel } from '@/components/save-form-panel';

import {
  getTwitchModeSettingsAction,
  setTwitchModeSettingsAction,
} from './actions';

interface FormInput {
  channelKey: string | null;
}

export const ChannelTwitchModeSettings = () => {
  const parameters = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getTwitchModeSettingsAction(
        parameters.community as string,
        parameters.channel as string
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const twitchStreamSettings = await setTwitchModeSettingsAction(
      {
        communityName: parameters.community as string,
        channelName: parameters.channel as string,
      },
      data
    );

    reset(twitchStreamSettings);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex items-center mb-2">
        <label
          htmlFor="channelKey"
          className="text-muted-foreground text-xs mr-2"
        >
          https://www.twitch.tv/
        </label>
        <input
          autoFocus
          {...register('channelKey', {
            required: true,
            minLength: 1,
            maxLength: 50,
            pattern: /\w+/,
          })}
          placeholder="sygeman"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>
      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
