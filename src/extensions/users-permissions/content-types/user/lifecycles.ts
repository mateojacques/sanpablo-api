// Lifecycle hooks for the extended User content-type
// (Removed type import because @strapi/strapi in v5 no expone 'Lifecycle' como tipo individual)
const userLifecycle = {
  async beforeCreate(event) {
    const { params } = event;
    if (params?.data) {
      normalize(params.data);
    }
  },
  async beforeUpdate(event) {
    const { params } = event;
    if (params?.data) {
      normalize(params.data);
    }
  }
};

function normalize(data: any) {
  if (data.email) data.email = String(data.email).toLowerCase().trim();
  if (data.firstName) data.firstName = capitalizeWords(data.firstName);
  if (data.lastName) data.lastName = capitalizeWords(data.lastName);
  if (!data.username && data.email) {
    data.username = data.email; // mantener username = email por simplicidad
  }
  if (data.firstName || data.lastName) {
    data.fullName = [data.firstName, data.lastName].filter(Boolean).join(' ');
  }
  if (Array.isArray(data.addresses)) {
    // asegurar un solo default shipping y billing
    let foundShipping = false;
    let foundBilling = false;
    data.addresses = data.addresses.map((addr: any) => {
      if (addr.isDefaultShipping) {
        if (foundShipping) addr.isDefaultShipping = false; else foundShipping = true;
      }
      if (addr.isDefaultBilling) {
        if (foundBilling) addr.isDefaultBilling = false; else foundBilling = true;
      }
      return addr;
    });
  }
}

function capitalizeWords(input: string): string {
  return input
    .toLowerCase()
    .split(/\s+/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default userLifecycle;
