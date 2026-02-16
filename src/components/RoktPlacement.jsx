import { useEffect } from 'react';
import { useRoktLauncher } from '../context/RoktLauncherContext';
import { createEmbeddedView } from '../lib/createEmbeddedView';

function RoktPlacement({ identifier, attributes }) {
  const launcher = useRoktLauncher();

  useEffect(() => {
    if (!launcher) {
      return undefined;
    }

    let isMounted = true;
    let activePlacement = null;

    createEmbeddedView(launcher, identifier, attributes)
      .then((placement) => {
        if (!isMounted) {
          if (typeof placement.close === 'function') {
            placement.close();
          }
          return;
        }

        activePlacement = placement;
      })
      .catch((error) => {
        if (!isMounted) {
          return;
        }

        console.error(`Failed to render Rokt placement "${identifier}"`, error);
      });

    return () => {
      isMounted = false;

      if (activePlacement && typeof activePlacement.close === 'function') {
        activePlacement.close();
      }
    };
  }, [launcher, identifier, attributes]);

  return <div id="rokt-placeholder" className="rokt-placement" />;
}

export default RoktPlacement;
