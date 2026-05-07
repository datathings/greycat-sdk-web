import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const sectionStyle: Partial<CSSStyleDeclaration> = {
  border: '1px solid var(--sl-color-neutral-200)',
  borderRadius: '8px',
  padding: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  alignItems: 'flex-start',
};

const previewStyle: Partial<CSSStyleDeclaration> = {
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '0.5rem',
};

document.body.appendChild(
  appLayout(
    {
      title: 'Auth',
      mainStyle: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        padding: '1.5rem',
        maxWidth: '900px',
        margin: '0 auto',
      },
    },
    <section style={sectionStyle}>
      <h2>gui-auth-gate</h2>
      <p>
        Drop-in homepage replacement. Handles the OAuth callback, the authenticated
        navigation, and the sign-in form in one component. Mirrors the default
        GreyCat <code>index.html</code> behaviour.
      </p>
      <div style={previewStyle}>
        <gui-auth-gate />
      </div>
    </section>,

    <section style={sectionStyle}>
      <h2>gui-sign-in</h2>
      <p>
        Form only — username/password plus auto-detected OpenID providers. Embeddable
        anywhere; emits <code>gui-auth-success</code> so the host decides what to do
        next.
      </p>
      <div style={previewStyle}>
        <gui-sign-in
          style="max-width: 360px"
          ongui-auth-success={(ev) => console.log('signed in as', ev.detail?.name)}
        />
      </div>
    </section>,

    <section style={sectionStyle}>
      <h2>gui-sign-in-button</h2>
      <p>
        Compact button for headers / toolbars. Opens a modal with the sign-in form
        when anonymous, signs out when authenticated.
      </p>
      <div style={previewStyle}>
        <gui-sign-in-button />
      </div>
    </section>,
  ),
);
