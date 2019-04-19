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
