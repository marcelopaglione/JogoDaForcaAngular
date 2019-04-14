import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { ApiforcaService } from './apiforca.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ApiforcaService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientModule, HttpClientTestingModule]
    })
  );

  it('should be created', () => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);
    expect(service).toBeTruthy();
  });

  it('should create new game', done => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);
    const expected = { status: 201 };
    const observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(expected);
        observer.complete();
      }, 100);
    });

    spyOn(service, 'set').and.returnValue(observable);
    service
      .set({
        palavra: 'AABBCDF',
        quantidadeDeJogadas: '5'
      })
      .subscribe(data => {
        expect(data.status).toBe(201);
        done();
      });
  });

  it('should play the new game', done => {
    const service: ApiforcaService = TestBed.get(ApiforcaService);

    const expected = { status: 200 };
    const observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(expected);
        observer.complete();
      }, 100);
    });

    spyOn(service, 'play').and.returnValue(observable);
    service
      .play({
        letra: 'a'
      })
      .subscribe(play => {
        expect(play.status).toBe(200);
        done();
      });
  });

  it('should get jogo status from the http api call', fakeAsync(
    inject(
      [ApiforcaService, HttpTestingController],
      (api: ApiforcaService, backend: HttpTestingController) => {
        const url = 'http://localhost:8080/v1/forca/informar/jogoStatus/';
        const responseObject = { success: true, message: 'success' };
        let response = null;
        api.getStatus().subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:8080/v1/forca/informar/jogoStatus/'
        });
        requestWrapper.flush(responseObject);
        tick();
        expect(requestWrapper.request.method).toEqual('GET');
        expect(response.body).toEqual(responseObject);
        expect(response.status).toBe(200);
      }
    )
  ));

  it('should get tentativas restantes from the http api call', fakeAsync(
    inject(
      [ApiforcaService, HttpTestingController],
      (api: ApiforcaService, backend: HttpTestingController) => {
        const url = 'http://localhost:8080/v1/forca/informar/tentativasRestantes/';
        const responseObject = { success: true, message: 'success' };
        let response = null;
        api.getTentativasRestantes().subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:8080/v1/forca/informar/tentativasRestantes/'
        });
        requestWrapper.flush(responseObject);
        tick();
        expect(requestWrapper.request.method).toEqual('GET');
        expect(response.body).toEqual(responseObject);
        expect(response.status).toBe(200);
      }
    )
  ));

  it('should post a new game from the http api call', fakeAsync(
    inject(
      [ApiforcaService, HttpTestingController],
      (api: ApiforcaService, backend: HttpTestingController) => {
        const url = 'http://localhost:8080/v1/forca/informar/novoJogo/';
        const responseObject = { success: true, message: 'success' };
        let response = null;
        api.set([]).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:8080/v1/forca/informar/novoJogo/'
        });
        requestWrapper.flush(responseObject);
        tick();
        expect(requestWrapper.request.method).toEqual('POST');
        expect(response.body).toEqual(responseObject);
        expect(response.status).toBe(200);
      }
    )
  ));


  it('should play a leter from the http api call', fakeAsync(
    inject(
      [ApiforcaService, HttpTestingController],
      (api: ApiforcaService, backend: HttpTestingController) => {
        const url = 'http://localhost:8080/v1/forca/informar/letra/';
        const responseObject = { success: true, message: 'success' };
        let response = null;
        api.play([]).subscribe(
          (receivedResponse: any) => {
            response = receivedResponse;
          },
          (error: any) => {}
        );
        const requestWrapper = backend.expectOne({
          url: 'http://localhost:8080/v1/forca/informar/letra/'
        });
        requestWrapper.flush(responseObject);
        tick();
        expect(requestWrapper.request.method).toEqual('POST');
        expect(response.body).toEqual(responseObject);
        expect(response.status).toBe(200);
      }
    )
  ));


});
