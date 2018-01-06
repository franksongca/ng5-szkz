import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
        {id: 'listening', link: '/game/fillcolor'},
        {id: 'listeningOneByOne', link: 'game/fillcolor'},
        {id: 'listeningOneByOneRandomOrder', link: 'game/fillcolor'},
        {id: 'clickAndRead', link: 'game/fillcolor'},
        {id: 'clickAndReadRandomOrder', link: 'game/fillcolor'}
      ]
    }, {
      id: 'gaming',
      models: [
        {id: 'fillInTheColor', link: 'game/fillcolor'},
        {id: 'matchingShape', link: 'game/fillcolor'}
      ]
    }, {
      id: 'testing',
      models: [
        {id: 'listenAndRead', link: 'game/fillcolor'},
        {id: 'listenAndReadRandomOrder', link: 'game/fillcolor'}
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateTo(link) {
    this.router.navigate([link]);
  }

}
