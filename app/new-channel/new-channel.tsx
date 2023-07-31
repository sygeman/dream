import clsx from "clsx";
import { useForm, SubmitHandler } from "react-hook-form";
import { urlNameRegExp } from "@/helpers/regexp-url-name";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createChannelAction } from "./actions";

interface IFormInput {
  name: string;
  title: string;
}

export const NewChannel = () => {
  const origin = typeof window !== "undefined" ? window?.location?.origin : "";
  const params = useParams();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const { channel } = await createChannelAction({
      community: params.community as string,
      ...data,
    });

    router.push(`/${params.community}/${channel.name}`);
  };

  const isError = Object.keys(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="title" className="text-accent text-xs">
        Title
      </label>
      <input
        autoFocus
        {...register("title", { required: true, minLength: 1, maxLength: 50 })}
        placeholder="Awesome Channel"
        className="bg-background text-white text-xs p-2 rounded w-full focus:outline-none focus:ring-1 mb-2"
      />

      <div className="flex items-center mb-2">
        <label htmlFor="name" className="text-accent text-xs">
          {origin}/{params.community}/
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

      <div className="flex w-full justify-end mt-2">
        <button
          type="submit"
          disabled={isError}
          className={clsx("btn btn-primary", isError && "cursor-not-allowed")}
        >
          Create
        </button>
      </div>
    </form>
  );
};
