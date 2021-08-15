import { useEmojisQuery } from '@dream/types';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { useCommunityChannel } from '../use-community-channel';

export const ChannelSettingsEmoji = () => {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    onDropAccepted: (files) => {
      const formData = new FormData();
      formData.append('file', files[0]);

      fetch(`https://${process.env.NEXT_PUBLIC_API}/emoji/upload`, {
        method: 'POST',
        body: formData,
      });

      console.log(files);
    },
    accept: 'image/jpeg, image/png',
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
  });

  const { communityId } = useCommunityChannel();

  const emojisQuery = useEmojisQuery({
    variables: { communityId },
    skip: !communityId,
  });

  const emojis = emojisQuery?.data?.emojis || [];
  const emojiCount = emojis.length;
  const availbleSlots = 50 - emojiCount;

  return (
    <div className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <button className="btn btn-primary" onClick={open}>
          Upload Emoji
        </button>
      </div>

      <div className="mt-8">
        <div className="py-2 text-accent text-xs uppercase">
          Emoji - {availbleSlots} slots availble
        </div>

        <table className="table-auto w-full">
          <thead>
            <tr className="text-left">
              <th className="text-xs text-accent font-normal py-2">Emoji</th>
              <th className="text-xs text-accent font-normal py-2">Alias</th>
              <th className="text-xs text-accent font-normal py-2">
                Uploaded By
              </th>
            </tr>
          </thead>
          <tbody>
            {emojis.map((emoji) => (
              <tr key={emoji.id}>
                <td className="py-2">
                  <img
                    className="w-6 h-6 object-contain"
                    src={`https://dream.sgmn.dev/emojis/${emoji.id}.gif`}
                  />
                </td>
                <td>
                  <div className="px-2 text-sm">:{emoji.alias}:</div>
                </td>
                <td>
                  <div className="px-2 flex items-center">
                    <div>
                      <img
                        src={emoji.author?.avatar}
                        className="h-6 w-6 rounded-full overflow"
                      />
                    </div>
                    <div className="px-2 text-xs text-accent">
                      {emoji.author?.name}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
