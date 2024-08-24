import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxSemanticModule } from "ngx-semantic";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule, NgxSemanticModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CalcGuess';
  form: FormGroup;
  num1: number = this.getRandom();
  num2: number = this.getRandom();
  correct: number = 0;
  wrong: number = 0;
  status!: string | null;

  constructor(private fb:FormBuilder) {
    this.form = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.form.valid) {
      const {answer} = this.form.value;

      if (this.checkSum(answer)) {
        this.correct++;
        this.status = 'Correct!';
      } else {
        this.wrong++;
        this.status = 'Wrong';
      }
      
      setTimeout(() => this.reset(), 3000);
    }
  }

  private getRandom(): number {
    return Math.floor(Math.random() * 10);
  }

  private checkSum(answer: string): boolean {
    return this.num1 + this.num2 === parseInt(answer);
  }

  private reset(): void {
    this.num1 = this.getRandom();
    this.num2 = this.getRandom()
    this.status = null;
    this.form.reset();
  }
}
