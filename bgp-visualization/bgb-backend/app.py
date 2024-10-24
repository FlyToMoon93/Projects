from flask import Flask, send_from_directory
from flask_socketio import SocketIO, emit
import time
import re

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.config['SECRET_KEY'] = 'geheim'
socketio = SocketIO(app, async_mode='eventlet')

# Funktion zum Parsen der Datei
def parse_out_txt(file_path):
    routes = []
    with open(file_path, 'r') as file:
        for line in file:
            if "receive update announced" in line:
                match = re.search(r'announced (\S+) next-hop (\S+)', line)
                if match:
                    route = {
                        "prefix": match.group(1),
                        "next_hop": match.group(2),
                        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S", time.gmtime()),
                        "anomaly": "6939" in line  # Beispiel für Anomalie: AS-Nummer 6939
                    }
                    routes.append(route)
    return routes

# Route, um die React-App auszuliefern
@app.route('/')
def index():
    return send_from_directory(app.static_folder, 'index.html')

# Fallback für alle anderen Routen (für den React-Router)
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

@socketio.on('connect')
def handle_connect():
    emit('message', {'data': 'Verbunden mit Flask-SocketIO!'})

    while True:
        routes_103 = parse_out_txt('node103_out.txt')
        routes_104 = parse_out_txt('node104_out.txt')

        # Kombiniere und sende die Routen-Updates
        for route in routes_103 + routes_104:
            socketio.emit('route_update', route)
            time.sleep(2)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8088)
