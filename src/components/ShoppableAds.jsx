import React from "react";
import ExperienceConfirmationPage from './ExperienceConfirmationPage';
import { getRoktLauncher } from "../rokt/launcher";

function ShoppableAds({ order, onCreateAnotherOrder }) {
  const selectionRef = React.useRef(null);
  const afterConfirmationContent = order ? (
    <rokt-thank-you loader="/loader.gif" id="rokt_thank_you_container">
      <div id="rokt-placeholder"></div>
    </rokt-thank-you>
  ) : null;

  React.useEffect(() => {
    let cancelled = false;
    if (!order) return;

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
  }, [order]);

  return (
    <ExperienceConfirmationPage
      order={order}
      bannerText="This was the Shoppable Ads experience"
      unstyledExperienceBanner={true}
      unstyledFooter={true}
      afterConfirmationContent={afterConfirmationContent}
      onCreateAnotherOrder={onCreateAnotherOrder}
    />
  );
}

export default ShoppableAds;
