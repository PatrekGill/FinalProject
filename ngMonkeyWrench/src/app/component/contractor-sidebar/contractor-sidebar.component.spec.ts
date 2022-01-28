import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractorSidebarComponent } from './contractor-sidebar.component';

describe('ContractorSidebarComponent', () => {
  let component: ContractorSidebarComponent;
  let fixture: ComponentFixture<ContractorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractorSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
