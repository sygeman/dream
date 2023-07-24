import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUpdateCommunitySettingsMutation } from './community-settings.api';
import { useCommunity } from './use-community';
import { urlNameRegExp } from '../../helpers/regexp-url-name';
import { SaveFormPanel } from '../../components/save-form-panel';

interface IFormInput {
  name: string;
  title: string;
}

export const CommunitySettingsOverview: React.FC = () => {
  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';
  const { communitySettings, communityId } = useCommunity();

  const defaultValues = {
    name: communitySettings?.name,
    title: communitySettings?.title,
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>();

  const [updateCommunitySettings] = useUpdateCommunitySettingsMutation({
    onCompleted: (data) => {
      reset({
        name: data?.updateCommunitySettings?.name,
        title: data?.updateCommunitySettings?.title,
      });
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    updateCommunitySettings({
      variables: { input: { ...data, communityId } },
    });
  };

  useEffect(() => {
    reset(defaultValues);
  }, [communitySettings]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="text-accent text-xs">
        Title
      </label>
      <input
        {...register('title', { required: true, minLength: 1, maxLength: 50 })}
        placeholder="Awesome Community"
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
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

      <SaveFormPanel show={isDirty} reset={() => reset(defaultValues)} />
    </form>
  );
};
