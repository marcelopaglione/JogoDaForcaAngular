import { TestBed } from '@angular/core/testing';

import { ApiforcaService } from './apiforca.service';
import { HttpClientModule } from '@angular/common/http';

describe('ApiforcaService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);
    expect(service).toBeTruthy();
  });

  it('should create new game', (done) => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);

    service.set({
      palavra: 'AABBCDF',
      quantidadeDeJogadas: '5'
    }).subscribe(data => {
      expect(data.status).toBe(201);
      done();
    });

  });

  it('should play the new game', (done) => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);

    service.set({
      palavra: 'AABBCDF',
      quantidadeDeJogadas: '5'
    }).subscribe(newGame => {
      expect(newGame.status).toBe(201);

      service.play({
        letra: 'a'
      }).subscribe(play => {
        expect(play.status).toBe(200);
        done();
      });
    });

  });

  it('should win one new game', (done) => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);

    service.set({
      palavra: 'ABBA',
      quantidadeDeJogadas: '5'
    }).subscribe(newGame => {
      expect(newGame.status).toBe(201);

      service.play({
        letra: 'a'
      }).subscribe(play1 => {
        expect(play1.status).toBe(200);

        service.play({
          letra: 'b'
        }).subscribe(play2 => {
          expect(play2.status).toBe(200);
          console.log(play2);
          expect(play2.body.mensagem).toBe('Você ganhou!');
          done();
        });

      });
    });

  });



});
