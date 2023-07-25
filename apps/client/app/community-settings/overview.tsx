import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { urlNameRegExp } from '../../helpers/regexp-url-name';
import { SaveFormPanel } from '../../components/save-form-panel';
import { useParams } from 'next/navigation';

interface IFormInput {
  name: string;
  title: string;
}

const getCommunitySettings = async (community: string) => {
  const formData = new FormData();
  formData.set('community', community as string);

  const { communitySettings } = await fetch(
    '/community-settings/$get-community-settings',
    {
      method: 'POST',
      body: formData,
    },
  ).then((res) => res.json());

  return {
    title: communitySettings.title,
    name: communitySettings.name,
  };
};

const updateCommunitySettings = async (
  community: string,
  { title, name }: { title: string; name: string },
) => {
  const formData = new FormData();
  formData.set('community', community as string);
  formData.set('title', title as string);
  formData.set('name', name as string);

  const { communitySettings } = await fetch(
    '/community-settings/$update-community-settings',
    {
      method: 'POST',
      body: formData,
    },
  ).then((res) => res.json());

  return communitySettings;
};

export const CommunitySettingsOverview: React.FC = () => {
  const origin = typeof window !== 'undefined' ? window?.location?.origin : '';
  const params = useParams();

  const {
    register,
    reset,
    handleSubmit,
    formState: { isDirty },
  } = useForm<IFormInput>({
    defaultValues: async () => getCommunitySettings(params.community as string),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const communitySettings = await updateCommunitySettings(
      params.community as string,
      data,
    );
    reset({
      name: communitySettings?.name,
      title: communitySettings?.title,
    });
  };

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

      <SaveFormPanel show={isDirty} reset={() => reset()} />
    </form>
  );
};
