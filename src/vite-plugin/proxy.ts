import { request as httpRequest } from 'http';
import { request as httpsRequest } from 'https';
import { IncomingMessage, ServerResponse } from 'http';

export function proxy(req: IncomingMessage, res: ServerResponse, target: string) {
  const url = new URL(req.url!, target);
  const isHttps = url.protocol === 'https:';
  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname + url.search,
    method: req.method,
    headers: { ...req.headers, host: url.host },
  };

  const proxy = (isHttps ? httpsRequest : httpRequest)(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode!, proxyRes.headers);
    proxyRes.pipe(res);
  });

  proxy.on('error', (err) => {
    console.error(err);
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    req.pipe(proxy);
  } else {
    proxy.end();
  }
}
