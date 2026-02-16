import React from "react";
import ExperienceConfirmationPage from './ExperienceConfirmationPage';
import { getRoktLauncher } from "../rokt/launcher";

export default function Dashboard({ order }) {
  const selectionRef = React.useRef(null);

  React.useEffect(() => {
    let cancelled = false;
    if (!order) return;

    async function run() {
      const launcher = await getRoktLauncher();
      if (cancelled) return;

      const selection = await launcher.selectPlacements({
        identifier: "RociConf",
        attributes: {
          email: order?.customer?.email,
          firstname: order?.customer?.firstName,
          lastname: order?.customer?.lastName,
          paymentMethod: order?.customer?.paymentMethod,
          billingzipcode: order?.customer?.zipcode,
          confirmationref: order?.orderId,
        },
      });

      selectionRef.current = selection;
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
        bannerText="This was the Rokt Thanks experience"
      />
    )
  }
