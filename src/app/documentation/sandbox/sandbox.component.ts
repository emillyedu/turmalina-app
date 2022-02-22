import { Component, ChangeDetectionStrategy } from '@angular/core';

declare var require: any;

@Component({
  selector: 'app-sandbox',
  templateUrl: './sandbox.component.html',
  styleUrls: ['./sandbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SandboxComponent {

    instructions = `
    # Sandbox
    `

}
