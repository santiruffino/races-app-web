import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Race } from "../interfaces/race";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  // userUid: string = this.authService.userData.uid;
  userUid: string = 'hi9cPltsnLRJQ7RZMjR1e7NldjD3';
  racesRef: AngularFireList<any> = this.db.list(`${this.userUid}/races-list`);
  raceRef: AngularFireObject<any> = this.db.object(`${this.userUid}/races-list/`);

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) { }

  addRace(race: Race) {
    this.racesRef.push({
      name: race.name,
      date: race.date,
      distance: race.distance,
      time: race.time,
      urlActivity: race.urlActivity,
      location: race.location
    })
  };

  getRace(id: string) {
    this.raceRef = this.db.object(`${this.userUid}/races-list/` + id);
    return this.raceRef;
  };

  getRacesList() {
    this.racesRef = this.db.list(`${this.userUid}/races-list`);
    return this.racesRef;
  };

  updateRace(race: Race) {
    this.raceRef = this.db.object(`${this.userUid}/races-list/` + race.$key);
    this.raceRef.update({
      name: race.name,
      date: race.date,
      distance: race.distance,
      time: race.time,
      urlActivity: race.urlActivity,
      location: race.location
    })
  };

  deleteRace(id: string) {
    this.raceRef = this.db.object(`${this.userUid}/races-list/` + id);
    this.raceRef.remove();
  }
}
