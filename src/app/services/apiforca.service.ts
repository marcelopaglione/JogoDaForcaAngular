import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiforcaService {
  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  public set(form: any): Observable<any> {
    return this.http.post<any>(this.API + 'novoJogo/', form, this.getHeader());
  }

  public play(form: any): Observable<any> {
    return this.http.post<any>(this.API + 'letra/', form, this.getHeader());
  }

  public getStatus(): Observable<any> {
    return this.http.get<any>(this.API + 'jogoStatus/', this.getHeader());
  }

  public getTentativasRestantes(): Observable<any> {
    return this.http.get<any>(this.API + 'tentativasRestantes/', this.getHeader());
  }

  private getHeader() {
    const httpOptions: { headers; observe; } = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      }),
      observe: 'response'
    };
    return httpOptions;
  }

}
