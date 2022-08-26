import { Component } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subject = webSocket(environment.WS_URL);

  title = 'Assignment---Social-Photo-Gallery';
}
