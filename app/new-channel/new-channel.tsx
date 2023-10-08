'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { urlNameRegExp } from '@/helpers/regexp-url-name';
import { useDialogUrl } from '@/helpers/use-dialog-url';

import { createChannelAction } from './actions';

const formSchema = z.object({
  title: z.string().min(2).max(50),
  name: z.string().min(2).max(50).regex(urlNameRegExp),
});

export const NewChannelModal = () => {
  const host = typeof window === 'undefined' ? '' : window?.location?.host;
  const router = useRouter();
  const parameters = useParams();
  const dialogUrl = useDialogUrl();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const { channel } = await createChannelAction({
      community: parameters.community as string,
      ...data,
    });

    router.push(`/${parameters.community}/${channel.name}`);
  };

  return (
    <Dialog {...dialogUrl('newChannel')}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New channel</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Awesome channel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span>
                      {host}/{parameters.community}/
                    </span>
                    <span className="text-white">
                      {field.value || 'awesome'}
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="awesome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" size="sm">
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
