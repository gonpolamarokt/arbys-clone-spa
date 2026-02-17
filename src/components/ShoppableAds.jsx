import React from "react";
import ExperienceConfirmationPage from "./ExperienceConfirmationPage";
import { getRoktLauncher } from "../rokt/launcher";

function ShoppableAds({ order, onCreateAnotherOrder, onHideUI, onShowUI }) {
  // Start in "ads" only when there's a fresh order; otherwise skip straight to confirmation
  const [phase, setPhase] = React.useState(order ? "ads" : "confirmation");
  const selectionRef = React.useRef(null);

  // Ads phase: hide header. Confirmation phase: show header.
  React.useEffect(() => {
    if (phase === "ads") {
      onHideUI?.();
    } else {
      onShowUI?.();
    }
    return () => onShowUI?.();
  }, [phase]);

  // Initialize Rokt placement only once we're on the confirmation page
  React.useEffect(() => {
    if (phase !== "confirmation" || !order) return;
    let cancelled = false;

    async function run() {
      try {
        const launcher = await getRoktLauncher();
        if (cancelled) return;

        const selection = await launcher.selectPlacements({
          identifier: "RociAftersell",
          attributes: {
            email: order?.customer?.email,
            firstname: order?.customer?.firstName,
            lastname: order?.customer?.lastName,
            paymentMethod: order?.customer?.paymentMethod,
            billingzipcode: order?.customer?.zipcode,
            confirmationref: order?.orderId,
          },
        });

        const placement = Array.isArray(selection)
          ? selection[0]
          : selection?.placements?.[0] ?? selection;

        if (placement?.createPlacement && !cancelled) {
          await placement.createPlacement("rokt-placeholder");
        }

        selectionRef.current = placement ?? selection;
      } catch (error) {
        if (!cancelled) {
          console.error('Failed to initialize Rokt placement "RociAftersell"', error);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
      if (selectionRef.current?.close) {
        selectionRef.current.close();
        selectionRef.current = null;
      }
    };
  }, [phase, order]);

  const handleDismiss = () => setPhase("confirmation");

  // Ads phase: fullscreen offer with accept/dismiss buttons
  if (phase === "ads") {
    return (
      <div className="ads-overlay">
        <div className="ads-offer-card">
          <p className="eyebrow">Special Offer</p>
          <h1>Enjoy 20% Off Your Next Order!</h1>
          <p>
            As a thank you for your purchase, we'd like to offer you an exclusive
            discount on your next visit to El Rocinante.
          </p>
          <div className="ads-offer-actions">
            <button className="btn btn-primary" onClick={handleDismiss}>
              Accept Offer
            </button>
            <button className="btn btn-secondary" onClick={handleDismiss}>
              Dismiss Offer
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Confirmation phase: normal confirmation page with Rokt placements
  return (
    <ExperienceConfirmationPage
      order={order}
      bannerText="This was the Shoppable Ads experience"
      unstyledExperienceBanner={true}
      unstyledFooter={true}
      afterConfirmationContent={
        <rokt-thank-you loader="/loader.gif" id="rokt_thank_you_container">
          <div id="rokt-placeholder"></div>
        </rokt-thank-you>
      }
      onCreateAnotherOrder={onCreateAnotherOrder}
    />
  );
}

export default ShoppableAds;
