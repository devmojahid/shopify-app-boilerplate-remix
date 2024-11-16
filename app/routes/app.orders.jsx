import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import {
  Page,
  Layout,
  Card,
  DataTable,
  Text,
  EmptyState,
  Badge,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Fetch orders using GraphQL with correct fields
  const response = await admin.graphql(
    `#graphql
      query {
        orders(first: 10) {
          edges {
            node {
              id
              name
              displayFulfillmentStatus
              totalPriceSet {
                shopMoney {
                  amount
                  currencyCode
                }
              }
              createdAt
              customer {
                firstName
                lastName
              }
            }
          }
        }
      }
    `
  );

  const data = await response.json();
  
  return json({
    orders: data.data.orders.edges.map(({ node }) => node)
  });
};

export default function Orders() {
  const { orders } = useLoaderData();

  const getFulfillmentStatusColor = (status) => {
    const statusMap = {
      FULFILLED: 'success',
      UNFULFILLED: 'warning',
      PARTIALLY_FULFILLED: 'info',
      RESTOCKED: 'critical',
    };
    return statusMap[status] || 'default';
  };

  const rows = orders.map((order) => [
    order.name,
    `${order.totalPriceSet.shopMoney.amount} ${order.totalPriceSet.shopMoney.currencyCode}`,
    <Badge status={getFulfillmentStatusColor(order.displayFulfillmentStatus)}>
      {order.displayFulfillmentStatus.toLowerCase().replace(/_/g, ' ')}
    </Badge>,
    new Date(order.createdAt).toLocaleDateString(),
    order.customer ? `${order.customer.firstName} ${order.customer.lastName}` : 'No customer data'
  ]);

  return (
    <Page>
      <TitleBar title="Orders" />
      <Layout>
        <Layout.Section>
          <Card>
            {orders.length > 0 ? (
              <DataTable
                columnContentTypes={["text", "text", "text", "text", "text"]}
                headings={["Order", "Total", "Status", "Date", "Customer"]}
                rows={rows}
              />
            ) : (
              <EmptyState
                heading="No orders found"
                image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
              >
                <p>When you receive orders, they will appear here</p>
              </EmptyState>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 