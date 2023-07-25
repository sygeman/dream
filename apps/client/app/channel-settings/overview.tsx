import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateChannelSettingsMutation } from './channel-settings.api';
import { useCommunityChannel } from '@dream/mono-use-community-channel';
import { urlNameRegExp } from 'apps/client/helpers/regexp-url-name';
import { SaveFormPanel } from 'apps/client/components/save-form-panel';

interface IFormInput {
  name: string;
  title: string;
}

export const ChannelSettingsOverview: React.FC = () => {
  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';
  const { community, channel, channelId, communityId } = useCommunityChannel();
  const defaultValues = {
    name: channel?.name,
    title: channel?.title,
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>();

  const [updateChannelSettings] = useUpdateChannelSettingsMutation({
    onCompleted: (data) => {
      reset({
        name: data?.updateChannelSettings?.name,
        title: data?.updateChannelSettings?.title,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateChannelSettings({
      variables: { input: { ...data, communityId, channelId } },
    });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [channel]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="text-accent text-xs">
        Title
      </label>
      <input
        autoFocus
        {...register('title', { required: true, minLength: 1, maxLength: 50 })}
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
          {origin}/{community?.name}/
        </label>
        <input
          {...register('name', {
            required: true,
            minLength: 1,
            maxLength: 50,
            pattern: urlNameRegExp,
          })}
          placeholder="awesome"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset(defaultValues)} />
    </form>
  );
};
