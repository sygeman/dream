import React from 'react';
import { useFormik } from 'formik';
import { useIntl } from 'react-intl';
import { useCreateCommunityMutation } from '@dream/types';
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

export const NewCommunity = () => {
  const router = useRouter();
  const intl = useIntl();
  const host = typeof window !== 'undefined' ? window?.location?.host : '';

  const [createCommunity] = useCreateCommunityMutation({
    onCompleted: (data) => {
      router.push(`/${data.createCommunity.name}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      title: '',
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      createCommunity({
        variables: { input: { ...values } },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title" className="text-accent text-xs">
        {intl.formatMessage({ id: 'newCommunityTitleLabel' })}
      </label>
      <input
        id="title"
        name="title"
        type="text"
        autoFocus
        minLength={1}
        maxLength={50}
        placeholder={intl.formatMessage({ id: 'newCommunityTitlePlaceholder' })}
        onChange={formik.handleChange}
        value={formik.values.title}
        className="bg-backgorud text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <label htmlFor="name" className="text-accent text-sm">
        <span>{host}/</span>
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
          className={clsx('btn btn-primary', isError && 'cursor-not-allowed')}
        >
          {intl.formatMessage({ id: 'newCommunityCreateButton' })}
        </button>
      </div>
    </form>
  );
};
