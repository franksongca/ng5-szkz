import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import enumerate = Reflect.enumerate;
import { CanvasService, Oritation } from './../../services/canvas.service';



@Component({
  selector: 'app-canvas-template',
  templateUrl: './canvas-template.component.html',
  styleUrls: ['./canvas-template.component.scss']
})
export class CanvasTemplateComponent implements OnInit, AfterViewInit {
  @Output() SizeChange = new EventEmitter<any>();

  canvasSettings = {
    oritation: 0, // 0 = landscape, 1= portrait
    marginHeight: 0,
    backgroundColor: CanvasService.BackgroundColor,
    size: {}
  };

  constructor(private canvasService: CanvasService) {
    CanvasService.ResizeEventHabdler.subscribe((sizeAndOritation) => {
      this.canvasSettings.oritation = sizeAndOritation.oritation;
      this.canvasSettings.size = sizeAndOritation.canvasSize;

      if (sizeAndOritation.size.h - 30 > sizeAndOritation.canvasSize.h) {
        this.canvasSettings.marginHeight = (sizeAndOritation.size.h - 30 - sizeAndOritation.canvasSize.h) / 2;
      } else {
        this.canvasSettings.marginHeight = 0;
      }

      this.SizeChange.emit();
    });
  }

  ngOnInit() {}

  ngAfterViewInit() {
    CanvasService.CreateStage();
  }

}
