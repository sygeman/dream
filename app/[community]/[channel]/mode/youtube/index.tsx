"use client";
import { useState } from "react";

import { PlayQueueLayout } from "@/components/play-queue";

import { YoutubeModeAddVideoModal } from "./add-video/modal";
import { useAddVideoLink } from "./add-video/use-add-video-link";
import { ChannelYoutubeModeCurrent } from "./current/current";
import { useCurrent } from "./current/use-current";
import { ChannelYoutubeModeHistory } from "./history/history";
import { ChannelYoutubeModeQueue } from "./queue/queue";

export const ChannelYoutubeMode = () => {
  const [minimal, setMinimal] = useState(false);
  const { waitlistYoutubeAddVideoLink } = useAddVideoLink();
  const current = useCurrent();

  return (
    <PlayQueueLayout
      backgroudImageUrl={current?.cover}
      history={<ChannelYoutubeModeHistory />}
      current={
        <ChannelYoutubeModeCurrent current={current} minimal={minimal} />
      }
      queue={<ChannelYoutubeModeQueue />}
      addActionLabel="Add Video"
      addActionModalLink={waitlistYoutubeAddVideoLink}
      onMinimalContentChanged={setMinimal}
    >
      <YoutubeModeAddVideoModal />
    </PlayQueueLayout>
  );
};
