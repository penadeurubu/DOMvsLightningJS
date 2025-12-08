#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import argparse
import os
import sys
import mimetypes
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler

# Garante tipos corretos para mídia (alguns ambientes não carregam do registro)
mimetypes.add_type("video/mp4", ".mp4")
mimetypes.add_type("video/webm", ".webm")
mimetypes.add_type("video/ogg", ".ogv")
mimetypes.add_type("audio/ogg", ".ogg")
mimetypes.add_type("application/vnd.apple.mpegurl", ".m3u8")
mimetypes.add_type("video/mp2t", ".ts")

class CORSStaticHandler(SimpleHTTPRequestHandler):
    # Acrescenta CORS em todas as respostas
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Range")
        # Expor headers úteis para players de vídeo
        self.send_header("Access-Control-Expose-Headers", "Content-Length, Content-Range, Accept-Ranges")
        super().end_headers()

    # Trata preflight
    def do_OPTIONS(self):
        self.send_response(204)  # No Content
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Range")
        self.send_header("Access-Control-Max-Age", "86400")
        self.end_headers()

    # Log simples e legível
    def log_message(self, format, *args):
        sys.stdout.write("[%s] %s - %s\n" % (self.command, self.path, format % args))

def main():
    parser = argparse.ArgumentParser(description="Servidor de arquivos estáticos com CORS")
    parser.add_argument("-p", "--port", type=int, default=8000, help="Porta do servidor (padrão: 8000)")
    args = parser.parse_args()

    # Serve a partir da pasta atual (apenas a porta é configurável)
    webroot = os.getcwd()

    server = ThreadingHTTPServer(("0.0.0.0", args.port), CORSStaticHandler)
    print(f"📁 Servindo: {webroot}")
    print(f"🚀 URL: http://localhost:{args.port}  (CTRL+C para encerrar)")

    try:
        server.serve_forever(poll_interval=0.5)
    except KeyboardInterrupt:
        print("\nEncerrando...")
    finally:
        # Encerramento limpo
        try:
            server.shutdown()
        except Exception:
            pass
        server.server_close()
        print("Servidor finalizado.")

if __name__ == "__main__":
    main()