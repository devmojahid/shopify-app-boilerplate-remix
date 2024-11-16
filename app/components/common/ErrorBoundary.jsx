import { Page, Layout, Card, Text, Button } from '@shopify/polaris';

export function ErrorBoundary({ error }) {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <Card.Section>
              <Text variant="headingLg" as="h1">
                Something went wrong
              </Text>
              <Text variant="bodyMd" as="p">
                {error.message}
              </Text>
              <Button onClick={() => window.location.reload()}>
                Try again
              </Button>
            </Card.Section>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
} 