import { Transition } from '@headlessui/react';
import { ChannelMode } from '@prisma/client';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { SaveFormPanel } from '@/components/save-form-panel';
import { channelMods } from '@/helpers/channel-mods';

import { getChannelModeAction, setChannelModeAction } from './actions';
import { ChannelSettingsModeCard } from './mode-card';
import { ModeSettings } from './mode-settings';

interface FormInput {
  mode: ChannelMode;
}

export const ChannelSettingsMode = () => {
  const [selectedChannelMode, setSelectedChannelMode] = useState<ChannelMode>(
    ChannelMode.NONE
  );
  const parameters = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getChannelModeAction(
        parameters.community as string,
        parameters.channel as string
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { mode } = await setChannelModeAction(
      {
        communityName: parameters.community as string,
        channelName: parameters.channel as string,
      },
      data
    );

    reset({ mode });
  };

  return (
    <div className="flex w-full h-full">
      <form
        className="flex flex-col space-y-2 w-full overflow-hidden"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          render={({ field }) => (
            <>
              {channelMods.map((m) => (
                <ChannelSettingsModeCard
                  key={m.id}
                  mode={m}
                  active={m.value === field.value}
                  openSettings={() => {
                    setSelectedChannelMode(m.value);
                  }}
                  makeCurrent={() => field.onChange(m.value)}
                />
              ))}
            </>
          )}
          name="mode"
          control={control}
        />
        <SaveFormPanel show={isDirty} reset={() => reset()} />
      </form>
      <Transition
        as="div"
        className="absolute top-0 left-0 p-4 pt-10 h-full w-full bg-zinc-900"
        show={!!selectedChannelMode}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <ModeSettings
          modeKey={selectedChannelMode}
          onClose={() => setSelectedChannelMode(ChannelMode.NONE)}
        />
      </Transition>
    </div>
  );
};
