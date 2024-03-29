import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { environment as env } from '../environment/environment';
import { APIResponse, Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  getGameList(ordering: string, search?: string): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if (search) {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }

    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, {
      params: params 
    });
  }

  getGameDetails(id: string): Observable<Game> {
    const gameInfoReq = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailerReq = this.http.get(`${env.BASE_URL}/games/${id}/movies`);
    const gameScreenshortsReq = this.http.get(`${env.BASE_URL}/games/${id}/screenshorts`);

    return forkJoin({
      gameInfoReq,
      gameTrailerReq,
      gameScreenshortsReq
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoReq'],
          screenshorts: resp['gameScreenshortsReq'].results,
          trailers: resp['gameTrailerReq'].results
        }
      })
    )
  }
}
