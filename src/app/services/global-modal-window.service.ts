import { Component, Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModalProps } from '../models/modal-props.interface';

interface IModalState {
  visible: boolean,
  component?: Type<any>
  props?: IModalProps
}

@Injectable({
  providedIn: 'root'
})
export class GlobalModalWindowService {
  private modalState = new BehaviorSubject<IModalState>({ visible: false })
  public modalState$ = this.modalState.asObservable()

  public open<T>(component: Type<any>, props?: IModalProps) {
    this.modalState.next({ visible: true, component, props })
  }

  public close() {
    this.modalState.next({ visible: false })
  }
}
