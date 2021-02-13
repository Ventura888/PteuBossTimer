import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PteuBossTimer';

  currentBossTime;

  constructor(private http: HttpClient) {
    this.getBossTime()
  }

  ngOnInit() {
    console.log('ngOnInit');
  }

  getBossTime() {
    this.http.get('https://pristontale.eu/api/api.php?key=c4b90e23c554d10c3c9deadcdbfcf93b').subscribe((data: any) => {
      this.currentBossTime = data.babel['boss.time.second'];
    });
  }

}
