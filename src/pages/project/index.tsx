export const VITE_CONFIG = `\`\`\`ts
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  build: {
    outDir: "build"
  },
  plugins: [tsConfigPaths()]
});
\`\`\``;

export const NGINX = `\`\`\` server {
  listen       80;
  server_name luoyunlai.xyz;
  rewrite ^/(.*) https://$server_name$request_uri? permanent;
}


server {
  #   listen 443 ssl;
      listen 443 ssl http2;
      server_name luoyunlai.xyz;
      ssl_certificate 1_luoyunlai.xyz_bundle.crt;
      ssl_certificate_key 2_luoyunlai.xyz.key;
      ssl_session_timeout 5m;

      ssl_protocols TLSv1.2 TLSv1.3;

      ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
      ssl_prefer_server_ciphers on;
}
\`\`\``;
