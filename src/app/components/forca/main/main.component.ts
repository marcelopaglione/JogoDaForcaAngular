import { Component, OnInit } from '@angular/core';
import { ApiforcaService } from 'src/app/services/apiforca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  constructor(private api: ApiforcaService, private formBuilder: FormBuilder) {
    this.fg = this.formBuilder.group({
      letra: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
    });
  }

  gameStatus: string[];
  imageSprint: number;
  displayHangman;
  response = {
    mensagem: '',
    status: ''
  };
  fg: FormGroup;

  ngOnInit() {
    this.reloadPage();
  }

  showImageSpring(status: string) {
    this.api.getTentativasRestantes().subscribe(data => {
      console.log(data);
      const tentativasRestantes = parseInt(data.body.status.split(' ')[3].trim(), 10);
      const totalSprints = 6;
      tentativasRestantes > totalSprints ? this.imageSprint = 0 : this.imageSprint = totalSprints - tentativasRestantes;
      tentativasRestantes >= 7 ? this.displayHangman = false : this.displayHangman = true;
      if (status.endsWith('Fim de jogo, você perdeu!')) {
        this.imageSprint = 6;
      }
      console.log('tentativas restantes: ', tentativasRestantes);
      console.log('show image sprint: ', this.imageSprint);
      });
  }

  apiGetJogoStatus() {return this.api.getStatus(); }
  getJogoStatus() {
    this.apiGetJogoStatus()
      .toPromise()
      .then(data => {
        this.gameStatus = data.body.status.split(' ');
      });
  }

  apiSubmit() { return this.api.play(this.fg.value); }
  submit() {
    if (this.fg.valid) {
      this.apiSubmit()
        .toPromise()
        .then(data => {
            this.showImageSpring(data.body.mensagem);
            this.setResponse({status: data.status.toString() === '200' ? 'success' : 'warning', message: data.body.mensagem});
            this.reloadPage();
          },
          err => {
            this.setResponse({status: 'danger', message: err.error.message});
          }
        );
    } else {
      this.setResponse({status: 'warning', message: 'Letra informada está inválida'});
    }
  }

  setResponse(event: {status: string; message: string}) {
    console.log(event);
    switch (event.status) {
      case 'warning':
        this.response.mensagem = event.message;
        this.response.status = 'warning';
        break;
      case 'danger':
        this.response.mensagem = event.message;
        this.response.status = 'danger';
        break;
      case 'success':
        this.response.mensagem = event.message;
        this.response.status = 'success';
        break;
      default:
        this.response.mensagem = event.message;
        this.response.status = 'info';
        break;
    }
  }

  reloadPage() {
    this.fg = this.formBuilder.group({
      letra: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
    });
    this.getJogoStatus();
  }
}
