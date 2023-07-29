import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  getTwitchModeSettingsAction,
  setTwitchModeSettingsAction,
} from './actions';
import { useParams } from 'next/navigation';
import { SaveFormPanel } from 'apps/client/components/save-form-panel';

interface FormInput {
  channelKey: string | null;
}

export const ChannelTwitchModeSettings = () => {
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getTwitchModeSettingsAction(
        params.community as string,
        params.channel as string,
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const twitchStreamSettings = await setTwitchModeSettingsAction(
      {
        communityName: params.community as string,
        channelName: params.channel as string,
      },
      data,
    );

    reset(twitchStreamSettings);
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
      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
