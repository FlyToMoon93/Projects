from flask import Flask, send_from_directory, jsonify
from flask_socketio import SocketIO
import os
import json

app = Flask(__name__, static_folder=r'D:\Java\Projects\bgp-visualization\bgp-frontend\build', static_url_path='')
app.config['SECRET_KEY'] = 'geheim'
socketio = SocketIO(app, async_mode='threading')

# Funktion zum Auflisten der Inhalte des Verzeichnisses
def list_directory_contents(directory):
    try:
        contents = os.listdir(directory)
        print(f"Inhalte des Verzeichnisses '{directory}': {contents}")
    except FileNotFoundError:
        print(f"Das Verzeichnis '{directory}' wurde nicht gefunden.")
    except Exception as e:
        print(f"Fehler beim Auflisten des Verzeichnisses: {e}")

# Funktion zum Einlesen der IP-Daten aus der `ipmap`-Datei
def parse_geoip_file(file_path):
    routes = []
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            for line in file:
                data = json.loads(line)
                routes.append(data)
    except FileNotFoundError:
        print(f"Die Datei {file_path} wurde nicht gefunden.")
    except json.JSONDecodeError:
        print(f"Fehler beim Dekodieren der JSON-Daten in {file_path}.")
    except Exception as e:
        print(f"Ein Fehler ist aufgetreten: {e}")
    return routes

# Funktion zum Sammeln der `ipmap`-Daten
def parse_all_routes():
    all_routes = {"ipmap": []}
    base_path = './'
    list_directory_contents(base_path)

    file_name = 'ipmap.txt'
    file_path = os.path.join(base_path, file_name)
    all_routes["ipmap"] = parse_geoip_file(file_path)

    return all_routes

# React-Frontend bereitstellen
@app.route('/')
def serve_react_app():
    return send_from_directory(app.static_folder, 'index.html')

# Weitere Routen für statische Dateien
@app.route('/<path:path>')
def serve_static_files(path):
    return send_from_directory(app.static_folder, path)

# Beispiel für eine API-Route
@app.route('/api/routes')
def get_routes():
    routes = parse_all_routes()
    return jsonify(routes)

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    # Sende alle Routen auf einmal als ein einziges JSON-Objekt
    routes = parse_all_routes()
    socketio.emit('all_routes', routes)  # Senden der Routen an den Client
    print("Alle Routen wurden als eine Nachricht gesendet.")

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=3000)
