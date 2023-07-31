import { useParams } from 'next/navigation';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { SaveFormPanel } from '@/components/save-form-panel';
import { urlNameRegExp } from '@/helpers/regexp-url-name';

import {
  getCommunitySettingsAction,
  updateCommunitySettingsAction,
} from './actions';

interface FormInput {
  name: string;
  title: string;
}

export const CommunitySettingsOverview: React.FC = () => {
  const origin = typeof window === 'undefined' ? '' : window?.location?.origin;
  const parameters = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<FormInput>({
    defaultValues: async () =>
      getCommunitySettingsAction(parameters.community as string),
  });

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const { communitySettings } = await updateCommunitySettingsAction({
      community: parameters.community as string,
      ...data,
    });
    reset({
      name: communitySettings?.name,
      title: communitySettings?.title,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="text-muted-foreground text-xs">
        Title
      </label>
      <input
        {...register('title', { required: true, minLength: 1, maxLength: 50 })}
        placeholder="Awesome Community"
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-muted-foreground text-xs">
          {origin}/
        </label>
        <input
          {...register('name', {
            required: true,
            minLength: 1,
            maxLength: 50,
            pattern: urlNameRegExp,
          })}
          className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1"
        />
      </div>

      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
