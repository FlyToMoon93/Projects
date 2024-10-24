package org.example.bgpbackend;


public class Route {
    private String prefix;
    private String nextHop;

    public Route(String prefix, String nextHop) {
        this.prefix = prefix;
        this.nextHop = nextHop;
    }

    public String getPrefix() {
        return prefix;
    }

    public String getNextHop() {
        return nextHop;
    }
}
