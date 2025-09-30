import type { Schema, Struct } from '@strapi/strapi';

// Manual augmentation for the Product content-type so TS accepts the UID 'api::product.product'.
// Retira este archivo cuando Strapi regenere los tipos oficiales con este UID incluido.

export interface ApiProductProduct extends Struct.CollectionTypeSchema {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
  };
  options: { draftAndPublish: false };
  pluginOptions: {};
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Public {
    interface ContentTypeSchemas {
      'api::product.product': ApiProductProduct;
    }
  }
}
