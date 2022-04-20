import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/model/app.model';
import { MessageActions } from 'src/app/store/actions/app.action';
import { MessageSelectors } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {
  positionX = 9600;
  positionY = 9300;
  private startContainerPositionX = 0;
  private startContainerPositionY = 0;
  private startMousePositionX = 0;
  private startMousePositionY = 0;
  private startMouseMessagePositionX = 0;
  private startMouseMessagePositionY = 0;
  isCanvasMove = false;
  isElementMove = false;
  messagesArray!: Observable<IMessage[]>;
  isOpenedSidenav = false;
  isOpenedAdd = false;
  messageId = "";

  constructor(private messages: Store) {
    this.messagesArray = this.messages.select(MessageSelectors.messages);
  }

  ngOnInit(): void {
  }

  mouseDown(pointEvent: any){
    if(this.isElementMove == false){
      this.startContainerPositionX = this.positionX;
      this.startContainerPositionY = this.positionY;
      this.startMousePositionX = pointEvent.clientX;
      this.startMousePositionY = pointEvent.clientY;
      this.isCanvasMove = true;
    }
  }

  mouseUp(pointEvent: any){
    this.startMousePositionX = 0;
    this.startMousePositionY = 0;
    this.isCanvasMove = false;
  }

  mouseMove(mouseEvent: MouseEvent){
    if(this.isCanvasMove){
      const zpx = mouseEvent.clientX - this.startMousePositionX;
      const zpy = mouseEvent.clientY - this.startMousePositionY;
      this.positionX = this.startContainerPositionX - zpx;
      this.positionY = this.startContainerPositionY - zpy;
    }
  }
  
  messageMouseDown(mouseEvent: MouseEvent){
    this.isElementMove = true;
    this.startMouseMessagePositionX = mouseEvent.clientX;
    this.startMouseMessagePositionY = mouseEvent.clientY;
  }

  messageMouseUp(mouseEvent: MouseEvent){
    this.isElementMove = false;
    this.startMouseMessagePositionX = 0;
    this.startMouseMessagePositionY = 0;
  }

  messageMouseMove(mouseEvent: MouseEvent, msgID: string){
    if(this.isElementMove){
      let mzpx = mouseEvent.clientX - this.startMouseMessagePositionX;
      let mzpy = mouseEvent.clientY - this.startMouseMessagePositionY;
      this.messages.dispatch(MessageActions.moveMessage({x:mzpx,y:mzpy,id:msgID}))
      this.startMouseMessagePositionX = mouseEvent.clientX;
      this.startMouseMessagePositionY = mouseEvent.clientY;
    }
  }

  addElement(){
    this.isOpenedAdd = !this.isOpenedAdd;
  }

  doubleClick(id:string){
    this.isOpenedSidenav = true;
    this.messages.dispatch(MessageActions.setTargetMessage({id}))
  }
}
