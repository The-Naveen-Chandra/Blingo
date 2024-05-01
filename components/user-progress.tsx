import Link from "next/link";
import Image from "next/image";

import { Button } from "./ui/button";

type Props = {
  activeCourse: { imageSrc: string; title: string }; // TODO: Replace with DB types
  hearts: number;
  points: number;
  hasActiveSubscription: boolean;
};

export const UserProgress = ({
  hearts,
  points,
  activeCourse,
  hasActiveSubscription,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-2">
      <Link href={"/courses"}>
        <Button variant={"ghost"}>
          <Image
            src={activeCourse.imageSrc}
            alt={activeCourse.title}
            className="rounded-md border"
            width={32}
            height={32}
          />
        </Button>
      </Link>
      <Link href={"/shop"}>
        <Button variant={"ghost"} className="text-orange-500">
          <Image width={28} height={28} src={"/points.svg"} alt="Points" />
        </Button>
      </Link>
    </div>
  );
};
