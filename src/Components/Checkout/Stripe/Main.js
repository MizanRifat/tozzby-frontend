import React,{useEffect} from "react";
import ReactDOM from "react-dom";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import SplitForm from "./SplitForm";


const stripePromise = loadStripe("pk_test_51GuKLVDkImmDuu4ZdHlgrluBdfj1f5kTfVIQtx80HQaPE4SZ69vlLgGGDiOqdlGkG6zIcqJhGn6oyOGDez4BWBbF00GRz2ZbFw  ");


export default function Main(){
  useEffect(() => {
    window.scrollTo(0, 0)
}, []);
  return (
      <Elements stripe={stripePromise}>
        <SplitForm />
      </Elements>
  );
};

