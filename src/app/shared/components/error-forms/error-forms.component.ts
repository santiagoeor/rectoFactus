import { Component } from '@angular/core';

@Component({
    selector: 'app-error-forms',
    standalone: true,
    template: `

<p class="mt-1 small text-danger dark-text-red-800"><span class="font-medium">
  <ng-content></ng-content>
</span></p>

  `,
    styles: ``
})
export class ErrorFormsComponent {

}
