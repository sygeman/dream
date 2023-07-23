import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';
import { urlNameRegExp } from '../../../helpers/regexp-url-name';
// import { useCreateCommunityMutation } from '../community.api';

interface IFormInput {
  name: string;
  title: string;
}

export const NewCommunity = () => {
  const host = typeof window !== 'undefined' ? window?.location?.host : '';

  // const [createCommunity] = useCreateCommunityMutation({
  //   onCompleted: (data) => {
  //     router.push(`/${data.createCommunity.name}`);
  //   },
  // });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // createCommunity({
    //   variables: { input: { ...data } },
    // });
  };

  const name = watch('name');
  const isError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="text-accent text-xs">
        Title
      </label>
      <input
        {...register('title', { required: true, minLength: 1, maxLength: 50 })}
        autoFocus
        placeholder="Awesome community"
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <label htmlFor="name" className="text-accent text-sm">
        <span>{host}/</span>
        <span className="text-white">{name || 'awesome'}</span>
      </label>
      <input
        {...register('name', {
          required: true,
          minLength: 1,
          maxLength: 50,
          pattern: urlNameRegExp,
        })}
        placeholder="awesome"
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx('btn btn-primary', isError && 'cursor-not-allowed')}
        >
          Create
        </button>
      </div>
    </form>
  );
};
