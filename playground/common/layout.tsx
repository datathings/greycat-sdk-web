export type LayoutHeaderProps = {
  homePath: string;
  items: string[];
};

export function LayoutHeader({ homePath, items }: LayoutHeaderProps) {
  return (
    <gui-layout-header slot="header">
      <sl-breadcrumb>
        <sl-breadcrumb-item>
          <sl-button variant="text" href={homePath}>
            @greycat/web
          </sl-button>
        </sl-breadcrumb-item>
        {items.map((name) => (
          <sl-breadcrumb-item>{name}</sl-breadcrumb-item>
        ))}
      </sl-breadcrumb>
      <sl-icon-button
        slot="action"
        name="sun"
        label="Toggle theme"
        style="font-size: 1.5rem"
        onclick={function () {
          if (this.name === 'sun') {
            this.name = 'moon';
            document.documentElement.classList.add('sl-theme-light');
            document.documentElement.classList.remove('sl-theme-dark');
          } else {
            this.name = 'sun';
            document.documentElement.classList.remove('sl-theme-light');
            document.documentElement.classList.add('sl-theme-dark');
          }
        }}
      />
    </gui-layout-header>
  );
}

export type LayoutMenuProps = {
  current: string;
};

export function LayoutMenu({ current }: LayoutMenuProps) {
  return (
    <gui-layout-menu slot="menu">
      <sl-button variant="text">
        <sl-icon slot="prefix" name="house-door" className={{ active: current === '' }} />
        Link 1
      </sl-button>
      <sl-button variant="text">
        <sl-icon slot="prefix" name="sliders" />
        Link 2
      </sl-button>
      <sl-button variant="text">
        <sl-icon slot="prefix" name="diagram-3" />
        Link 3
      </sl-button>
      <sl-divider />
      <sl-button variant="text">Link 4</sl-button>
      <sl-button variant="text">Link 5</sl-button>
    </gui-layout-menu>
  );
}
