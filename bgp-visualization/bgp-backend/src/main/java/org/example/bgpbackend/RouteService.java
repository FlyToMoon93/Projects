package org.example.bgpbackend;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class RouteService {

    public List<Route> getAllRoutes() {
        return parseOutTxt("node103_out.txt"); // Passe den Dateipfad an
    }

    private List<Route> parseOutTxt(String filePath) {
        List<Route> routes = new ArrayList<>();
        String line;
        Pattern pattern = Pattern.compile("announced (\\S+) next-hop (\\S+)");

        try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
            while ((line = br.readLine()) != null) {
                if (line.contains("receive update announced")) {
                    Matcher matcher = pattern.matcher(line);
                    if (matcher.find()) {
                        routes.add(new Route(matcher.group(1), matcher.group(2)));
                    }
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        return routes;
    }
}
