import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuresAndFunctions = [
    {
      id: 'training',
      models: [
        {id: 'listening', model:  ''},
        {id: 'listeningOneByOne', model:  ''},
        {id: 'listeningOneByOneRandomOrder', model:  ''},
        {id: 'clickAndRead', model:  ''},
        {id: 'clickAndReadRandomOrder', model:  ''}
      ]
    }, {
      id: 'gaming',
      models: [
        {id: 'fillInTheColor', model:  ''},
        {id: 'matchingShape', model:  ''}
      ]
    }, {
      id: 'testing',
      models: [
        {id: 'listenAndRead', model:  ''},
        {id: 'listenAndReadRandomOrder', model:  ''}
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
