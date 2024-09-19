import { useEffect, useState } from "react";
import { X, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getShareUploadsRecipients, shareUpload } from "@/api";
import { useAuth } from "react-oidc-context";
import { UploadAccess } from "@/models/api";
import { Share1Icon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";


export function AccessManagementDialogComponent({
  uploadId,
}: {
  uploadId: number;
}) {
  const [org] = useState<string | null>("murmurmur");
  const [accessList, setAccessList] = useState<UploadAccess[]>([]);

  const auth = useAuth();
  useEffect(() => {
    // console.log(auth.user?.profile.organization)
    // if (auth.user?.profile.organization) {
    //   let orgnz = auth.user?.profile.organization as Map<string, any>;
    //   setOrg(orgnz.entries().next().value);
    // }
    
    getShareUploadsRecipients({ auth, uploadId }).then((data) => {
      setAccessList(data);
    });
  }, [auth, uploadId]);

  const [userEmail, setUserEmail] = useState("");
  const [shareWithOrg, setShareWithOrg] = useState(false);

  const addUser = () => {
    if (
      userEmail &&
      !accessList.some((item) => item.recipient_id === userEmail)
    ) {
      shareUpload({
        auth,
        uploadId,
        recipientId: userEmail,
        recipientType: "user",
      }).then(() => {
        setAccessList((prev) => [
          ...prev,
          {
            recipient_id: userEmail,
            recipient_type: "user",
            upload_id: uploadId,
          },
        ]);
      });
    }
  };

  const toggleOrganization = () => {
    setShareWithOrg((prev) => !prev);
  };

  const removeAccess = (id: string) => {
    setAccessList((prev) => prev.filter((item) => item.recipient_id !== id));
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Share1Icon className="mr-2 h-4 w-4" /> Share
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage Upload Access</DialogTitle>
            <DialogDescription>
              Add users or share with your organization.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Share access</Label>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <Input
                    placeholder="User email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="flex-grow"
                  />
                  <Button onClick={addUser} size="icon" className="h-10 w-10">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {org ?
                <Button
                  variant="outline"
                  className="h-10 w-full justify-start space-x-2"
                  onClick={toggleOrganization}
                >
                  <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                    {shareWithOrg ? <Check className="h-3 w-3" /> : null}
                  </div>
                  <span>Share with {org}</span>
                </Button>
                : <></>}
              </div>
            </div>
            <div>
              <h4 className="mb-2 font-medium">Current Access:</h4>
              <ul className="space-y-2">
                {accessList.map((item) => (
                  <li
                    key={item.id}
                    className="flex h-10 items-center justify-between rounded-md border px-3"
                  >
                    <span className="text-sm">{item.recipient_id}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeAccess(item.recipient_id)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
