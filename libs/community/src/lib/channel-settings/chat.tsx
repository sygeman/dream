import React from 'react';
import * as Yup from 'yup';
import Slider from 'rc-slider';
import { useFormik } from 'formik';
import { useUpdateChannelMutation } from '@dream/types';
import { useCommunityChannel } from '../use-community-channel';
import { SaveFormPanel } from '@dream/components/save-form';
import { SwitchFormField } from '@dream/components/switch-form-field';

const ValidationSchema = Yup.object().shape({
  gifAllowed: Yup.boolean(),
  nsfw: Yup.boolean(),
});

export const ChannelSettingsChat = () => {
  const { channel, channelId, communityId } = useCommunityChannel();

  const formik = useFormik({
    initialValues: {
      gifAllowed: channel?.gifAllowed,
      nsfw: channel?.nsfw,
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateChannel({
        variables: { input: { ...values, communityId, channelId } },
      });
    },
  });

  const [updateChannel] = useUpdateChannelMutation({
    onCompleted: (data) => {
      formik.resetForm({
        values: {
          gifAllowed: data?.updateChannel?.gifAllowed,
          nsfw: data?.updateChannel?.nsfw,
        },
      });
    },
  });

  const isError = Object.keys(formik.errors).length > 0;

  const marks = {
    0: 'Off',
    5: '5s',
    10: '10s',
    15: '15s',
    30: '30s',
  };

  function log(value) {
    console.log(value); //eslint-disable-line
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="divide-surface-light divide-y">
        <SwitchFormField
          title="Allow Gif"
          description="Allow the use of gifs in chat"
          checked={formik.values.gifAllowed}
          onChange={(gifAllowed) =>
            formik.setFieldValue('gifAllowed', gifAllowed)
          }
        />
        <SwitchFormField
          title="NSFW"
          description="Users will need to confirm they are of over legal age to the
          content in this channel."
          checked={formik.values.nsfw}
          onChange={(nsfw) => formik.setFieldValue('nsfw', nsfw)}
        />
        <div className="p-2">
          <div className="text-sm text-accent">Slowmode</div>
          <div className="p-2">
            <Slider min={0} max={30} marks={marks} step={null} />
          </div>
        </div>
      </div>

      <SaveFormPanel show={formik.dirty} reset={() => formik.resetForm()} />
    </form>
  );
};
