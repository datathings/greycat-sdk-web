import '@greycat/web';
import '@/common';

await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Nav">
    <sl-alert slot="main-header" variant="warning" open>
      The links in the below tree are placeholders, there are not linking to anything
    </sl-alert>
    <gui-nav
      value={[
        {
          label: 'Home',
          route: '../..',
        },
        {
          label: 'Getting Started',
          route: 'getting-started',
          link: true,
          children: [
            {
              label: 'Products',
              route: 'products',
            },
            {
              label: 'Installation',
              route: 'installation',
            },
            {
              label: 'Hello World',
              route: 'hello-world',
            },
          ],
        },
        {
          label: 'Concepts',
          route: 'concepts',
          expanded: true,
          children: [
            {
              label: 'Syntax',
              route: 'syntax',
            },
            {
              label: 'Control-Flow',
              route: 'control-flow',
            },
            {
              label: 'Types',
              route: 'types',
            },
            {
              label: 'Nodes',
              route: 'nodes',
            },
            {
              label: 'Ownership',
              route: 'ownership',
            },
          ],
        },
        {
          label: 'Project',
          route: 'project',
          children: [
            {
              label: 'Module',
              route: 'module',
            },
            {
              label: 'Test',
              route: 'test',
            },
            {
              label: 'Server',
              route: 'server',
            },
            {
              label: 'IDE',
              route: 'ide',
            },
            {
              label: 'Explorer',
              route: 'explorer',
            },
          ],
        },
        {
          label: 'Features',
          route: 'features',
          children: [
            {
              label: 'CSV',
              route: 'csv',
            },
            {
              label: 'CSV Analysis',
              route: 'csv-analysis',
            },
            {
              label: 'GCB',
              route: 'gcb',
            },
            {
              label: 'Json',
              route: 'json',
            },
            {
              label: 'Text',
              route: 'text',
            },
            {
              label: 'FileWalker',
              route: 'filewalker',
            },
            {
              label: 'Table',
              route: 'table',
            },
            {
              label: 'ProgressTracker',
              route: 'progresstracker',
            },
            {
              label: 'Network',
              route: 'network',
            },
            {
              label: 'Log',
              route: 'log',
            },
            {
              label: 'Permission',
              route: 'permission',
            },
            {
              label: 'Task',
              route: 'task',
            },
            {
              label: 'Periodic',
              route: 'periodic',
            },
            {
              label: 'Random',
              route: 'random',
            },
            {
              label: 'Windows',
              route: 'windows',
            },
            {
              label: 'Gaussian',
              route: 'gaussian',
            },
            {
              label: 'Histogram',
              route: 'histogram',
            },
            {
              label: 'GaussianProfile',
              route: 'gaussianprofile',
            },
            {
              label: 'Quantizer',
              route: 'quantizer',
            },
            {
              label: 'Buffer',
              route: 'buffer',
            },
            {
              label: 'Tensor',
              route: 'tensor',
            },
          ],
        },
        {
          label: 'Advanced',
          route: 'advanced',
          children: [
            {
              label: 'Algebra',
              route: 'algebra',
            },
            {
              label: 'FFT',
              route: 'fft',
            },
            {
              label: 'SQL',
              route: 'sql',
            },
            {
              label: 'KMeans',
              route: 'kmeans',
            },
            {
              label: 'Web App',
              route: 'web-app',
            },
          ],
        },
        {
          label: '@greycat/web',
          route: 'greycat-web',
          expanded: true,
          children: [
            {
              label: 'gui-value',
              route: 'gui-value',
            },
            {
              label: 'gui-object',
              route: 'gui-object',
            },
            {
              label: 'gui-table',
              route: 'gui-table',
            },
            {
              label: 'gui-chart',
              route: 'gui-chart',
            },
            {
              label: 'gui-heatmap',
              route: 'gui-heatmap',
            },
            {
              label: 'gui-searchable-select',
              route: 'gui-searchable-select',
            },
            {
              label: 'gui-dashboard',
              route: 'gui-dashboard',
            },
            {
              label: 'gui-donut',
              route: 'gui-donut',
            },
          ],
        },
        {
          label: 'SDK',
          route: 'sdk',
          children: [
            {
              label: 'js',
              route: 'js',
            },
            {
              label: 'web',
              route: 'web',
            },
            {
              label: 'python',
              route: 'python',
            },
            {
              label: 'java',
              route: 'java',
            },
          ],
        },
        {
          label: 'Deployment',
          route: 'deployment',
          children: [
            {
              label: 'Packaging',
              route: 'packaging',
            },
            {
              label: 'Authentication',
              route: 'authentication',
            },
            {
              label: 'External SSO',
              route: 'external-sso',
            },
          ],
        },
        {
          label: 'Libraries',
          route: 'libraries',
          expanded: true,
          children: [
            {
              label: 'Basic_C',
              route: 'basic_c',
            },
            {
              label: 'Beanstalk',
              route: 'beanstalk',
            },
            {
              label: 'UserAgent',
              route: 'useragent',
            },
            {
              label: 'OPC UA',
              route: 'opc-ua',
            },
            {
              label: 'SQL',
              route: 'sql',
            },
          ],
        },
        {
          label: 'Changelog',
          route: 'changelog',
          children: [
            {
              label: 'Core',
              route: 'core',
            },
            {
              label: 'Explorer',
              route: 'explorer',
            },
          ],
        },
      ]}
    />
  </app-layout>,
);
