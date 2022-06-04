import React, { useEffect } from 'react';
import { RadioGroup } from '@headlessui/react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import {
  useSpotifyModeQuery,
  useUpdateSpotifyModeMutation,
} from './mode-waitlist.api';
import { SaveFormPanel } from '@dream/mono-components-save-form';
import clsx from 'clsx';
import { strategies } from './strategies';
import { useCommunityChannel } from '@dream/mono-use-community-channel';
import { SpotifyModeStrategy } from '@dream/mono-types';

interface IFormInput {
  strategy: SpotifyModeStrategy;
}

export const ChannelSpotifyModeSettings = () => {
  const { channel } = useCommunityChannel();

  const spotifyModeQuery = useSpotifyModeQuery({
    variables: { channelId: channel?.id },
    skip: !channel?.id,
  });

  const spotifyMode = spotifyModeQuery?.data?.spotifyMode;
  const strategy = spotifyMode?.strategy;

  const defaultValues = { strategy };

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>();

  const [updateSpotifyModeMutation] = useUpdateSpotifyModeMutation({
    onCompleted: (data) => {
      reset({
        strategy: data?.updateSpotifyMode?.strategy,
      });
    },
  });

  useEffect(() => {
    reset(defaultValues);
  }, [strategy]);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateSpotifyModeMutation({
      variables: { input: { ...data, channelId: channel?.id } },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="flex w-full mb-2">
        <Controller
          render={({ field }) => (
            <RadioGroup
              className="w-full"
              value={field.value}
              onChange={field.onChange}
            >
              <RadioGroup.Label className="text-accent text-xs">
                Strategy
              </RadioGroup.Label>
              <div className="flex flex-col w-full">
                {strategies.map((strategy) => (
                  <RadioGroup.Option key={strategy.id} value={strategy.value}>
                    {({ checked }) => (
                      <div className="flex w-full rounded my-1 bg-background hover:bg-background-light cursor-pointer">
                        <div className="px-4 flex items-center">
                          <FontAwesomeIcon
                            icon={checked ? faDotCircle : faCircle}
                            className={clsx(
                              'h-5 w-5',
                              checked ? 'text-white' : 'text-accent opacity-80'
                            )}
                          />
                        </div>
                        <div className="py-2">
                          <RadioGroup.Label as="div" className="text-sm">
                            {strategy.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="div"
                            className="text-xs text-accent opacity-80"
                          >
                            {strategy.description}
                          </RadioGroup.Description>
                        </div>
                      </div>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          )}
          name="strategy"
          control={control}
          defaultValue={strategy}
        />
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset(defaultValues)} />
    </form>
  );
};
