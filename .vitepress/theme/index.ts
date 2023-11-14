// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress/client';
import DefaultTheme from 'vitepress/theme';
import './style.css';
import './gcl-highlight.css';

const theme: Theme = {
  extends: DefaultTheme,
};

export default theme;
