import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ApiforcaService } from 'src/app/services/apiforca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, tap, concatMap } from 'rxjs/operators';
import { Observable, combineLatest } from 'rxjs';
import { Game, Play, Response } from 'src/app/entities';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  constructor(private api: ApiforcaService, private formBuilder: FormBuilder) {}

  palavraSecreta: string[];
  imageSprint: number;
  displayHangman: boolean;
  response: Response;
  totalSprints = 6;
  fg: FormGroup;
  @ViewChild('informarLetra') informarLetra: ElementRef;

  ngOnInit() {
    this.fg = this.formBuilder.group({
      letra: [null, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]')])]
    });
    this.refresh().toPromise();
  }

  updateImageSpring(tentativasRestantes: number) {
    tentativasRestantes > this.totalSprints
      ? (this.imageSprint = 0)
      : (this.imageSprint = this.totalSprints - tentativasRestantes);
    this.displayHangman = true;
    if (tentativasRestantes === 1 && this.response.mensagem.includes('perdeu')) {
      this.imageSprint = 6;
    }
    this.reset();
  }

  getPalavraSecretaStatus(): Observable<string[]> {
    return this.api.getStatus().pipe(
      map(data => data.body),
      map(data => data.status.trim()),
      map(data => data.split(' ')),
      map(data => {
        this.palavraSecreta = data;
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

  refresh(): Observable<Game> {
    return combineLatest(
      this.getPalavraSecretaStatus(),
      this.getTentativasRestantes()
    ).pipe(
      map(([palavraResponse, tentativasResponse]) => ({ status: palavraResponse, tentativas: tentativasResponse })),
      map((game) => this.updateImageSpring(game.tentativas)),
      tap(console.log)
    );
  }

  submit() {
    if (!this.fg.valid) {
      this.response = new Response(500, 'Letra informada está inválida');
      this.reset();
      return;
    }
    this.api
      .play(this.fg.value)
      .pipe(
        tap(data => console.log(data)),
        map(data => {
          this.response = new Response(data.status, data.body.mensagem);
          return data.body;
        }),
        map(data => data ),
        tap(data => console.log(data)),
        concatMap(() => this.refresh()),
      ).subscribe(() => {

      });

  }

  reset() {
    this.fg.reset();
    this.informarLetra.nativeElement.focus();
  }

}
