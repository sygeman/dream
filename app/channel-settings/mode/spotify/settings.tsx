import React from "react";
import { RadioGroup } from "@headlessui/react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { RadioButton } from "@/components/radio";
import { SaveFormPanel } from "@/components/save-form-panel";
import { strategies } from "./strategies";
import {
  getSpotifyModeSettingsAction,
  setSpotifyModeSettingsAction,
} from "./actions";
import { useParams } from "next/navigation";
import { SpotifyModeStrategy } from "@prisma/client";

interface FormInput {
  strategy?: SpotifyModeStrategy | null;
}

export const ChannelSpotifyModeSettings = () => {
  const params = useParams();

  const {
    control,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getSpotifyModeSettingsAction(
        params.community as string,
        params.channel as string
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const spotifyModeSettings = await setSpotifyModeSettingsAction(
      {
        communityName: params.community as string,
        channelName: params.channel as string,
      },
      data
    );
    reset(spotifyModeSettings);
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
                          <RadioButton checked={checked} />
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
        />
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
