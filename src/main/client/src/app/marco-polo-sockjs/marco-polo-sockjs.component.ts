import {Component, OnInit} from '@angular/core';
import {interval, Subject, Subscription} from "rxjs";
import {concatMap, take, tap} from "rxjs/operators";
declare var SockJS;

@Component({
  selector: 'app-marco-polo-sockjs',
  templateUrl: './marco-polo-sockjs.component.html',
  styleUrls: ['./marco-polo-sockjs.component.css']
})
export class MarcoPoloSockjsComponent implements OnInit {
  clientMessages: Subject<string>;
  serverMessages: Subject<string>;

  subscriptions: Subscription[] = [];
  connected: boolean = false;
  private socket = undefined;

  messages: { client: string, server?: string }[] = [];

  constructor() {
  }

  ngOnInit(): void {

  }

  private initializeGame() {
    this.clientMessages = new Subject<string>();
    this.serverMessages = new Subject<string>();
    this.subscriptions.push(
      this.clientMessages
      .pipe(
        tap(message => {
          if (this.socket) {
            this.socket.send(message);
            this.messages.push({client: message});
          }
        }),
        concatMap(() => {
          return this.serverMessages
          .pipe(
            take(1)
          );
        })
      )
      .subscribe((message) => {
        let entry = this.messages.pop();
        this.messages.push({
          client: entry.client,
          server: message
        });
      })
    );
  }

  private handleOpenConnection(event): void {
    this.connected = true;
    console.log("Connection established", event);
  }

  private handleCloseConnection(event): void {
    this.connected = false;
    console.log("Connection closed", event);
  }

  private handleMessage(event): void {
    console.log("Received message:", event);
    this.serverMessages.next(event.data);
  }

  onConnectClick(): void {
    const url = "http://localhost:8080/sockjs/marco"
    this.socket = new SockJS(url);
    this.socket.onopen = this.handleOpenConnection.bind(this);
    this.socket.onclose = this.handleCloseConnection.bind(this);
    this.socket.onmessage = this.handleMessage.bind(this);
  }

  onDisconnectClick(): void {
    if (this.socket) {
      this.socket.close();
    }
  }

  onStartClick(): void {
    console.log("Start the game");
    this.initializeGame();
    this.subscriptions.push(
      interval(5000).subscribe(() => this.clientMessages.next("Marco"))
    )
  }

  onStopClick(): void {
    console.log("Reset the game");
    this.ngOnDestroy();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.subscriptions.splice(0);
    if (this.socket) {
      this.socket.close();
    }
    this.messages.splice(0);
  }

}
