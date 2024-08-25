import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxSemanticModule } from "ngx-semantic";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, NgxSemanticModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CalcGuess';
  form: FormGroup;
  num1: number = this.getRandom();
  num2: number = this.getRandom();
  correct: number = 0;
  wrong: number = 0;
  status!: string | null;
  statusClass: string  = 'default';
  resetMessage!: string | null;
  disabled: boolean = false;


  constructor(private fb: FormBuilder, private cd: ChangeDetectorRef) {
    this.form = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid && !this.disabled) {
      this.disabled = true;
      const { answer } = this.form.value;

      if (this.checkSum(answer)) {
        this.correct++;
        this.status = 'Correct!';
        this.statusClass = 'correct';
      } else {
        this.wrong++;
        this.status = 'Wrong';
        this.statusClass = 'wrong';
      }

      this.resetText();
      setTimeout(() => this.reset(), 5000);
    }
  }

  private getRandom(): number {
    return Math.floor((Math.random() * 10) + 1);
  }

  private checkSum(answer: string): boolean {
    return this.num1 + this.num2 === parseInt(answer);
  }

  private reset(): void {
    this.num1 = this.getRandom();
    this.num2 = this.getRandom();
    this.status = null;
    this.statusClass = 'default';
    this.form.reset();
    this.resetMessage = null;
    this.disabled = false;
  }

  private resetText(): void {
    let time = 4;
    const message = setInterval(() => {
      this.resetMessage = `The question will reset in ${time}...`;
      time--;
      if (time == 0) clearInterval(message);
      this.cd.detectChanges();
    }, 1000);
  }
}
