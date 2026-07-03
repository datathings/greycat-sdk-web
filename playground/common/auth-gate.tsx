import '@greycat/web';

// `gui-sign-in` is registered eagerly by `@greycat/web` itself (see
// src/web/init.ts), so we can mount it here without waiting for init.

gc.sdk.onInitError((err) => {
  if (!(err instanceof gc.sdk.HttpError) || err.status !== 401) {
    return;
  }
  renderGate();
  // halt the caller - the page should never reach its render code
  return new Promise<never>(() => {});
});

function renderGate(): void {
  document.body.replaceChildren(
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 1rem;">
      <gui-auth-gate
        brand="GreyCat Playground"
        style={{ maxWidth: '360px', width: '100%' }}
        ongui-auth-success={() => location.reload()}
      />
    </div>,
  );
}
