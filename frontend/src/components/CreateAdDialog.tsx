import { useState } from "react";
import { useMutation, useQuery, useSubscription } from "@apollo/client/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CREATE_AD } from "@/graphql/ads/ads.mutation";
import { GET_CATEGORIES } from "@/graphql/category/category.queries";
import { Ad_ADDED } from "@/graphql/ads/ads.subscription";
import { gql } from "@apollo/client";

export function CreateAdDialog() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const { data: categories } = useQuery(GET_CATEGORIES);
  const [createAd, { loading }] = useMutation(CREATE_AD, {
    onCompleted: () => {
      setOpen(false);
      setTitle("");
      setDescription("");
      setPrice("");
      setCategoryId("");
    },
  });

  useSubscription(Ad_ADDED, {
    onData: ({ client, data }) => {
      const newAd = data?.data?.adAdded;
      if (!newAd) return;

      client.cache.modify({
        fields: {
          ads(existing = []) {
            const newAdRef = client.cache.writeFragment({
              data: newAd,
              fragment: gql`
                fragment NewAd on Ad {
                  id
                  title
                  description
                  price
                  owner {
                    id
                    email
                    role
                  }
                  category {
                    id
                    name
                  }
                }
              `,
            });

            return [newAdRef, ...existing];
          },
        },
      });
    },
  });

  const handleSubmit = async () => {
    await createAd({
      variables: {
        input: {
          title,
          description,
          price: Number(price),
          categoryId,
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Ad</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Ad</DialogTitle>
          <DialogDescription>
            Fill in the details below to publish a new advertisement.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Ad title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Ad description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories?.categories.map((cat: any) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? "Creating..." : "Create Ad"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
