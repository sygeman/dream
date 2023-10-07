import { useParams } from 'next/navigation';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { SaveFormPanel } from '@/components/save-form-panel';
import { SwitchFormField } from '@/components/switch-form-field';
import { Slider } from '@/components/ui/slider';

import {
  getChannelChatSettingsAction,
  updateChannelChatSettingsAction,
} from './actions';

interface FormInput {
  gifAllowed: boolean;
  nsfw: boolean;
  slowmode: number;
}

export const ChannelSettingsChat = () => {
  const parameters = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getChannelChatSettingsAction(
        parameters.community as string,
        parameters.channel as string
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { channelSettings } = await updateChannelChatSettingsAction(
      {
        community: parameters.community as string,
        channel: parameters.channel as string,
      },
      data
    );

    reset({
      gifAllowed: channelSettings.gifAllowed,
      nsfw: channelSettings.nsfw,
      slowmode: channelSettings.slowmode,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="divide-zinc-900-light divide-y">
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
        />

        <Controller
          render={({ field }) => (
            <div className="p-2">
              <div className="text-sm text-muted-foreground">
                Slowmode - {field.value}s
              </div>
              <div className="p-2">
                <Slider
                  value={[field.value]}
                  min={0}
                  max={30}
                  step={5}
                  onValueChange={([slowmode]) => {
                    if (typeof slowmode === 'number') field.onChange(slowmode);
                  }}
                />
              </div>
            </div>
          )}
          name="slowmode"
          control={control}
        />
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
