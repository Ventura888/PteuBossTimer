import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { interval, Subject, Subscription } from 'rxjs';

declare global {
  interface String {
    replaceAt(index, replacement): string;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  utcSubscription: Subscription;
  bossesSubscription: Subscription;

  currentBossTime;
  isAlreadySpawned: boolean;

  utcTimeSubject: Subject<string> = new Subject<string>();
  utcTime$ = this.utcTimeSubject.asObservable();

  babel: boolean;
  chaosCaraQueen: boolean;
  darkness: boolean;
  valento: boolean;
  kelvezu: boolean;
  mokovian: boolean;
  devilshy: boolean;
  tulla: boolean;
  draxos: boolean;
  greedy: boolean;

  babelTimes = [];
  chaosCaraQueenTimes = [];
  darknessTimes = [];
  valentoTimes = [];
  kelvezuTimes = [];
  mokovianTimes = [];
  devilshyTimes = [];
  tullaTimes = [];
  draxosTimes = [];
  greedyTimes = [];

  soonestBabel;
  soonestChaosCaraQueen;
  soonestDarkness;
  soonestValento;
  soonestKelvezu;
  soonestMokovian;
  soonestDevilshy;
  soonestTulla;
  soonestDraxos;
  soonestGreedy;

  constructor(private http: HttpClient) {
    this.getBossTime()
  }

  ngOnInit() {
    this.utcSubscription = interval(1000).subscribe(
      () => this.getUtcTime()
    )
    this.bossesSubscription = interval(1000).subscribe(
      () => this.getCurrentBosses()
    )
  }

  getBossTime() {
    this.http.get(environment.apiUrl).subscribe((data: any) => {
      this.currentBossTime = data.babel['boss.time.second'];
      this.getBossesTimesArrays();
    });
  }

  getUtcTime() {
    const time = new Date().toISOString().slice(11, 19);
    this.utcTimeSubject.next(time);

    if (Number(this.currentBossTime) <= new Date().getMinutes()) {
      this.isAlreadySpawned = true;
    } else {
      this.isAlreadySpawned = false;
    }

    if (time === '00:00:05') {
      this.getBossTime();
    }

    String.prototype.replaceAt = function(index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    const soonestBabelTime = this.babelTimes.find((babel) => {
      return babel >= time;
    })
    if (soonestBabelTime) {
      this.soonestBabel = new Date(new Date().toISOString().replaceAt(11, soonestBabelTime)).getTime();
    }

    const soonestChaosCaraQueenTime = this.chaosCaraQueenTimes.find((ccq) => {
      return ccq >= time;
    })
    if (soonestChaosCaraQueenTime) {
      this.soonestChaosCaraQueen = new Date(new Date().toISOString().replaceAt(11, soonestChaosCaraQueenTime)).getTime();
    }

    const soonestDarknessTime = this.darknessTimes.find((darkness) => {
      return darkness >= time;
    })
    if (soonestDarknessTime) {
      this.soonestDarkness = new Date(new Date().toISOString().replaceAt(11, soonestDarknessTime)).getTime();
    }

    const soonestValentoTime = this.valentoTimes.find((valento) => {
      return valento >= time;
    })
    if (soonestValentoTime) {
      this.soonestValento = new Date(new Date().toISOString().replaceAt(11, soonestValentoTime)).getTime();
    }

    const soonestKelvezuTime = this.kelvezuTimes.find((kelvezu) => {
      return kelvezu >= time;
    })
    if (soonestKelvezuTime) {
      this.soonestKelvezu = new Date(new Date().toISOString().replaceAt(11, soonestKelvezuTime)).getTime();
    }

    const soonestMokovianTime = this.mokovianTimes.find((mokovian) => {
      return mokovian >= time;
    })
    if (soonestMokovianTime) {
      this.soonestMokovian = new Date(new Date().toISOString().replaceAt(11, soonestMokovianTime)).getTime();
    }

    const soonestDevilshyTime = this.devilshyTimes.find((devilShy) => {
      return devilShy >= time;
    })
    if (soonestDevilshyTime) {
      this.soonestDevilshy = new Date(new Date().toISOString().replaceAt(11, soonestDevilshyTime)).getTime();
    }

    const soonestTullaTime = this.tullaTimes.find((tulla) => {
      return tulla >= time;
    })
    if (soonestTullaTime) {
      this.soonestTulla = new Date(new Date().toISOString().replaceAt(11, soonestTullaTime)).getTime();
    }

    const soonestDraxosTime = this.draxosTimes.find((draxos) => {
      return draxos >= time;
    })
    if (soonestDraxosTime) {
      this.soonestDraxos = new Date(new Date().toISOString().replaceAt(11, soonestDraxosTime)).getTime();
    }

    const soonestGreedyTime = this.greedyTimes.find((greedy) => {
      return greedy >= time;
    })
    if (soonestGreedyTime) {
      this.soonestGreedy = new Date(new Date().toISOString().replaceAt(11, soonestGreedyTime)).getTime();
    }
  }

  getCurrentBosses() {
    const time = new Date().toISOString().slice(11, 19);

    if (Number(time.substring(0, 2)) % 1 === 0) {
      this.babel = true;
    } else {
      this.babel = false;
    }

    if (Number(time.substring(0, 2)) % 2 === 0) {
      this.chaosCaraQueen = true;
    } else {
      this.chaosCaraQueen = false;
    }

    if (Number(time.substring(0, 2)) % 3 === 1) {
      this.darkness = true;
    } else {
      this.darkness = false;
    }

    if (Number(time.substring(0, 2)) % 2 === 1) {
      this.valento = true;
    } else {
      this.valento = false;
    }

    if (Number(time.substring(0, 2)) % 3 === 0) {
      this.kelvezu = true;
    } else {
      this.kelvezu = false;
    }

    if (Number(time.substring(0, 2)) % 3 === 2) {
      this.mokovian = true;
    } else {
      this.mokovian = false;
    }

    if (Number(time.substring(0, 2)) % 4 === 0) {
      this.devilshy = true;
    } else {
      this.devilshy = false;
    }

    if (Number(time.substring(0, 2)) % 4 === 1) {
      this.tulla = true;
    } else {
      this.tulla = false;
    }

    if (Number(time.substring(0, 2)) % 4 === 3) {
      this.draxos = true;
    } else {
      this.draxos = false;
    }

    if (Number(time.substring(0, 2)) % 6 === 0) {
      this.greedy = true;
    } else {
      this.greedy = false;
    }
  }

  getBossesTimesArrays() {
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        this.babelTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.babelTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 0; i < 24; i += 2) {
      if (i < 10) {
        this.chaosCaraQueenTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.chaosCaraQueenTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 1; i < 24; i += 3) {
      if (i < 10) {
        this.darknessTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.darknessTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 1; i < 24; i += 2) {
      if (i < 10) {
        this.valentoTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.valentoTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 0; i < 24; i += 3) {
      if (i < 10) {
        this.kelvezuTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.kelvezuTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 2; i < 24; i += 3) {
      if (i < 10) {
        this.mokovianTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.mokovianTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 0; i < 24; i += 4) {
      if (i < 10) {
        this.devilshyTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.devilshyTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 1; i < 24; i += 4) {
      if (i < 10) {
        this.tullaTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.tullaTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 3; i < 24; i += 4) {
      if (i < 10) {
        this.draxosTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.draxosTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    for (let i = 0; i < 24; i += 6) {
      if (i < 10) {
        this.greedyTimes.push(`0${i}:${this.currentBossTime}:00`)
      } else {
        this.greedyTimes.push(`${i}:${this.currentBossTime}:00`)
      }
    }
    console.log(this.babelTimes)
    console.log(this.chaosCaraQueenTimes)
    console.log(this.darknessTimes)
    console.log(this.valentoTimes)
    console.log(this.kelvezuTimes)
    console.log(this.mokovianTimes)
    console.log(this.devilshyTimes)
    console.log(this.tullaTimes)
    console.log(this.draxosTimes)
    console.log(this.greedyTimes)
  }

  ngOnDestroy() {
    this.utcSubscription.unsubscribe();
    this.utcTimeSubject.complete();
    this.bossesSubscription.unsubscribe();
  }


}
