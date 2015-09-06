#!/usr/bin/python

from autobahn.twisted.websocket import WebSocketServerProtocol
from autobahn.twisted.websocket import WebSocketServerFactory
import subprocess
import sys


class ros_pebble(WebSocketServerProtocol):

    def __init__(self):
        pass
        self.commands = ["motors true","takeoff", "goTo \"goal: [0, 0, 2, 0.0]\"", "goHome", "estop"]
        self.model = "/f450"

    def onConnect(self, request):
        pass

    def onOpen(self):
        pass

    def onMessage(self, payload, isBinary):
        payload_decoded = payload.decode('utf8')

        if (payload_decoded == 'ping'):
            self.sendMessage(payload, isBinary)
        else:
            payload_parsed = int(payload_decoded[2:3])
            command = "rosservice call " + self.model + "/" + self.commands[payload_parsed]
            print(command)
            return_code = subprocess.call(command, shell=True)

    def onClose(self, wasClean, code, reason):
            print("WebSocket connection closed: {0}".format(reason))

if __name__ == '__main__':
    from twisted.python import log
    from twisted.internet import reactor

    log.startLogging(sys.stdout)

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000", debug=False)
    factory.protocol = ros_pebble

    reactor.listenTCP(9000, factory)

    reactor.run()


