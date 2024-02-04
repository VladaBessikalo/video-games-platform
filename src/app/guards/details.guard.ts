import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { GameService } from '../services/game.service';

@Injectable({
  providedIn: 'root'
})
export class DetailsGuard implements CanActivate {

  constructor(private router: Router, private gameService: GameService) {}

  canActivate(): boolean {
    const selectedGame = this.gameService.selectedGame$.value;
    
    if (selectedGame) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}