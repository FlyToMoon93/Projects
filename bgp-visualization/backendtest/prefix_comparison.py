import ipaddress
import json

# Funktion zur Berechnung des IP-Bereichs eines Präfixes
def get_ip_range(prefix):
    network = ipaddress.ip_network(prefix, strict=False)
    start_ip = int(network.network_address)  # Start-IP als Integer
    end_ip = int(network.broadcast_address)  # End-IP als Integer
    return start_ip, end_ip

# Funktion zum Prüfen der Überschneidung zwischen zwei IP-Bereichen
def ranges_overlap(range1, range2):
    start1, end1 = range1
    start2, end2 = range2
    return start1 <= end2 and start2 <= end1

# Einlesen der BGP-Daten aus Datei
def load_bgp_data(file_path):
    bgp_data = []
    print("Lade BGP-Daten...")
    with open(file_path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            parts = line.strip().split("|")
            prefix = parts[5]  # 6. Spalte enthält das Präfix
            bgp_data.append({"prefix": prefix, "range": get_ip_range(prefix), "line": line.strip()})
            if i % 1000 == 0:
                print(f"{i} BGP-Einträge geladen...")
    print("BGP-Daten vollständig geladen.")
    return bgp_data

# Einlesen der IP-Geodaten aus Datei
def load_ipmap_data(file_path):
    ipmap_data = []
    print("Lade IP-Map-Daten...")
    with open(file_path, "r", encoding="utf-8") as f:
        for i, line in enumerate(f):
            entry = json.loads(line.strip())
            prefix = entry["ip"]
            ipmap_data.append({
                "prefix": prefix,
                "range": get_ip_range(prefix),
                "geolocation": entry  # Behalte das gesamte Geolocation-Objekt
            })
            if i % 1000 == 0:
                print(f"{i} IPMap-Einträge geladen...")
    print("IP-Map-Daten vollständig geladen.")
    return ipmap_data

# Verknüpfung der BGP-Daten mit den IP-Geodaten und Zwischenspeicherung
def link_bgp_with_ipmap(bgp_data, ipmap_data, output_file):
    print("Beginne mit der Verknüpfung und Zwischenspeicherung...")

    # IP-Map-Daten nach Start-IP sortieren
    ipmap_data.sort(key=lambda x: x["range"][0])

    with open(output_file, "w", encoding="utf-8") as f:
        for i, ipmap_entry in enumerate(ipmap_data):
            ipmap_range = ipmap_entry["range"]
            match = None  # Variable für den ersten gefundenen BGP-Eintrag

            # Durchlaufe alle BGP-Daten, um den ersten Treffer zu finden
            for bgp_entry in bgp_data:
                bgp_range = bgp_entry["range"]

                if ranges_overlap(bgp_range, ipmap_range):
                    # Wenn ein Treffer gefunden wird, speichern und abbrechen
                    match = {
                        "bgp_line": bgp_entry["line"],
                        "geolocation": ipmap_entry["geolocation"]
                    }
                    break  # Beende die Schleife, um zum nächsten IP-Map-Eintrag zu gehen

            # Speichere die erste gefundene Zuordnung für die aktuelle IP-Map-Zeile
            f.write(json.dumps({
                "ipmap_entry": ipmap_entry["geolocation"],
                "match": match  # Speichert nur den ersten Treffer
            }) + "\n")

            # Ausgabe des Fortschritts alle 100 Einträge
            if i % 100 == 0:
                print(f"{i} IPMap-Einträge verarbeitet...")

    print("Verknüpfung und Zwischenspeicherung abgeschlossen.")

# Hauptprogramm
if __name__ == "__main__":
    # Dateipfade anpassen
    bgp_file_path = r"D:\Neuer Ordner\output.txt"      # Pfad zur BGP-Daten-Datei
    ipmap_file_path = r"D:\Neuer Ordner\ipmap.txt"    # Pfad zur IP-Geodaten-Datei
    output_file_path = r"D:\Neuer Ordner\data.json"   # Pfad zur Ergebnis-Datei

    # Daten laden
    bgp_data = load_bgp_data(bgp_file_path)
    ipmap_data = load_ipmap_data(ipmap_file_path)

    # Verknüpfung durchführen und Zwischenspeichern
    link_bgp_with_ipmap(bgp_data, ipmap_data, output_file_path)

    print("Verknüpfung abgeschlossen. Zwischenergebnisse gespeichert in:", output_file_path)
