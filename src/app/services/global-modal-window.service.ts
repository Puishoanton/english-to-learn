import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IModalState {
  visible: boolean,
  component?: Type<any>
  data?: any
}

@Injectable({
  providedIn: 'root'
})
export class GlobalModalWindowService {
  private modalState = new BehaviorSubject<IModalState>({ visible: false })
  public modalState$ = this.modalState.asObservable()

  public open(component: Type<any>, data?: any) {
    this.modalState.next({ visible: true, component, data })
  }

  public close() {
    this.modalState.next({ visible: false })
  }
}
