// Configuración de plugins
// Añadimos configuración de registro para users-permissions (Strapi v5)
// Docs: https://docs.strapi.io/cms/features/users-permissions#registration-configuration
// allowedFields: lista blanca de campos adicionales que el endpoint /auth/local/register
// aceptará además de los básicos (username, email, password).
// NOTA: No exponemos campos de control interno (orderCount, lastOrderDate, confirmed, blocked, role)
// ni el campo derivado fullName (lo calculamos en lifecycle) para evitar inconsistencias.

export default ({ env }) => ({
  "users-permissions": {
    config: {
      register: {
        allowedFields: [
          "firstName",
          "lastName",
          "fullName",
          "phone",
          "addresses",
          "defaultShippingAddressIndex",
          "defaultBillingAddressIndex",
          "metadata",
        ],
      },
    },
  },
  // ...
});
