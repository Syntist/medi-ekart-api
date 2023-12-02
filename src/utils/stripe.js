import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY);

export const checkPurchase = async (course_id, uid) => {
  if (!course_id || !uid) return false;

  const invoice = await stripe.invoices.search({
    query: `status:"paid" AND metadata["course_id"]: "${course_id}" AND metadata["uid"]: "${uid}"`,
  });

  if (invoice?.data[0]?.status === "paid") return true;

  return false;
};

export const getLinkedAccount = async (email) => {
  const accounts = await stripe.accounts.list();

  let acc = accounts.data.filter((account) => account.email === email)[0];

  return acc;
};
