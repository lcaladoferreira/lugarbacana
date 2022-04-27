

import { Component, OnInit, QueryList, Sanitizer, ViewChild, ViewChildren } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { catchError, map, pipe, Subject, tap } from 'rxjs';
import { Camera } from 'src/core/models/Camera';
import { CamerasService } from 'src/core/services/cameras/cameras.service';
import { WebSocketService } from 'src/core/services/ws/socket.service';
import { Cameras } from '../../../core/repositorys/Cameras';


@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  cameras: Camera[] = []
  liveData$: any
  socket$: Subject<any> = new Subject();
  @ViewChildren('video') public video: QueryList<any>
  @ViewChildren('col') public col: QueryList<any>
  constructor(private sanitizer: DomSanitizer, private camService: CamerasService, private wsService: WebSocketService) {




    //   catchError(error => { throw error }),
    //   tap({
    //     error: error => console.log('[Live component] Error:', error),
    //     complete: () => console.log('[Live component] Connection Closed')
    //   }
    //   )
    // );
    // console.log(this.liveData$)
  }



  ngOnInit() {
    // console.log('init')
    // this.liveData$ = this.camService.connectWS(this.cameras[0]).then((data) => {
    //   console.log("data")
    //   console.log(data)
    // })
    // console.log(this.socket$)
    // this.socket$ = this.wsService.socket$
    // console.log(this.socket$)

    this.cameras = []
    this.cameras = Cameras


  }
// sendFrame() {

// }
ngAfterViewInit(){

  this.camService.messages$.subscribe(message =>{
    console.log('monitor receiving message from socket')
    this.receiveFrame(message)

  })

}

receiveFrame(frame){
  console.log("cameras", this.cameras)
  console.log(frame)
this.cameras.map(c => {
  if (c.cameraId === frame.cameraId){

    c.url = frame.image

    if (frame) {
     const Card = this.col.toArray().filter(col => col.nativeElement.id == c.cameraId)[0].nativeElement
     console.log(Card)
      if (frame.quantity > 2) {
        Card.classList.add('card-alert-danger')
        Card.classList.remove('card-alert-success')
        Card.classList.remove('card-alert-warning')
      } else if (frame.quantity > 0) {
        Card.classList.remove('card-alert-danger')
        Card.classList.remove('card-alert-success')
        Card.classList.add('card-alert-warning')
      } else if (frame.quantity === 0) {
        Card.classList.remove('card-alert-danger')
        Card.classList.add('card-alert-success')
        Card.classList.remove('card-alert-warning')
      }

    }
  }
})

}
  // getReconhecimentoFacial() {
  //   this.cameras.forEach(async (c: Camera) => {



  //     // this.camService.sendImage(c).then((imgTratada) => {
  //     //   console.log("imgTratada")
  //     //   console.log(imgTratada)

  //     // })
  //     // if (c.tipo === 'video') {
  //     //   let counter = 0
  //     //   setInterval(() => {
  //     //       this.camService.getFacialRecognitionByUrl(c.url).subscribe((data: any) => {
  //     //         console.log(data)
  //     //         c.stream_image = data.image_response
  //     //       }, err => {
  //     //         c.stream_image = c.url
  //     //       })
  //     //       counter++
  //     //   }, 30000)
  //     // }
  //   })
  // }

  // arrVideos: any[]
  // arrCol: any[]
  // interval: any[] = []
  // ngAfterViewInit() {
  //   this.arrVideos = this.video.toArray()
  //   this.arrCol = this.col.toArray()
  //   console.log(this.arrCol)
  //   console.log('init View')
  //   this.arrCol.forEach(c => console.log(c.nativeElement.children[0].children[0]))
  //   let row = document.createElement('div')
  //   row.setAttribute('class', 'row')

  //   let output = document.getElementsByTagName('output')[0]

  //   output.appendChild(row)
  //   output.appendChild(document.createElement('br'))


  //   this.arrVideos.forEach(video => {
  //     const Card = this.arrCol[this.arrVideos.indexOf(video)].nativeElement.children[0]
  //     //console.log(Card)
  //     // let col = document.createElement('div')
  //     // col.setAttribute('class', 'col-md-3')
  //     let img = document.createElement('img')
  //     img.setAttribute('id', `video${this.arrVideos.indexOf(video) + 1}`)
  //     img.setAttribute('class', 'img')
  //     // let card = document.createElement('div')
  //     // card.setAttribute('class', 'card')
  //     // let cardBody = document.createElement('div')
  //     // cardBody.setAttribute('class', 'card-body')

  //     // row.append(col)
  //     // col.append(card)
  //     // card.append(cardBody)
  //     // cardBody.append(img)


  //     let base64: string = ''
  //     let canvas = document.createElement('canvas')
  //     let ctx = canvas.getContext('2d')
  //     let width = video.nativeElement.width
  //     let height = video.nativeElement.height
  //     console.log('iniciando pings')

  //       base64 = ''

  //       ctx.drawImage(video.nativeElement, width, height, 600, 400)
  //       base64 = canvas.toDataURL('image/png')
  //       // this.wsService.sendImage(img.getAttribute('id'), base64)
  //       // img.src = base64
  //       // this.wsService.sendImage(img.getAttribute('id'), base64).then(async (response : any) => {
  //       // //   // console.log('entrando sendImage')
  //       //   if (response) {
  //       //     console.log('responsed')
  //       //     let msg = response
  //       //     console.log(msg)
  //       // this.socket$.asObservable().subscribe((message) => {
  //       //   console.log('entrou no subscribe do socket$s')
  //       //   console.log(message)

  //         let msg = message
  //         let info = message.info
  //         let status = message.status

  //         if (msg) {
  //           // if (response.id == msg.msg.userID) {
  //           console.log(img.getAttribute('id'))
  //           if (img.getAttribute('id') === msg.cameraId) {
  //             // console.log('renderizando video :' + img.getAttribute('id'))

  //             if (info) {
  //               console.log(info, 'info')
  //               if (msg.quantity > 2) {
  //                 Card.classList.add('card-alert-danger')
  //                 Card.classList.remove('card-alert-success')
  //                 Card.classList.remove('card-alert-warning')
  //               } else if (msg.quantity > 0) {
  //                 Card.classList.remove('card-alert-danger')
  //                 Card.classList.remove('card-alert-success')
  //                 Card.classList.add('card-alert-warning')
  //               } else if (msg.quantity === 0) {
  //                 Card.classList.remove('card-alert-danger')
  //                 Card.classList.add('card-alert-success')
  //                 Card.classList.remove('card-alert-warning')
  //               }
  //               img.src = msg.image
  //             }
  //             // if(data.message.info.type === '')
  //           }
  //         }
  //         // } else {
  //         //   console.log('client nao confere')
  //         //   // response.connect()
  //         //   console.log(response.id)
  //         //   console.log(msg.message.msg.userID)
  //         // }
  //       })

  //       // console.log('obteve resposta do socket')
  //       // this.renderImage().subscribe(data => {
  //       // console.log('dentro do subscribe do render')

  //       })

  //     //   }).catch()
  //     // }, 250)
  //     // )
  //     // })
  //   })
  // }

  // ngOnDestroy() {
  //   this.cameras = []
  //   this.wsService.close()
  //   this.socket$.complete()
  //   this.liveData$ = null
  //   this.interval.forEach(i => {

  //     clearInterval(i)
  //   })
  //   console.log('destroyed')
  // }

  // cameraFocused: any
  // oldFocused: HTMLElement

  // changeSize(elem: HTMLElement, camera: any) {
  //   this.cameraFocused = camera

  // }

  // renderImage() {
  //   // console.log('entrou no render', this.socket$)
  //   return this.socket$.pipe(map((data) => {
  //     console.log(data)
  //     return data
  //   }))

  // }



  // dismissCamera() {
  //   this.cameraFocused = null
  // }

  // orderCameras(camera: any) {
  //   this.cameras.splice(this.cameras.indexOf(camera), 1)
  //   let ordenadas = [camera]
  //   this.cameras.forEach(c => {
  //     ordenadas.push(c)
  //   })
  //   console.log(ordenadas)
  //   this.cameras = ordenadas


  // }
  // message: string
  // messages: any[] = []
  // sendMessage() {
  //   console.log(this.message)
  //   this.wsService.sendMessage(this.message)

  //   this.messages.push(this.messages)

  // }


  // getMessages() {
  //   let message = this.wsService.getMessage()
  //   this.messages.push(message)
  // }

  // sanitize(url: string) {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  // }
}
