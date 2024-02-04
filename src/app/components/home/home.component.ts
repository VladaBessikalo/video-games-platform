import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { APIResponse, Game } from '../../models';
import { HttpService } from '../../services/http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy{
  public sort: string = '';
  public games: Array<Game> = [];
  private routeSub!: Subscription;
  private gameSub!: Subscription;

    
  constructor(
    private httpService: HttpService, 
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private gameService: GameService
) {}

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    })
  }

  searchGames(sort: string, search?: string): void {
    this.gameSub = this.httpService.getGameList(sort, search).subscribe((gameList: APIResponse<Game>) => {
      gameList.results.forEach((game) => {
        game.parent_platforms.forEach((platform) => {
          platform.platform.name = platform.platform.name.replace(/\s/g, '');
        })
      });

      this.games = gameList.results;
      console.log(this.games)
    });
  }

  openGameDetails(id: string): void {
    const selectedGame = this.games.find(game => game.id === id);
    if (selectedGame) {
      this.gameService.selectedGame$.next(selectedGame);
      this.router.navigate(['details', id]);
    }
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

}
