import { Component } from '@angular/core';

@Component({
  selector: 'app-error-forms',
  standalone: true,
  template: `

<b style="color: red;">
  <ng-content></ng-content>
</b>

  `,
  styles: ``
})
export class ErrorFormsComponent {

}
