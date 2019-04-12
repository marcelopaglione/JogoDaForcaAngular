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
    ) { }

  fg: FormGroup;
  response = {
    mensagem: '',
    status: ''
  };

  ngOnInit() {
    this.fg = this.formBuilder.group({
      palavra: [null, Validators.required],
      quantidadeDeJogadas: [null, Validators.required]
    });
  }

  public submit() {
    if (this.fg.valid) {
      this.api.set(this.fg.value).subscribe(data => {
        if (data.status === 201) {
          this.initializePageData();
          this.router.navigate(['/home']);
        }
      }, err => {
        console.log(err);
        if (err.status === 400) {
          this.response.mensagem = 'Os valores informados estão inválidos, tente novamente!';
          this.response.status = 'warning';
        } else {
          this.response.mensagem = err.error.message;
          this.response.status = 'danger';
        }
      });
    } else {
      console.log('Invalid boleto form: ' + JSON.stringify(this.fg.value));
    }
  }

  initializePageData() {
    this.fg.reset();
  }

}
