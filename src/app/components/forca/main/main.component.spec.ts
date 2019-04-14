import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ MainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    console.log('should create');
    expect(component).toBeTruthy();
  });

  it('should all message status', () => {
    const response = {status: 'danger', message: 'message'};
    component.setResponse(response);
    expect(component.response.status).toEqual('danger');

    response.status = 'info';
    component.setResponse(response);
    expect(component.response.status).toEqual('info');

    response.status = 'success';
    component.setResponse(response);
    expect(component.response.status).toEqual('success');

    response.status = 'warning';
    component.setResponse(response);
    expect(component.response.status).toEqual('warning');

  });

  it('should play a word', () => {
    const observablesubmit = Observable.create(observer => {
      setTimeout(() => { observer.next({ body: {mensagem: 'message'}, status: '200' }); observer.complete(); }, 1000);
    });
    const spy  = spyOn(component, 'apiSubmit').and.returnValue(observablesubmit);
    spyOn(component, 'submit').and.callThrough();
    component.fg.patchValue({letra: 'A'});
    component.submit();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.fg.valid).toBeTruthy();
  });

  it('should play a repeated word', () => {
      const observablesubmit = Observable.create(observer => {
        setTimeout(() => { observer.next({ body: {mensagem: 'message'}, status: '208' }); observer.complete(); }, 1000);
      });
      const spy  = spyOn(component, 'apiSubmit').and.returnValue(observablesubmit);
      spyOn(component, 'submit').and.callThrough();
      component.fg.patchValue({letra: 'A'});
      component.submit();
      expect(spy).toHaveBeenCalledTimes(1);
      expect(component.fg.valid).toBeTruthy();
    });

  it('should play an invalid form', () => {
      const spy  = spyOn(component, 'apiSubmit');
      spyOn(component, 'submit').and.callThrough();
      component.fg.patchValue({letra: 'AA'});
      component.submit();
      expect(spy).toHaveBeenCalledTimes(0);
      expect(component.fg.valid).toBe(false);
    });

  it('should get jogo status', () => {

    const observablesubmit = Observable.create(observer => {
      setTimeout(() => { observer.next({ body: {status: 'A B C'} }); observer.complete(); }, 1000);
    });
    const spy  = spyOn(component, 'apiGetJogoStatus').and.returnValue(observablesubmit);
    spyOn(component, 'getJogoStatus').and.callThrough();

    component.ngOnInit();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.fg.valid).toBe(false);
  });


});
