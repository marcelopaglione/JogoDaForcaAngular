import { Component, OnInit } from '@angular/core';
import { ApiforcaService } from 'src/app/services/apiforca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, tap, concatMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Game, JogoStatus, Play } from 'src/app/entities';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private api: ApiforcaService, private formBuilder: FormBuilder) {}

  gameStatus: string[];
  imageSprint: number;
  displayHangman: boolean;
  response = { mensagem: '', status: '' };
  totalSprints = 6;
  fg: FormGroup;

  ngOnInit() {
    this.fg = this.formBuilder.group({
      letra: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
    });
    this.getJogoStatus().toPromise();
  }

  updateImageSpring(tentativasRestantes: number, status: string) {
    tentativasRestantes > this.totalSprints
      ? (this.imageSprint = 1)
      : (this.imageSprint = this.totalSprints - tentativasRestantes);
    this.displayHangman = true;
    if (status.endsWith('Fim de jogo, você perdeu!')) {
      this.imageSprint = 6;
    }
    console.log('updateImageSpring tentativas restantes: ', tentativasRestantes);
    console.log('updateImageSpring show image sprint: ', this.imageSprint);
  }

  getJogoStatus(): Observable<string[]> {
    return this.api.getStatus().pipe(
      map(data => data.body),
      map(data => data.status.trim()),
      map(data => data.split(' ')),
      map(data => {
        this.gameStatus = data;
        return data;
      }),
      tap(data => console.log('getJogoStatus', data)),
    );
  }

  getTentativasRestantes(): Observable<number> {
    return this.api.getTentativasRestantes().pipe(
      map(data => data.body),
      map(data => data),
      map(data => parseInt(data.status, 10)),
      map(data => data),
      tap(data => console.log('getTentativasRestantes', data)),
    );
  }

  refresh(p: Play): Observable<Game> {
    return combineLatest(
      this.getJogoStatus(),
      this.getTentativasRestantes()
    ).pipe(
      map(([js, jt]) => ({ status: js, tentativas: jt, play: p})),
      map((game) => this.updateImageSpring(game.tentativas, p.mensagem)),
      tap(console.log)
    );
  }

  submit() {
    if (!this.fg.valid) {
      this.setResponse({status: 'warning', message: 'Letra informada está inválida'});
      return;
    }
    this.api
      .play(this.fg.value)
      .pipe(
        tap(data => console.log(data)),
        map(data => {
          this.setResponse({ status: data.status.toString() === '200' ? 'success' : 'warning', message: data.body.mensagem });
          return data.body;
        }),
        map(data => data ),
        tap(data => console.log(data)),
        concatMap(data => this.refresh(data)),
      ).subscribe(() => {
        this.fg.reset();
      });

  }

  setResponse(event: { status: string; message: string }) {
    this.response.mensagem = event.message;
    this.response.status = event.status;
  }

}
