const ROKT_ACCOUNT_ID = "3124855958037380433";

let launcherPromise = null;

export function getRoktLauncher() {
  if (launcherPromise) return launcherPromise;

  launcherPromise = new Promise((resolve, reject) => {
    const maxWaitMs = 15000;
    const start = Date.now();

    function tick() {
      if (window?.Rokt?.createLauncher) {
        try {
          const launcher = window.Rokt.createLauncher({
            accountId: ROKT_ACCOUNT_ID,
            sandbox: "true",
          });
          resolve(launcher);
        } catch (e) {
          reject(e);
        }
        return;
      }

      if (Date.now() - start > maxWaitMs) {
        reject(
          new Error(
            "Rokt launcher script did not load in time. Check index.html script include and reload."
          )
        );
        return;
      }

      setTimeout(tick, 50);
    }

    tick();
  });

  return launcherPromise;
}

export function resetRoktLauncherForDebug() {
  launcherPromise = null;
}