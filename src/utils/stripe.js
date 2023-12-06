import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const stripPayment = async (order) => {
  console.log(order.insuranceCompany);
  try {
    const session = await stripe.checkout.sessions.create({
      customer_email: order.userId.username,
      payment_method_types: ["card"],
      invoice_creation: {
        invoice_data: {
          metadata: {
            order_id: order._id.toString(),
          },
        },
        enabled: true,
      },
      mode: "payment",
      line_items: order.medicines.map((item) => ({
        price_data: {
          currency: "usd",
          unit_amount: order.insuranceCompany
            ? item.medicine.price * 100 - item.medicine.price * 100 * 0.2
            : item.medicine.price * 100,
          product_data: {
            name: item.medicine.name,
          },
        },
        quantity: item.quantity,
      })),

      success_url: `${process.env.APP_URL}/orders`,
    });

    return session;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const checkPurchase = async (orderId) => {
  if (!orderId) return false;

  const invoice = await stripe.invoices.search({
    query: `status:"paid" AND metadata["order_id"]: "${orderId}"`,
  });

  if (invoice?.data[0]?.status === "paid") return true;

  return false;
};
