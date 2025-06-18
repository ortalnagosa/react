export type TupdateUser = {
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  phone: string;
  image: {
    url: string;
    alt: string;
  };
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  isAdmin?: boolean;
  isBusiness?: boolean;
};
