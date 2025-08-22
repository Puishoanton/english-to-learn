import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModalProps } from '../models/modal-props.interface';

interface IModalState<T> {
  visible: boolean,
  component?: Type<any>
  props?: IModalProps<T>
}

@Injectable({
  providedIn: 'root'
})
export class GlobalModalWindowService<T> {
  private modalState = new BehaviorSubject<IModalState<T>>({ visible: false })
  public modalState$ = this.modalState.asObservable()

  public open(component: Type<any>, props?: IModalProps<T>) {
    this.modalState.next({ visible: true, component, props })
  }

  public close() {
    this.modalState.next({ visible: false })
  }
}
