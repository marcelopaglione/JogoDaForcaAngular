export interface JogoStatus {
  status: string;
}

export interface Play {
  palavraEscondida: string;
  mensagem: string;
  status: string;
}

export interface Game {
  tentativas: number;
  jogoStatus: string[];
  play: Play;
}

export class Response {
  statusCode: number;
  statusMessage: string;
  mensagem: string;
  constructor(statusCode: number, mensagem: string) {
    this.statusCode = statusCode;
    this.mensagem = mensagem;
    switch (statusCode) {
      case 200:
        this.statusMessage = 'success';
        break;
      case 208:
        this.statusMessage = 'warning';
        break;
      case 500:
        this.statusMessage = 'danger';
        break;
    }
  }
}
