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
  tentativasRestantes: string;
  response = {
    mensagem: '',
    status: ''
  };
  fg: FormGroup;

  ngOnInit() {
    this.reloadPage();
  }

  apiGetJogoStatus() {return this.api.getStatus(); }
  getJogoStatus() {
    console.log('status called');
    this.apiGetJogoStatus()
      .toPromise()
      .then(data => {
        console.log('get jogo status');
        this.gameStatus = data.body.status.split(' ');
        console.log(this.gameStatus);
      });
  }

  apiSubmit() { return this.api.play(this.fg.value); }
  submit() {
    if (this.fg.valid) {
      this.apiSubmit()
        .toPromise()
        .then(data => {
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
    console.log('reloadPage called');
    this.fg = this.formBuilder.group({
      letra: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(1)]]
    });
    this.getJogoStatus();
  }
}
