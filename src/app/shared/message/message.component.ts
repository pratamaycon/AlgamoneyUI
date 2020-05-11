import { FormControl } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  @Input() public error: string;
  @Input() public control: FormControl;
  @Input() public text: string;

  constructor() {}

  ngOnInit(): void {}

  checaErro(): boolean {
    return this.control.hasError(this.error) && this.control.dirty;
  }
}
