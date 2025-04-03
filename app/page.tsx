import { Button } from "@/components/ui/button";
import { GamepadIcon } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  return (
    <div className="size-full flex items-center justify-center absolute gap-2">
      <Button asChild variant="outline">
        <Link href="/games">
          <GamepadIcon className="size-4 mr-2" /> Игры
        </Link>
      </Button>
    </div>
  );
}

export const revalidate = 0;
