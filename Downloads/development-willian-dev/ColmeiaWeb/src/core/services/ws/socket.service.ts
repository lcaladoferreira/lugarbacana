import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Camera } from 'src/core/models/Camera';
// import  * as nodeMediaServer from 'node-media-server';





const wsEndpoint = environment.VPS_CONNECTION

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private socket: io.Socket;
    public socket$: Subject<any> = new Subject();
    public messages$: Subject<any> = new Subject();
    private messages: Array<any>;
    constructor(private http: HttpClient) {
        // this.iniServerSocket()

    }

    conectRMTP(){

        this.http.get('rmtp://localhost:3000').pipe(map(() => {
            console.log("conectado")
        })
        )
    }

    async connectWS() {
        this.conectRMTP()
        console.log("connecting ws")
        var socket: any
        return await this.getNewWebSocket().then((socket: io.Socket) => {
            this.socket = socket
            console.log("conected ws")
            console.log(socket)


            socket.on('message', (message) => {
                console.log('recebendo msg')
                this.sendMessage('msg recebida pelo client ' + socket.id)
                console.log(message)
            })
            socket.on('image', (socket) => {
                console.log('recebendo image', socket)
                this.mandarPraComponent(socket)

            })
            socket.on("person", (data) => {
              console.log("person", data.quantity);
              this.mandarPraComponent(data);
              console.log(data);
            });
            // socket.on('disconnect', socket => {
            //     socket = null
            // })
            return socket
        })

    }

    getMessage() {
        this.socket$.next(this.socket)
    }

    async getNewWebSocket() {
        let ws
        // console.log("this.socket")
        // console.log(this.socket)
        // if (!this.socket) {
        ws = io.io(wsEndpoint)
        // console.log("new ws")
        // console.log(ws)
        // }else{
        //     console.log("reconnect old ws")
        //     ws = this.socket.connect()
        // }

        return ws
    }


    mandarPraComponent(socket : any){
        console.log(socket)
        this.socket$.next(socket)
    }

    sendMessage(msg: any) {
        this.socket.emit('message', msg);
    }


    async sendImage(cameraId : string, img: string) {
        let msg = {
            userID: this.socket.id,
            cameraId: cameraId,
            img: img
        }
       return this.socket.emit('image', { msg });
    }


    close() {
        // console.log('fechando ws')
        this.socket.emit('close', 'client desconectado')
        this.socket.close()
        // console.log('ws fechado')
        console.log(this.socket)
    }


}
