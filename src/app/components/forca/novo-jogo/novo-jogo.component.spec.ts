import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoJogoComponent } from './novo-jogo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

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

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(NovoJogoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Vamos começar um novo jogo da Forca!');
  });

  it('should render sub-title in a p tag', () => {
    const fixture = TestBed.createComponent(NovoJogoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain('Informe seu jogo inicial');
  });

  it('should render form input for palavra', () => {
    const fixture = TestBed.createComponent(NovoJogoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#palavra')).toBeTruthy();
  });

  it('should render form input for totalJogadas', () => {
    const fixture = TestBed.createComponent(NovoJogoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#totalJogadas')).toBeTruthy();
  });

  it('should render submit form button', () => {
    const fixture = TestBed.createComponent(NovoJogoComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#submitNewGame')).toBeTruthy();
  });

});
