import { json } from "@remix-run/node";
import {
  Page,
  Layout,
  Card,
  Text,
  BlockStack,
  Grid,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  
  // Fetch analytics data here
  return json({
    stats: {
      totalSales: "$12,345",
      totalOrders: 123,
      averageOrderValue: "$100.37",
      conversionRate: "2.5%"
    }
  });
};

export default function Analytics() {
  return (
    <Page>
      <TitleBar title="Analytics" />
      <Layout>
        <Layout.Section>
          <Grid>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Total Sales</Text>
                  <Text as="p" variant="headingLg">$12,345</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Total Orders</Text>
                  <Text as="p" variant="headingLg">123</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Average Order Value</Text>
                  <Text as="p" variant="headingLg">$100.37</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, sm: 3, md: 3, lg: 3 }}>
              <Card>
                <BlockStack gap="200">
                  <Text as="h2" variant="headingMd">Conversion Rate</Text>
                  <Text as="p" variant="headingLg">2.5%</Text>
                </BlockStack>
              </Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 