import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import { NavMenu } from "@shopify/app-bridge-react";
import { boundary } from "@shopify/shopify-app-remix/server";
import polarisStyles from "@shopify/polaris/build/esm/styles.css";
import { authenticate } from "../shopify.server";

export const links = () => [{ rel: "stylesheet", href: polarisStyles }];

export const loader = async ({ request }) => {
  await authenticate.admin(request);
  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();

  const primaryNavigation = [
    {
      label: 'Home',
      destination: '/app',
    },
    {
      label: 'Products',
      destination: '/app/products',
    },
    {
      label: 'Orders',
      destination: '/app/orders',
    },
    {
      label: 'Analytics',
      destination: '/app/analytics',
    },
    {
      label: 'Settings',
      destination: '/app/settings',
    },
  ];

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <NavMenu>
        {primaryNavigation.map((item) => (
          <Link 
            key={item.destination} 
            to={item.destination}
            rel={item.destination === '/app' ? 'home' : undefined}
          >
            {item.label}
          </Link>
        ))}
      </NavMenu>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
