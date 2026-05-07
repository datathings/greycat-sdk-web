import '@greycat/web';

// Side-effect module: wraps gc.sdk.init so that an unauthenticated boot
// (the ABI download throws because /runtime::Runtime::abi requires login)
// is intercepted and replaced with a sign-in form. The page's `await
// gc.sdk.init(...)` never resolves in that case — control stays in the gate
// until the user signs in and the page reloads.
//
// `gui-sign-in` is registered eagerly by `@greycat/web` itself (see
// src/web/init.ts), so we can mount it here without waiting for init.

const origInit = gc.sdk.init;

gc.sdk.init = async function gatedInit(opts: gc.sdk.WithoutAbiOptions = {}) {
  try {
    return await origInit(opts);
  } catch (err) {
    if (!isAuthError(err)) {
      throw err;
    }
    renderGate();
    // halt the caller — the page should never reach its render code
    return new Promise<gc.sdk.GreyCat>(() => {});
  }
};

function isAuthError(err: unknown): boolean {
  if (!(err instanceof Error)) return false;
  // The SDK throws this exact prefix on a 401 from the ABI download (see
  // src/sdk/greycat.ts:168). Match loosely so other 401 paths trigger too.
  return /logged-in/i.test(err.message) || /unauthorized/i.test(err.message);
}

function renderGate(): void {
  const signIn = document.createElement('gui-sign-in');
  signIn.style.maxWidth = '360px';
  signIn.style.width = '100%';
  signIn.addEventListener('gui-auth-success', () => location.reload());

  document.body.replaceChildren(
    <div
      style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem;"
    >
      {signIn}
    </div>,
  );
}
