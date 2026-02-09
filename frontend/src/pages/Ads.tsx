"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { Pencil } from "lucide-react";

import { GET_ADS } from "@/graphql/ads/ads.queries";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { CreateAdDialog } from "@/components/CreateAdDialog";
import { EditAdDialog } from "@/components/EditAdDialog";

export function Ads() {
  const { data, loading } = useQuery(GET_ADS, {
    variables: { page: 1, limit: 12 },
  });

  const [selectedAd, setSelectedAd] = useState<any | null>(null);

  if (loading) {
    return <div className="p-8 text-muted-foreground">Loading ads...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads</h1>
          <p className="text-muted-foreground">
            Manage and monitor your advertisements
          </p>
        </div>

        <CreateAdDialog />
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {data?.ads.map((ad: any) => (
          <Card key={ad.id} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-5 space-y-3">
              {/* Title + Category + Edit */}
              <div className="flex items-start justify-between gap-2">
                <h2 className="text-lg font-semibold leading-tight line-clamp-1">
                  {ad.title}
                </h2>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{ad.category.name}</Badge>

                  <Button
                    size="icon"
                    variant="default"
                    className="h-8 w-8"
                    onClick={() => setSelectedAd(ad)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {ad.description || "No description provided"}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2">
                <span className="text-xl font-bold text-primary">
                  ₹{ad.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  by {ad.owner.email}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedAd && (
        <EditAdDialog
          ad={selectedAd}
          open={!!selectedAd}
          onOpenChange={(open) => {
            if (!open) setSelectedAd(null);
          }}
        />
      )}
    </div>
  );
}
