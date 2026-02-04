import { GET_ADS } from "@/graphql/ads/ads.queries";
import { Ad_ADDED } from "@/graphql/ads/ads.subscription";
import { useQuery, useSubscription } from "@apollo/client/react";

export function Ads() {
  const { data, subscribeToMore } = useQuery(GET_ADS, {
    variables: { page: 1, limit: 10 },
  });

  useSubscription(Ad_ADDED, {
    onData: ({ data: subData }) => {
      const newAd = subData.data.adAdded;
      if (!data.ads.find((ad: any) => ad.id === newAd.id)) {
        data.ads.unshift(newAd);
      }
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Ads</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.ads.map((ad: any) => (
          <div
            key={ad.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="font-semibold text-lg">{ad.title}</h2>
            <p className="text-gray-500">{ad.description}</p>
            <p className="mt-2 font-bold">₹{ad.price}</p>
            <p className="text-sm text-gray-400">By {ad.owner.email}</p>
            <p className="text-sm text-gray-400">
              Category: {ad.category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
