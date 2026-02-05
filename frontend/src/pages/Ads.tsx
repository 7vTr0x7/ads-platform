import { GET_ADS } from "@/graphql/ads/ads.queries";
import { useQuery } from "@apollo/client/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreateAdDialog } from "@/components/CreateAdDialog";

export function Ads() {
  const { data } = useQuery(GET_ADS, {
    variables: { page: 1, limit: 12 },
  });

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
          <Card
            key={ad.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-semibold leading-tight">
                  {ad.title}
                </h2>
                <Badge variant="secondary">{ad.category.name}</Badge>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {ad.description || "No description provided"}
              </p>

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
    </div>
  );
}
