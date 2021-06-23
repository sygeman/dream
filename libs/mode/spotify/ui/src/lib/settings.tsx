import React from 'react';
import { RadioGroup } from '@headlessui/react';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDotCircle } from '@fortawesome/free-regular-svg-icons';
import { useFormik } from 'formik';
import {
  useSpotifyModeQuery,
  useUpdateSpotifyModeMutation,
} from '@dream/types';
import { SaveFormPanel } from '@dream/components/save-form';
import clsx from 'clsx';
import { strategies } from './strategies';
import { useCommunityChannel } from '@dream/community';

const ValidationSchema = Yup.object().shape({
  strategy: Yup.string().required('Required'),
});

export const ChannelSpotifyModeSettings = () => {
  const { channel } = useCommunityChannel();

  const spotifyModeQuery = useSpotifyModeQuery({
    variables: { channelId: channel?.id },
    skip: !channel?.id,
  });
  const [updateSpotifyModeMutation] = useUpdateSpotifyModeMutation({
    onCompleted: (data) => {
      formik.resetForm({
        values: {
          strategy: data?.updateSpotifyMode?.strategy,
        },
      });
    },
  });

  const spotifyMode = spotifyModeQuery?.data?.spotifyMode;
  const strategy = spotifyMode?.strategy;

  const formik = useFormik({
    initialValues: {
      strategy,
    },
    enableReinitialize: true,
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      updateSpotifyModeMutation({
        variables: { input: { ...values, channelId: channel?.id } },
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="flex w-full mb-2">
        <RadioGroup
          className="w-full"
          value={formik.values.strategy}
          onChange={(v) => formik.setFieldValue('strategy', v)}
        >
          <RadioGroup.Label className="text-accent text-xs">
            Strategy
          </RadioGroup.Label>
          <div className="flex flex-col w-full">
            {strategies.map((strategy) => (
              <RadioGroup.Option key={strategy.id} value={strategy.value}>
                {({ checked }) => (
                  <div className="flex w-full rounded my-1 bg-background hover:bg-background-light cursor-pointer">
                    <div className="px-4 flex items-center">
                      <FontAwesomeIcon
                        icon={checked ? faDotCircle : faCircle}
                        className={clsx(
                          'h-5 w-5',
                          checked ? 'text-white' : 'text-accent opacity-80'
                        )}
                      />
                    </div>
                    <div className="py-2">
                      <RadioGroup.Label as="div" className="text-sm">
                        {strategy.name}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="div"
                        className="text-xs text-accent opacity-80"
                      >
                        {strategy.description}
                      </RadioGroup.Description>
                    </div>
                  </div>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
      </div>

      <SaveFormPanel show={formik.dirty} reset={() => formik.resetForm()} />
    </form>
  );
};
