import { Injectable } from '@angular/core';
import { Game } from '../models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  selectedGame$ = new BehaviorSubject<Game>(null);

  private games: Game[] =[];

  constructor() { }

}
