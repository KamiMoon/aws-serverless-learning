/**
 * Proxy used to get around local docker issues.
 * Use this to directly go from external mobile device to ip of mac laptop running docker.
 *
 * React native app can't get to ipaddress:3000
 * Use ipadress:8000 instead
 *
 */
const http = require("http");
const httpProxy = require("http-proxy");

const URL_TO_PROXY = "http://localhost:3000";
const NEW_PORT = 8000;

httpProxy.createProxyServer({ target: URL_TO_PROXY }).listen(NEW_PORT);

console.log(`Proxy server running for ${URL_TO_PROXY} on port ${NEW_PORT}`);

console.log("Local ip addresses: ");

var os = require("os");
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
        if ("IPv4" !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }

        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ":" + alias, iface.address);
        } else {
            // this interface has only one ipv4 adress
            console.log(ifname, iface.address);
        }
        ++alias;
    });
});
