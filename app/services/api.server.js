import { authenticate } from '../shopify.server';

export class ShopifyService {
  constructor(admin) {
    this.admin = admin;
  }

  async createProduct(productData) {
    const response = await this.admin.graphql(
      `mutation createProduct($input: ProductInput!) {
        productCreate(input: $input) {
          product {
            id
            title
          }
          userErrors {
            field
            message
          }
        }
      }`,
      {
        variables: {
          input: productData,
        },
      }
    );

    return response.json();
  }

  async updateProduct(productId, productData) {
    // Implementation
  }

  async deleteProduct(productId) {
    // Implementation
  }
}

export class SettingsService {
  static async getSettings(session) {
    // Implementation to fetch settings from database
  }

  static async updateSettings(session, settings) {
    // Implementation to update settings
  }
} 