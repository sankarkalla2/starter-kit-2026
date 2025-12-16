import { useState } from "react";
import { ModalProvider } from "./modal-provider";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { IconUser } from "@tabler/icons-react";

export default function NavUserUpdate({
  user,
}: {
  user: typeof authClient.$Infer.Session.user;
}) {
  const [userName, setUserName] = useState(user.name);
  const [imgUrl] = useState("");
  const [_, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const handleProfileUdate = async () => {
    if (!userName && !imgUrl.length) return;
    setIsPending(true);
    const res = await authClient.updateUser({
      name: userName,
    });
    if (res.data?.status) {
      toast.success("Profile Updated");
    } else {
      toast.error(res.error?.message);
    }

    setIsPending(false);
    setOpen(false);
  };
  return (
    <ModalProvider
      trigger={
        <button
          className="flex w-full items-center rounded-md gap-2 cursor-pointer hover:bg-sidebar-accent px-2 py-1.5 text-xs"
          onClick={() => setOpen(true)}
        >
          <IconUser className="size-4" /> Profile
        </button>
      }
      title={"Profile"}
      description="Manage your Profile"
      onOpenChange={() => setOpen(false)}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-4 items-center w-full">
          <Label className="text-sm col-span-3">Name</Label>
          <Input
            type="text"
            value={userName}
            className="col-span-9"
            onChange={(e) => setUserName(e.target.value)}
            disabled={isPending}
          />
        </div>
        <div className="grid grid-cols-12 gap-4 items-center">
          <Label className="text-sm col-span-3">Email</Label>
          <Input
            type="email"
            value={user.email}
            className="col-span-9"
            readOnly
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleProfileUdate}
            disabled={isPending}
          >
            Save changes
          </Button>
        </DialogFooter>
      </div>
    </ModalProvider>
  );
}
