import React, { FormEvent, useState } from "react";
import { buttonTypeClass } from "../button/Button.tsx";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./PaymentFormStyles";
import { useDispatch, useSelector } from "react-redux";
import { selectTotalValue } from "../../store/cart/cartSelector.ts";
import { selectCurrentUser } from "../../store/user/userSelector.ts";
import { setCartItems } from "../../store/cart/cartAction.ts";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectTotalValue);
  const currentUser = useSelector(selectCurrentUser);
  const [process, setProcess] = useState(false);
  const dispatch = useDispatch();

  const PaymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcess(true);
    if (!stripe || !elements) return;

    const response = await fetch("/.netlify/functions/createPaymentIntent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => res.json());
    const {
      paymentIntent: { client_secret },
    } = response;

    const cardDetails = elements.getElement(CardElement)
    if (!cardDetails) {
      return
    }
    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });
    if (paymentResult.error) alert(paymentResult.error);
    else {
      if (paymentResult.paymentIntent.status === "succeeded") alert("Success");
    }
    setProcess(false);
    dispatch(setCartItems([]));
  };
  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={PaymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton
          disabled={amount < 1}
          isLoading={process}
          buttonType={buttonTypeClass.inverted}
        >
          Pay Now
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
