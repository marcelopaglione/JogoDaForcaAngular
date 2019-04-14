import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiforcaService } from 'src/app/services/apiforca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-jogo',
  templateUrl: './novo-jogo.component.html',
  styleUrls: ['./novo-jogo.component.scss']
})
export class NovoJogoComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiforcaService,
    private router: Router
  ) {}

  fg: FormGroup;
  response = {mensagem: '', status: ''};

  ngOnInit() {
    this.fg = this.formBuilder.group({
      palavra: [null, Validators.required],
      quantidadeDeJogadas: [null, Validators.required]
    });
  }

  apiSet() { return this.api.set(this.fg.value); }
  submit() {
    if (this.fg.valid) {
        this.apiSet()
        .toPromise()
        .then(
          data => {
            if (data.status === 201) {
              this.setResponse({status: 'success', message: 'Vamos começar!'});
              this.reloadPage();
              this.navigateToHome();
            }
          },
          err => {
            err.status === 400 ?
            this.setResponse({status: 'warning', message: 'Os valores informados estão inválidos, tente novamente!'}) :
            this.setResponse({status: 'danger', message: 'err.error.message'});
          }
        );
    } else {
      this.setResponse({status: 'warning', message: 'Novo jogo inválido, tente novamente'});
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  setResponse(event: {status: string; message: string}) {
    console.log(event);
    switch (event.status) {
      case 'warning':
        this.response.mensagem = event.message;
        this.response.status = 'warning';
        break;
      default:
        this.response.mensagem = event.message;
        this.response.status = 'success';
        break;
    }
  }

  reloadPage() {
    this.fg.reset();
  }
}
