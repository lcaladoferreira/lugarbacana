import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cameras } from '../../repositorys/Cameras'
import { Camera } from '../../models/Camera'
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, EMPTY, map, Subject, switchAll, tap } from 'rxjs';
import { io } from 'socket.io-client';
import { WebSocketService } from '../ws/socket.service';

const WS_ENDPOINT = environment.VPS_CONNECTION

@Injectable({
  providedIn: 'root'
})
export class CamerasService {


  private socket$: WebSocketSubject<any>;
  private messagesSubject$ = this.wsService.socket$;
  public messages$ = this.messagesSubject$.asObservable().pipe(map(a=>a), catchError(e => { throw e }));

  constructor(private http: HttpClient, private wsService: WebSocketService) {

    this.messagesSubject$ = wsService.socket$
  }

  // connectWS() {
  //   console.log("camera service calling wsService")
  //   return this.wsService.connectWS()
  // }

  // async sendImage(cameraId: string,img : string) {
  //   console.log('enviar imagem')
  //   return this.wsService.sendImage(cameraId, img)
  // }

  getFacialRecognitionByUrl(url: string) {
    // let httpOptions =
    // {
    //   headers: new HttpHeaders({
    //     "Access-Control-Allow-Origin": "*",
    //     "Content-Type": "application/json"
    //   })
    // }

    // let body = {
    //   url: url,
    //   type: 'stream'
    // }

    // //
    // return this.http.get(`/api/facial_recognition/facial_recognition?type=stream&url=${url}`)


  }

  createCamera(url: string) {
    let camera: Camera = {
      url: url,
      clientId: 12,
      tipo: 'stream',
      lojaId: 10
    }

    return Cameras.push(camera)
  }


}
