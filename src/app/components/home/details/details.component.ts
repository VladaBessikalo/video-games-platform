import { Component } from '@angular/core';
import { GameService } from '../../../services/game.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  gameRating = Number(this.gameService.selectedGame$.value.metacritic);
  
  constructor(
    public gameService: GameService
  ) {}

  getColor(gameRating: number): string {
    if (gameRating > 75) {
      return '#5ee432';
    } else if (gameRating > 50) {
      return '#fffa50';
    } else if (gameRating > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
}
