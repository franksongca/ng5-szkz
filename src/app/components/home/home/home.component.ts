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
        {id: 'listening', link: ''},
        {id: 'listeningOneByOne', link: ''},
        {id: 'listeningOneByOneRandomOrder', link: ''},
        {id: 'clickAndRead', link: ''},
        {id: 'clickAndReadRandomOrder', link: ''}
      ]
    }, {
      id: 'gaming',
      models: [
        {id: 'fillInTheColor', link: ''},
        {id: 'matchingShape', link: ''}
      ]
    }, {
      id: 'testing',
      models: [
        {id: 'listenAndRead', link: ''},
        {id: 'listenAndReadRandomOrder', link: ''}
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
