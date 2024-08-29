import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../PaymentForm/PaymentForm';
import styles from './StripeContainer.module.css';

const stripePromise = loadStripe(
  'pk_test_51PH0yPCcBJqtuA1zCfYCqS2xbkq4EP64ZugLmCqO8s073S7nXpEyjElfQ9hMxABYJg7AswKi7Dz86fsggzx20rBL00c6zrzeJt',
);

const appearance = {
  theme: 'flat' as 'flat',
};

const elementsOptions: StripeElementsOptions = {
  appearance,
};

const StripeContainer = () => (
  <Elements stripe={stripePromise} options={elementsOptions}>
    <PaymentForm />
  </Elements>
);

export default StripeContainer;
