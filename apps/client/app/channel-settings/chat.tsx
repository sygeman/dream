import React, { useEffect } from 'react';
import Slider from 'rc-slider';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useUpdateChannelSettingsMutation } from './channel-settings.api';
import { useCommunityChannel } from '@dream/mono-use-community-channel';
import { SaveFormPanel } from '../../components/save-form-panel';
import { SwitchFormField } from '../../components/switch-form-field';

interface IFormInput {
  gifAllowed: boolean;
  nsfw: boolean;
  slowmode: number;
}

export const ChannelSettingsChat: React.FC = () => {
  const { channel, channelId, communityId } = useCommunityChannel();
  const defaultValues = {
    gifAllowed: channel?.gifAllowed,
    nsfw: channel?.nsfw,
    slowmode: channel?.slowmode,
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<IFormInput>();

  const [updateChannelSettings] = useUpdateChannelSettingsMutation({
    onCompleted: (data) => {
      reset({
        gifAllowed: data?.updateChannelSettings?.gifAllowed,
        nsfw: data?.updateChannelSettings?.nsfw,
        slowmode: data?.updateChannelSettings?.slowmode,
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

  const marks = {
    0: 'Off',
    5: '5s',
    10: '10s',
    15: '15s',
    30: '30s',
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="divide-surface-light divide-y">
        <Controller
          render={({ field }) => (
            <SwitchFormField
              title="Allow Gif"
              description="Allow the use of gifs in chat"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
          name="gifAllowed"
          control={control}
          defaultValue={channel?.gifAllowed}
        />

        <Controller
          render={({ field }) => (
            <SwitchFormField
              title="NSFW"
              description="Users will need to confirm they are of over legal age to the
            content in this channel."
              checked={field.value}
              onChange={field.onChange}
            />
          )}
          name="nsfw"
          control={control}
          defaultValue={channel?.nsfw}
        />

        <div className="p-2">
          <div className="text-sm text-accent">Slowmode</div>
          <div className="p-2">
            <Controller
              render={({ field }) => (
                <Slider
                  value={field.value}
                  min={0}
                  max={30}
                  marks={marks}
                  step={null}
                  onChange={(slowmode) => {
                    if (typeof slowmode === 'number') field.onChange(slowmode);
                  }}
                />
              )}
              name="slowmode"
              control={control}
              defaultValue={channel?.slowmode}
            />
          </div>
        </div>
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset(defaultValues)} />
    </form>
  );
};
