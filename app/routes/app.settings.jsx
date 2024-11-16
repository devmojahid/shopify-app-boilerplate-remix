import { json } from '@remix-run/node';
import { useLoaderData, useFetcher } from '@remix-run/react';
import {
  Page,
  Layout,
  Card,
  FormLayout,
  TextField,
  Select,
  Button,
  Toast,
  Frame
} from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
  const { admin, session } = await authenticate.admin(request);
  
  // Fetch settings from your database
  const settings = {
    apiKey: '****',
    theme: 'default',
    notificationEmail: 'admin@example.com'
  };

  return json({ settings });
};

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  
  // Save settings logic here
  
  return json({ status: 'success' });
};

export default function SettingsPage() {
  const { settings } = useLoaderData();
  const fetcher = useFetcher();
  const [toastActive, setToastActive] = useState(false);

  const [formState, setFormState] = useState(settings);

  const handleSubmit = useCallback(() => {
    fetcher.submit(formState, { method: 'post' });
    setToastActive(true);
  }, [formState]);

  const toggleToast = useCallback(() => setToastActive(false), []);

  return (
    <Frame>
      <Page
        title="App Settings"
        primaryAction={{
          content: 'Save',
          onAction: handleSubmit,
          loading: fetcher.state === 'submitting'
        }}
      >
        <Layout>
          <Layout.Section>
            <Card>
              <Card.Section>
                <FormLayout>
                  <TextField
                    label="API Key"
                    value={formState.apiKey}
                    onChange={(value) => setFormState(prev => ({...prev, apiKey: value}))}
                    type="password"
                  />
                  
                  <Select
                    label="Theme"
                    options={[
                      {label: 'Default', value: 'default'},
                      {label: 'Dark', value: 'dark'},
                      {label: 'Light', value: 'light'}
                    ]}
                    value={formState.theme}
                    onChange={(value) => setFormState(prev => ({...prev, theme: value}))}
                  />

                  <TextField
                    label="Notification Email"
                    value={formState.notificationEmail}
                    onChange={(value) => setFormState(prev => ({...prev, notificationEmail: value}))}
                    type="email"
                  />
                </FormLayout>
              </Card.Section>
            </Card>
          </Layout.Section>
        </Layout>

        {toastActive && (
          <Toast
            content="Settings saved successfully"
            onDismiss={toggleToast}
            duration={4000}
          />
        )}
      </Page>
    </Frame>
  );
} 