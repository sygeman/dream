import React from 'react';
import { useFormik } from 'formik';
import { useCommunityQuery, useCreateChannelMutation } from '@dream/types';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import clsx from 'clsx';

const ValidationSchema = Yup.object().shape({
  title: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(1, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export const NewChannel = () => {
  const router = useRouter();

  const host = typeof window !== 'undefined' ? window?.location?.host : '';

  const name =
    typeof router.query?.community === 'string' && router.query?.community;

  const communityQuery = useCommunityQuery({
    variables: { name },
    skip: !name,
  });

  const community = communityQuery?.data?.community;

  const communityId = community?.id;

  const [createChannel] = useCreateChannelMutation({
    onCompleted: (data) => {
      router.push(`/${name}/${data.createChannel.name}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      createChannel({
        variables: { input: { ...values, communityId } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="text-accent text-sm">
        Title
      </label>
      <input
        id="title"
        name="title"
        type="text"
        autoFocus
        minLength={1}
        maxLength={50}
        placeholder="Awesome Channel"
        onChange={formik.handleChange}
        value={formik.values.title}
        className="bg-backgorud text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <label htmlFor="name" className="text-accent text-sm">
        <span>
          {host}/{name}/
        </span>
        <span className="text-white">{formik.values.name || 'awesome'}</span>
      </label>
      <input
        id="name"
        name="name"
        type="text"
        minLength={1}
        maxLength={50}
        placeholder="awesome"
        onChange={formik.handleChange}
        value={formik.values.name}
        className="bg-backgorud text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx('btn-primary', isError && 'cursor-not-allowed')}
        >
          Create
        </button>
      </div>
    </form>
  );
};
