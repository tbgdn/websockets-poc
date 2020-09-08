package com.tbgdn.poc.websockets.marco;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class MarcoWebSocketConfiguration implements WebSocketConfigurer {

  @Override
  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
    registry
        .addHandler(marcoWebSocketHandler(), "/websocket/marco")
        .setAllowedOrigins("*");
    registry
        .addHandler(marcoWebSocketHandler(), "/sockjs/marco")
        .setAllowedOrigins("*")
        .withSockJS();
  }

  @Bean
  public MarcoWebSocketHandler marcoWebSocketHandler() {
    return new MarcoWebSocketHandler();
  }
}
