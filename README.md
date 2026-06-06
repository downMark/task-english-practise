# English Practice

A lightweight four-page English learning web app built with `Next.js App Router` and `Tailwind CSS`.

## Features

- Practice page with task switching, browser TTS playback, and per-word Chinese tooltip meanings
- Daily Reading page with featured article cards and quick jump into practice
- Listening Center with TTS-backed audio previews and local activity tracking
- Progress page with streak, totals, and a recent activity heatmap
- Browser `localStorage` persistence for recent task, reading completion, listening history, and session activity

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

Default port is `3000`. Set `PORT` when needed:

```bash
PORT=4000 npm start
```

## Project Structure

- `app/`: routes and page layout
- `components/`: shared UI building blocks
- `data/`: static content and shared types
- `hooks/`: browser state and TTS hooks
- `lib/`: tokenization, streak, and local storage helpers

## Browser Notes

- Speech playback uses the browser `Web Speech API`.
- On unsupported browsers, the UI degrades gracefully and keeps reading/progress features available.
- Desktop supports hover vocabulary tooltips; mobile uses tap to show and tap outside to close.

## AWS EC2 Deployment Notes

1. Install Node.js 22 on the EC2 instance.
2. Copy the project to the server.
3. Install dependencies and build:

```bash
npm install
npm run build
```

4. Run the app with a process manager or `systemd`.
5. Reverse proxy traffic from Nginx to the Next.js port.

Example Nginx server block:

```nginx
server {
  listen 80;
  server_name your-domain.com;

  location / {
    proxy_pass http://127.0.0.1:3000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

Example `systemd` unit:

```ini
[Unit]
Description=English Practice Next.js app
After=network.target

[Service]
Type=simple
WorkingDirectory=/srv/english-practice
ExecStart=/usr/bin/npm start
Restart=always
Environment=NODE_ENV=production
Environment=PORT=3000

[Install]
WantedBy=multi-user.target
```
