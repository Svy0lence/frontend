import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Menu } from '../models/interfaces/menu.interface';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
    private menusPadreSubject = new BehaviorSubject<Menu[]>([]);
    private menusHijoSubject = new BehaviorSubject<Menu[]>([]);
  
    public menusPadre$: Observable<Menu[]> = this.menusPadreSubject.asObservable();
    public menusHijo$: Observable<Menu[]> = this.menusHijoSubject.asObservable();
  
    setMenus(menusPadre: Menu[], menusHijo: Menu[]): void {
      this.menusPadreSubject.next(menusPadre);
      this.menusHijoSubject.next(menusHijo);
    }
}