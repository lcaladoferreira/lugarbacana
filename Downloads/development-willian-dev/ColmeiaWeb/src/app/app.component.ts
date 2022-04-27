import { Component, OnInit } from "@angular/core";
import { WebSocketService } from "src/core/services/ws/socket.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {


constructor(private wsService: WebSocketService) {}

  ngOnInit(): void {
    this.wsService.connectWS()

  }

  title = "black-dashboard-angular";

}
