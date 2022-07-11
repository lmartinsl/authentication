import { Observable } from 'rxjs';
import { MainService } from '../../services/main.service';
import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  public people$: Observable<Person[]>;

  constructor(
    private mainService: MainService
  ) { }

  ngOnInit(): void {

    this.people$ = this.mainService.getPeople();

  }

}
