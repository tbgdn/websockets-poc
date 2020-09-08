package com.tbgdn.poc.websockets.marco;

import java.util.concurrent.TimeUnit;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.AbstractWebSocketHandler;

@Slf4j
public class MarcoWebSocketHandler extends AbstractWebSocketHandler {

  @Override
  protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
    log.info("Received: {}", message.getPayload());
    TimeUnit.SECONDS.sleep(2);
    session.sendMessage(new TextMessage("Polo!"));
  }

  @Override
  public void afterConnectionEstablished(WebSocketSession session) {
    log.info("Connected to session: {}", session.getId());
  }

  @Override
  public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
    log.info("Disconnected from session: {}", session.getId());
  }
}
