import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { urlNameRegExp } from "@/helpers/regexp-url-name";
import { SaveFormPanel } from "@/components/save-form-panel";
import {
  getChannelSettingsAction,
  updateChannelSettingsAction,
} from "./actions";
import { useParams } from "next/navigation";

interface FormInput {
  name: string;
  title: string;
}

export const ChannelSettingsOverview = () => {
  const origin = typeof window !== "undefined" ? window?.location?.origin : "";
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getChannelSettingsAction(
        params.community as string,
        params.channel as string
      ),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { channelSettings } = await updateChannelSettingsAction({
      community: params.community as string,
      channel: params.channel as string,
      ...data,
    });

    reset({
      name: channelSettings?.name,
      title: channelSettings?.title,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="text-accent text-xs">
        Title
      </label>
      <input
        autoFocus
        {...register("title", { required: true, minLength: 1, maxLength: 50 })}
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
          {origin}/{params?.community}/
        </label>
        <input
          {...register("name", {
            required: true,
            minLength: 1,
            maxLength: 50,
            pattern: urlNameRegExp,
          })}
          placeholder="awesome"
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
