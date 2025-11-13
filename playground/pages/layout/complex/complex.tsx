import { svg, toggleTheme } from '@greycat/web';
import '~/common';
import './styles.css';
import LogoIcon from './logo.svg?raw';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  <app-layout title="Layout • Complex">
    <gui-layout breakpoint={920}>
      <a slot="header" className="logo" href="/pages/layout/complex.html">
        {svg(LogoIcon)}
      </a>
      <sl-button slot="header" variant="text" onclick={toggleTheme}>
        Light / Dark
      </sl-button>

      <div slot="navigation" className="list">
        <sl-tree selection="leaf">
          <sl-tree-item>
            Getting Started
            <sl-tree-item>Products</sl-tree-item>
            <sl-tree-item>Installation</sl-tree-item>
            <sl-tree-item>Hello World</sl-tree-item>
          </sl-tree-item>
          <sl-divider />
          <sl-tree-item>
            Concepts
            <sl-tree-item>Syntax</sl-tree-item>
            <sl-tree-item>Control-Flow</sl-tree-item>
            <sl-tree-item>Types</sl-tree-item>
            <sl-tree-item>Nodes</sl-tree-item>
            <sl-tree-item>Ownership</sl-tree-item>
          </sl-tree-item>
          <sl-divider />
          <sl-tree-item>
            Project
            <sl-tree-item>Module</sl-tree-item>
            <sl-tree-item>Test</sl-tree-item>
            <sl-tree-item>Server</sl-tree-item>
            <sl-tree-item>IDE</sl-tree-item>
            <sl-tree-item>Explorer</sl-tree-item>
          </sl-tree-item>
        </sl-tree>
      </div>

      <div slot="main-header" className="bottom-shadow">
        <sl-breadcrumb>
          <sl-breadcrumb-item>Catalog</sl-breadcrumb-item>
          <sl-breadcrumb-item>Clothing</sl-breadcrumb-item>
          <sl-breadcrumb-item>Women's</sl-breadcrumb-item>
          <sl-breadcrumb-item>Shirts &amp; Tops</sl-breadcrumb-item>
        </sl-breadcrumb>
      </div>
      <div slot="main">
        <h1>Lorem Ipsum Page</h1>

        <p>
          Lorem ipsum dolor sit amet, <a href="#">consectetur adipiscing elit</a>. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. <strong>Duis aute irure dolor</strong> in reprehenderit in voluptate
          velit esse cillum dolore eu fugiat nulla pariatur.
        </p>

        <p>
          <em>Excepteur sint occaecat cupidatat non proident</em>, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </p>

        <h2>Example List</h2>
        <ul>
          <li>Item 1: Lorem ipsum dolor</li>
          <li>Item 2: Sed ut perspiciatis unde</li>
          <li>Item 3: Nemo enim ipsam voluptatem</li>
        </ul>

        <p>
          At vero eos et accusamus et <a href="https://example.com">iusto odio dignissimos</a>{' '}
          ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.
        </p>

        <ol>
          <li>First Step: Lorem ipsum dolor sit amet.</li>
          <li>Second Step: Consectetur adipiscing elit.</li>
          <li>Third Step: Ut enim ad minim veniam.</li>
        </ol>

        <p>
          Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum
          fuga.
        </p>

        <h3>Another Section</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur <a href="#">adipiscing elit</a>. Integer nec odio.
          Praesent libero. Sed cursus ante dapibus diam.
        </p>

        <p>
          Phasellus volutpat metus eget egestas sodales. Sed pulvinar purus nec eros tincidunt, a
          dignissim eros vehicula.
        </p>

        <p>
          Donec ut nisi <a href="https://another-link.com">non metus ultrices tincidunt</a> id a
          nulla. Vivamus eget urna eget ligula aliquet fringilla.
        </p>

        <h4>Subheading Example</h4>
        <p>
          Etiam rhoncus, justo vel porttitor placerat, nisi nisi efficitur enim, vitae mollis nunc
          leo in lectus.
        </p>

        <ul>
          <li>Fusce tincidunt dui vel tellus bibendum.</li>
          <li>Aenean nec eros aliquet, sollicitudin odio id, faucibus mauris.</li>
          <li>Nulla facilisi. Maecenas in nibh sit amet nisi volutpat posuere.</li>
        </ul>

        <p>Morbi ac turpis eu ligula commodo posuere ac et risus. Suspendisse potenti.</p>

        <p>
          Vivamus consequat, <a href="#">arcu vel viverra dictum</a>, magna quam ultricies erat, vel
          tristique ipsum elit in justo.
        </p>

        <p>
          Pellentesque tincidunt, erat a <strong>venenatis fermentum</strong>, lectus sapien
          efficitur justo, sit amet ullamcorper sapien leo a mi.
        </p>

        <h2>Final Section</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec lorem ut erat venenatis
          consectetur sit amet vel metus.
        </p>

        <p>
          Curabitur vel dui eget lorem scelerisque auctor in et lorem. Integer tempor nisi quis
          lacus tempor, nec interdum sapien ultricies.
        </p>

        <p>
          Nam auctor velit sit amet est tincidunt, nec cursus orci pellentesque. Mauris non nisi
          vitae sapien facilisis porttitor sed ac sapien.
        </p>

        <p>
          Proin scelerisque magna in <a href="https://final-link.com">magna scelerisque</a>{' '}
          scelerisque.
        </p>

        <p>
          Donec vitae nisi auctor, suscipit magna sed, vulputate purus. Suspendisse efficitur erat
          quis mauris cursus accumsan.
        </p>
      </div>

      <div slot="aside">
        <sl-tree>
          <sl-tree-item expanded>
            Deciduous
            <sl-tree-item>Birch</sl-tree-item>
            <sl-tree-item expanded>
              Maple
              <sl-tree-item>Field maple</sl-tree-item>
              <sl-tree-item>Red maple</sl-tree-item>
              <sl-tree-item>Sugar maple</sl-tree-item>
            </sl-tree-item>
            <sl-tree-item>Oak</sl-tree-item>
          </sl-tree-item>

          <sl-tree-item expanded>
            Coniferous
            <sl-tree-item>Cedar</sl-tree-item>
            <sl-tree-item>Pine</sl-tree-item>
            <sl-tree-item>Spruce</sl-tree-item>
          </sl-tree-item>

          <sl-tree-item expanded>
            Non-trees
            <sl-tree-item>Bamboo</sl-tree-item>
            <sl-tree-item>Cactus</sl-tree-item>
            <sl-tree-item>Fern</sl-tree-item>
          </sl-tree-item>
        </sl-tree>
      </div>

      <div slot="footer" className="footer">
        <div style="text-align: center; font-size: 0.9em; color: var(--muted-color);">
          <p>
            &copy; 2025{' '}
            <a href="https://datathings.com" target="_blank">
              DataThings
            </a>{' '}
            - Powered by{' '}
            <a href="https://greycat.io" target="_blank">
              GreyCat
            </a>
          </p>
          <p>
            <a href="https://www.linkedin.com/company/datathings" target="_blank">
              LinkedIn
            </a>{' '}
            -{' '}
            <a href="https://hub.datathings.com/" target="_blank">
              GitLab
            </a>
          </p>
        </div>
      </div>
    </gui-layout>
  </app-layout>,
);
