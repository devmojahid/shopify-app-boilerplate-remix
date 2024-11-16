import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  Button,
  DataTable,
  Text,
  EmptyState,
  Loading,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Fetch products using GraphQL
  const response = await admin.graphql(
    `#graphql
      query {
        products(first: 10) {
          edges {
            node {
              id
              title
              status
              totalInventory
              createdAt
            }
          }
        }
      }
    `
  );

  const data = await response.json();
  
  return json({
    products: data.data.products.edges.map(({ node }) => node)
  });
};

export default function Products() {
  const { products } = useLoaderData();

  const rows = products.map((product) => [
    product.title,
    product.status,
    product.totalInventory.toString(),
    new Date(product.createdAt).toLocaleDateString()
  ]);

  return (
    <Page>
      <TitleBar
        title="Products"
        primaryAction={{
          content: "Add product",
          onAction: () => {
            // Handle add product action
          },
        }}
      />
      <Layout>
        <Layout.Section>
          <Card>
            {products.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "numeric", "text"]}
                headings={["Title", "Status", "Inventory", "Created"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No products found"
                action={{
                  content: "Add product",
                  onAction: () => {
                    // Handle add product action
                  },
                }}
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>Add products to your store</p>
              </EmptyState>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 