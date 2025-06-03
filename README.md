# Drawings

## Development

Install dependencies and start the dev server using Vite:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Legacy notes

Originally this project was served with Python's `http.server` module. The
information below is kept for reference.

- Serve: `python3 -m http.server 8321`
  - if port open, find with `sudo lsof -i :8321`
  - kill with `kill 98765` (replace with PID)

### Ideas

- export transparent canvas rectangle for easy alignment in inkscape
- colors file, with named colors for various pensets
- router where i can navigate to any drawing and variant without hardcoding
