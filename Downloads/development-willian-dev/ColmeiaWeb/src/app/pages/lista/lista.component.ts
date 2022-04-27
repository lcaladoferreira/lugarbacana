import { Component, OnInit } from '@angular/core';
import { Camera } from 'src/core/models/Camera';
import { Cameras } from 'src/core/repositorys/Cameras';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  cameras: Camera[]

  constructor() { }

  ngOnInit(): void {
    this.cameras = Cameras.filter(c => c)
  }

}
