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
import {
  deleteShareUpload,
  getShareUploadsRecipients,
  shareUpload,
} from "@/api";
import { Upload, UploadAccess } from "@/models/api";
import { Share1Icon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { usePrivateAxios } from "@/hooks";
import { useAuth } from "react-oidc-context";

export function AccessManagementDialogComponent({
  upload,
}: {
  upload: Upload;
}) {
  const auth = useAuth();
  const client = usePrivateAxios();

  const [userOrg, setUserOrg] = useState<string | null>(null);
  const [userEmailInput, setUserEmailInput] = useState<string>("");
  const [shareWithOrg, setShareWithOrg] = useState(false);

  const [accessList, setAccessList] = useState<UploadAccess[]>([]);
  const accessListUsers = accessList.filter(
    (item) => item.recipient_type === "user",
  );

  function setShares() {
    getShareUploadsRecipients({ client, uploadId: upload.id }).then((data) => {
      setAccessList(data);
      if (
        data.some(
          (item) =>
            item.recipient_type === "org" && item.recipient_id === userOrg,
        )
      ) {
        setShareWithOrg(true);
      }
    });
  }

  useEffect(() => {
    setShares();
  }, [upload.id]);

  useEffect(() => {
    if (auth.user?.profile.organization) {
      setUserOrg(Object.keys(auth.user.profile.organization)[0] as string);
    }
  }, [auth.user]);

  const addUser = () => {
    if (userEmailInput) {
      shareUpload({
        client,
        uploadId: upload.id,
        recipientId: userEmailInput,
        recipientType: "user",
      }).then(() => {
        setShares();
        setUserEmailInput("");
      });
    }
  };

  const removeAccess = (access: UploadAccess) => {
    deleteShareUpload({
      client,
      uploadId: upload.id,
      recipientId: access.recipient_id,
      recipientType: access.recipient_type,
    }).then(() => {
      setShares();
    });
  };

  const toggleOrganization = () => {
    if (userOrg) {
      if (shareWithOrg) {
        deleteShareUpload({
          client,
          uploadId: upload.id,
          recipientId: userOrg,
          recipientType: "org",
        }).then(() => {
          setShareWithOrg(!shareWithOrg);
          setShares();
        });
      } else {
        shareUpload({
          client,
          uploadId: upload.id,
          recipientId: userOrg,
          recipientType: "org",
        }).then(() => {
          setShareWithOrg(!shareWithOrg);
          setShares();
        });
      }
    }
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
            {auth.user?.profile.sub === upload.created_by.id && (
              <div className="space-y-2">
                <Label>Share access</Label>
                <div className="flex flex-col space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="User email"
                      value={userEmailInput}
                      onChange={(e) => setUserEmailInput(e.target.value)}
                      className="flex-grow"
                    />
                    <Button onClick={addUser} size="icon" className="h-10 w-10">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {userOrg && (
                    <Button
                      variant="outline"
                      className="h-10 w-full justify-start space-x-2"
                      onClick={toggleOrganization}
                    >
                      <div className="flex h-4 w-4 items-center justify-center rounded-sm border border-primary">
                        {shareWithOrg ? <Check className="h-3 w-3" /> : null}
                      </div>
                      <span>Share with {userOrg}</span>
                    </Button>
                  )}
                </div>
              </div>
            )}
            {accessListUsers.length > 0 && (
              <div>
                <h4 className="mb-2 font-medium">Current Access:</h4>
                <ul className="space-y-2">
                  {accessListUsers.map((item) => (
                    <li
                      key={item.recipient_id}
                      className="flex h-10 items-center justify-between rounded-md border px-3"
                    >
                      <span className="text-sm">{item.name}</span>
                      {item.recipient_id === auth.user?.profile.sub && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeAccess(item)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
