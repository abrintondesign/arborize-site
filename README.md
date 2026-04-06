# Arborize site repo setup

This version has been broken into a simpler static repo structure:

```text
arborize-repo-setup/
  index.html
  assets/
    css/styles.css
    js/main.js
    img/
  components/
    header.html
    footer.html
```

## Notes

- `index.html` now loads the header and footer with a small fetch-based include loader in `assets/js/main.js`.
- All inline CSS was moved to `assets/css/styles.css`.
- All inline JavaScript was moved to `assets/js/main.js`.
- Image paths now point to `assets/img/`.
- The repo is ready for GitHub + Cloudflare Pages as a static site.

## Important

Because the header and footer are now external HTML partials, the site should be served through a local server or web host. Opening `index.html` directly from the filesystem can block `fetch()` in some browsers.
