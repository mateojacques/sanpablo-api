// import type { Core } from '@strapi/strapi';

import { Core } from "@strapi/strapi";
import { normalizeUserData } from "./utils/user";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }: { strapi: Core.Strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],

      async beforeCreate(event) {
        const { params } = event;
        if (params?.data) {
          normalizeUserData(params.data);
        }
      },
      async beforeUpdate(event) {
        const { params } = event;
        if (params?.data) {
          normalizeUserData(params.data);
        }
      },
    });
  },
};
