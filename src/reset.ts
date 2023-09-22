const theme = document.documentElement.getAttribute('data-theme');
if (theme === null) {
  // if no theme defined, default to 'dark'
  // this is mainly because PicoCSS is 'light' by default, and we want 'dark' by default
  // no matter the user-defined 'color-scheme'
  document.documentElement.setAttribute('data-theme', 'dark');
}