export type Tsignup = {
  _id: string;
    name: {
        first: string;
        middle?: string;
        last: string;
    }
    phone: string;
    email: string;
    password: string;

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
    }
  isBusiness: boolean;
  isAdmin: boolean;
};
