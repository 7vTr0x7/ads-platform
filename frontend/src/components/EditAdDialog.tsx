import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_AD } from "@/graphql/ads/ads.mutation";
import { gql, type Reference } from "@apollo/client";

export function EditAdDialog({
  ad,
  open,
  onOpenChange,
}: {
  ad: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [title, setTitle] = useState(ad.title);
  const [description, setDescription] = useState(ad.description);
  const [price, setPrice] = useState(ad.price);

  const [updateAd] = useMutation<{ adUpdated: any }>(UPDATE_AD);

  const updateAdHandler = async () => {
    try {
      await updateAd({
        variables: {
          id: ad.id,
          input: { title, description, price: Number(price) },
        },
        update: (cache, { data }) => {
          if (!data?.adUpdated) return;

          const updatedAd = data?.adUpdated;

          cache.modify({
            fields: {
              ads(existing = []) {
                return existing.map((adRef: Reference) => {
                  const id = cache.readFragment({
                    id: adRef.__ref,
                    fragment: gql`
                      fragment AdId on Ad {
                        id
                      }
                    `,
                  });

                  return id === updatedAd.id
                    ? cache.writeFragment({
                        data: updatedAd,
                        fragment: gql`
                          fragment UpdateAd on Ad {
                            id
                            title
                            description
                            price
                            category {
                              id
                              name
                            }
                            owner {
                              id
                              email
                            }
                          }
                        `,
                      })
                    : adRef;
                });
              },
            },
          });
        },
      });
    } catch (error) {
      console.log("failed to update ad");
    } finally {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Ad</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={4}
          />

          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={updateAdHandler}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
