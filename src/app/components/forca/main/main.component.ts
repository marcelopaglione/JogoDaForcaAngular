import { Component, OnInit } from '@angular/core';
import { ApiforcaService } from 'src/app/services/apiforca.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private api: ApiforcaService,
    private formBuilder: FormBuilder) { }

  gameStatus: string[];
  tentativasRestantes: string;
  response = {
    mensagem: '',
    status: ''
  };
  fg: FormGroup;

  ngOnInit() {
    this.initializePageData();
  }

  private getJogoStatus() {
    this.api.getStatus().subscribe(data => {

      this.gameStatus = data.body.status.split(' ');
      console.log(this.gameStatus);
    });
  }

  private getTentativasRestantes() {
    this.api.getTentativasRestantes().subscribe(data => {
      this.tentativasRestantes = data.body.status;
      console.log(this.tentativasRestantes);
    });
  }

  submit() {
    if (this.fg.valid) {
      this.api.play(this.fg.value).subscribe(data => {
        this.response.mensagem = data.body.mensagem;
        if (data.status === 200) {
          this.response.status = 'success';
        } else {
          this.response.status = 'danger';
        }
        this.initializePageData();
      }, err => {
        this.response.mensagem = err.error.message;
        this.response.status = 'danger';
      });

    } else {
      console.log('Invalid boleto form: ' + JSON.stringify(this.fg.value));
    }
  }

  private initializePageData() {
    this.getJogoStatus();
    this.getTentativasRestantes();
    this.fg = this.formBuilder.group({
      letra: [null, Validators.required]
    });
  }

}
