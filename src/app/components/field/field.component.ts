import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMessage, IRandomize } from 'src/app/model/app.model';
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
  private startRndMessagePositionX = 0;
  private startRndMessagePositionY = 0;
  isCanvasMove = false;
  isElementMove = false;
  messagesArray: Observable<IMessage[]>;
  randomizersArray: Observable<IRandomize[]>;
  isOpenedSidenav = false;
  isOpenedAdd = false;


  constructor(private messages: Store) {
    this.messagesArray = this.messages.select(MessageSelectors.messages);
    this.randomizersArray = this.messages.select(MessageSelectors.randomizers);
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
      const mzpx = mouseEvent.clientX - this.startMouseMessagePositionX;
      const mzpy = mouseEvent.clientY - this.startMouseMessagePositionY;
      this.messages.dispatch(MessageActions.moveMessage({x:mzpx,y:mzpy,id:msgID}))
      this.startMouseMessagePositionX = mouseEvent.clientX;
      this.startMouseMessagePositionY = mouseEvent.clientY;
    }
  }

  randomizerMouseDown(mouseEvent: MouseEvent){
    this.isElementMove = true;
    this.startRndMessagePositionX = mouseEvent.clientX;
    this.startRndMessagePositionY = mouseEvent.clientY;
  }

  randomizerMouseUp(mouseEvent: MouseEvent){
    this.isElementMove = false;
    this.startRndMessagePositionX = 0;
    this.startRndMessagePositionY = 0;
  }

  randomizerMouseMove(mouseEvent: MouseEvent, rndID: string){
    if(this.isElementMove){
      const mzpx = mouseEvent.clientX - this.startRndMessagePositionX;
      const mzpy = mouseEvent.clientY - this.startRndMessagePositionY;
      this.messages.dispatch(MessageActions.moveRandomize({x:mzpx,y:mzpy,id:rndID}))
      this.startRndMessagePositionX = mouseEvent.clientX;
      this.startRndMessagePositionY = mouseEvent.clientY;
      console.log(rndID);
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
