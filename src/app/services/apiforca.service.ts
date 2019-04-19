import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { JogoStatus, Play } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class ApiforcaService {
  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  public set(form: any): Observable<any> {
    return this.http.post<any>(this.API + 'novoJogo/', form, {headers: this.getHeader(), observe: 'response'});
  }

  public play(form: any): Observable<HttpResponse<Play>> {
    return this.http.post<any>(this.API + 'letra/', form, {headers: this.getHeader(), observe: 'response'});
  }

  public getStatus(): Observable<HttpResponse<JogoStatus>> {
    return this.http.get<any>(this.API + 'jogoStatus/', {headers: this.getHeader(), observe: 'response'});
  }

  public getTentativasRestantes(): Observable<HttpResponse<JogoStatus>> {
    return this.http.get<any>(this.API + 'tentativasRestantes/', {headers: this.getHeader(), observe: 'response'});
  }

  private getHeader(): HttpHeaders | { [header: string]: string | string[] } {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
  }

}
