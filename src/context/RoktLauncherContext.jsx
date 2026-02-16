import { createContext, useContext, useEffect, useState } from 'react';

const ROKT_SCRIPT_ID = 'rokt-launcher';
const ROKT_SCRIPT_LOAD_TIMEOUT_MS = 10000;

const RoktLauncherContext = createContext(null);

const getRoktGlobal = () => window.Rokt ?? window.rokt ?? null;

const waitForRoktLauncher = () =>
  new Promise((resolve, reject) => {
    const roktScript = document.getElementById(ROKT_SCRIPT_ID);

    if (!roktScript) {
      reject(new Error('Rokt launcher script tag was not found.'));
      return;
    }

    const tryResolve = () => {
      const roktGlobal = getRoktGlobal();
      if (roktGlobal?.createLauncher) {
        cleanup();
        resolve(roktGlobal);
      }
    };

    const onScriptError = () => {
      cleanup();
      reject(new Error('Rokt launcher script failed to load.'));
    };

    const timeoutId = window.setTimeout(() => {
      cleanup();
      reject(new Error('Timed out waiting for Rokt launcher script.'));
    }, ROKT_SCRIPT_LOAD_TIMEOUT_MS);

    const intervalId = window.setInterval(tryResolve, 100);

    const cleanup = () => {
      window.clearTimeout(timeoutId);
      window.clearInterval(intervalId);
      roktScript.removeEventListener('load', tryResolve);
      roktScript.removeEventListener('error', onScriptError);
    };

    roktScript.addEventListener('load', tryResolve);
    roktScript.addEventListener('error', onScriptError);
    tryResolve();
  });

function RoktLauncherContextProvider({ children, accountId, sandbox }) {
  const [launcher, setLauncher] = useState(null);

  useEffect(() => {
    let isMounted = true;
    let createdLauncher = null;

    const initializeLauncher = async () => {
      try {
        const roktGlobal = await waitForRoktLauncher();
        const nextLauncher = await roktGlobal.createLauncher({
          accountId,
          sandbox
        });

        if (!isMounted) {
          nextLauncher.terminate();
          return;
        }

        createdLauncher = nextLauncher;
        setLauncher(nextLauncher);
      } catch (error) {
        console.error('Failed to initialize Rokt launcher', error);
      }
    };

    initializeLauncher();

    return () => {
      isMounted = false;
      setLauncher(null);

      if (createdLauncher) {
        createdLauncher.terminate();
      }
    };
  }, [accountId, sandbox]);

  return <RoktLauncherContext.Provider value={launcher}>{children}</RoktLauncherContext.Provider>;
}

const useRoktLauncher = () => useContext(RoktLauncherContext);

export { RoktLauncherContextProvider, useRoktLauncher };
