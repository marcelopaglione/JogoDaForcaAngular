import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoJogoComponent } from './novo-jogo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';

describe('NovoJogoComponent', () => {
  let component: NovoJogoComponent;
  let fixture: ComponentFixture<NovoJogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule, RouterTestingModule],
      declarations: [ NovoJogoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoJogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should submit a valid play', () => {

    const expected = {
      status: 201
    };
    const observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(expected);
        observer.complete();
      }, 100);
    });
    spyOn(component, 'apiSet').and.returnValue(observable);
    spyOn(component, 'navigateToHome').and.returnValue(true);

    component.fg.patchValue({palavra: 'abc', quantidadeDeJogadas: 10});
    component.submit();
  });


  it('should submit an invalid play', () => {
    const expected = {
      status: 201
    };
    const observable = Observable.create(observer => {
      setTimeout(() => {
        observer.next(expected);
        observer.complete();
      }, 100);
    });
    spyOn(component, 'apiSet').and.returnValue(observable);

    component.fg.patchValue({palavra: '', quantidadeDeJogadas: 10});
    component.submit();
  });

});
