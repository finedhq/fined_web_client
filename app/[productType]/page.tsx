import React from 'react';
import { notFound } from 'next/navigation';
import { PRODUCT_ROUTES } from '@/lib/routeConfig';
import GenericProductList from '@/components/schemes/GenericProductList';

// This function generates the static params if you want static export (optional)
// It creates a path for each product type defined in PRODUCT_ROUTES: /fd, /savings, /taxsaverfd, /rd, /ppf, /nps, /unnaticard, /simplysave, /kotaksavings, /hdfcsavings, /hdfcdigisavings, /hdfcmaxsavings, /hdfcfd, /icicisavings, /icicibasicsavings, /iciciyoungsavings, /icicifd, /icicird, /kotakace, /moneyback

export function generateStaticParams() {
  return Object.keys(PRODUCT_ROUTES).map((slug) => ({
    productType: slug,
  }));
}

export default function ProductPage({ params }: { params: { productType: string } }) {
  const typeKey = params.productType as keyof typeof PRODUCT_ROUTES;
  const config = PRODUCT_ROUTES[typeKey];

  // If the URL doesn't exist in our config, show 404
  if (!config) {
    return notFound();
  }

  return (
    <GenericProductList
      dataKey={config.dataKey}
      fetchKey={config.fetchKey}
    />
  );
}