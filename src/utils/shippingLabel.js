/* eslint-disable camelcase */
import axios from "axios";

const ship_from = {
  name: "John Doe",
  company_name: "Example Corp",
  phone: "555-555-5555",
  address_line1: "4009 Marathon Blvd",
  city_locality: "Austin",
  state_province: "TX",
  postal_code: "78756",
  country_code: "US",
  address_residential_indicator: "no",
};

export const generateShippingLabel = async (ship_to) => {
  try {
    const label = await axios.post(
      "https://api.shipengine.com/v1/labels",
      {
        shipment: {
          service_code: "ups_ground",
          ship_to,
          ship_from,
          packages: [
            {
              weight: {
                value: 20,
                unit: "ounce",
              },
              dimensions: {
                height: 6,
                width: 12,
                length: 24,
                unit: "inch",
              },
            },
          ],
        },
      },
      {
        headers: {
          "API-Key": process.env.SHIPENGINE_API_KEY,
        },
      },
    );

    return label.data;
  } catch (error) {
    throw new Error(error);
  }
};
