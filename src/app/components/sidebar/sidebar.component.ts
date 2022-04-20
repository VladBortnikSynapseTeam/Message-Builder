import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IMessage } from 'src/app/model/app.model';
import { MessageSelectors } from 'src/app/store/selectors/app.selector';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  targetMessage: Observable<IMessage>
  constructor(private store$: Store) {  
    this.targetMessage = store$.select(MessageSelectors.targetMessage);
   }

  ngOnInit(): void {
  }

}
