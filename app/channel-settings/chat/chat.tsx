import React from "react";
import Slider from "rc-slider";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { SaveFormPanel } from "@/components/save-form-panel";
import { SwitchFormField } from "@/components/switch-form-field";
import { useParams } from "next/navigation";
import {
  getChannelChatSettingsAction,
  updateChannelChatSettingsAction,
} from "./actions";

interface FormInput {
  gifAllowed: boolean;
  nsfw: boolean;
  slowmode: number;
}

export const ChannelSettingsChat = () => {
  const params = useParams();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getChannelChatSettingsAction(
        params.community as string,
        params.channel as string
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { channelSettings } = await updateChannelChatSettingsAction(
      {
        community: params.community as string,
        channel: params.channel as string,
      },
      data
    );

    reset({
      gifAllowed: channelSettings.gifAllowed,
      nsfw: channelSettings.nsfw,
      slowmode: channelSettings.slowmode,
    });
  };

  const marks = {
    0: "Off",
    5: "5s",
    10: "10s",
    15: "15s",
    30: "30s",
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
                    if (typeof slowmode === "number") field.onChange(slowmode);
                  }}
                />
              )}
              name="slowmode"
              control={control}
            />
          </div>
        </div>
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
