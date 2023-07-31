"use client";

import React, { useMemo } from "react";
import clsx from "clsx";
import Link from "next/link";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Community } from "@prisma/client";
import { CommunityCard } from "./card";
import { useIntl } from "@/libs/intl";
import { Button } from "@/components/ui/button";

type Props = {
  communities: Community[];
  isUser: boolean;
};

export const MainCommunitiesList = ({ communities, isUser }: Props) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { formatMessage } = useIntl();

  const newCommunityLink = useMemo(() => {
    const newParams = new URLSearchParams(Array.from(searchParams.entries()));

    if (isUser) {
      newParams.set("newCommunity", "1");
    } else {
      newParams.set("authModal", "1");
    }

    return `${pathname}?${newParams?.toString()}`;
  }, [isUser, searchParams]);

  return (
    <div className="flex flex-col w-full bg-surface">
      <div className="flex flex-1 w-full overflow-hidden">
        <OverlayScrollbarsComponent className="h-full w-full">
          <div className="flex items-center mt-6 px-6">
            <div className="flex flex-col">
              <span className="text-lg">
                {formatMessage({ id: "mainTitle" })}
              </span>
              <span className="text-sm text-accent">
                {formatMessage({ id: "mainDescription" })}
              </span>
            </div>

            <Link href={newCommunityLink} passHref>
              <Button className="ml-4 h-8">
                {formatMessage({ id: "mainCreateCommunityButton" })}
              </Button>
            </Link>
          </div>
          <div
            className={clsx(
              "w-full grid auto-rows-max gap-2 justify-center overflow-y-auto",
              "grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            )}
          >
            {communities.map((community) => (
              <CommunityCard
                key={community.id}
                name={community.name}
                title={community.title}
                online={0}
              />
            ))}
          </div>
        </OverlayScrollbarsComponent>
      </div>
    </div>
  );
};
