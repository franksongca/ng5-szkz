import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

export interface ProcessInterface {
  callee?: any;
  timeStamp?: Number;
  renderFunc: Function;
  completeFunc?: Function;
  totalLoops: Number;  // 0=endless
  interval: Number;
  indexInterval?: Number;
  indexLoops?: Number;
  complete?: boolean;
}

@Injectable()
export class DeviceTimerService {
  static requestAnimationFrame: Function;
  static cancelAnimationFrame: Function;
  static animationFrame;
  static processes = {};

  static init() {
    if (DeviceTimerService.requestAnimationFrame) {
      return;
    }

    const w = (<any>window);

    DeviceTimerService.requestAnimationFrame = w.requestAnimationFrame ||
      w.webkitRequestAnimationFrame ||
      w.mozRequestAnimationFrame ||
      w.oRequestAnimationFrame ||
      w.msRequestAnimationFrame;

    DeviceTimerService.cancelAnimationFrame = w.cancelAnimationFrame ||
      w.webkitCancelRequestAnimationFrame ||
      w.webkitCancelAnimationFrame ||
      w.mozCancelRequestAnimationFrame || w.mozCancelAnimationFrame ||
      w.oCancelRequestAnimationFrame || w.oCancelAnimationFrame ||
      w.msCancelRequestAnimationFrame || w.msCancelAnimationFrame;

    DeviceTimerService.startDeviceTimer();
  }

  private static deviceTimer() {
    const processKeys = Object.keys(DeviceTimerService.processes);

    processKeys.forEach((key) => {
      const process = DeviceTimerService.processes[key];
      process.indexInterval++;
      if (process.indexInterval >= process.interval) {
        process.indexInterval = 0;

        process.indexLoops++;
        if (!process.totalLoops || process.indexLoops <= process.totalLoops) {
          // console.log(process.indexLoops + ':' + process.totalLoops);
          process.renderFunc.apply(process.callee);
        } else {
          // this process id done, remove from the queue
          delete DeviceTimerService.processes[key];
          if (process.completeFunc) {
            process.completeFunc.apply(process.callee);
          }
        }
      }
    });

    // continue looping
    DeviceTimerService.animationFrame = DeviceTimerService.requestAnimationFrame(DeviceTimerService.deviceTimer);
  }

  private static unregister(timeStamp) {
    delete DeviceTimerService.processes[timeStamp];
  }

  static register(process: ProcessInterface) {
    const timeStamp = CommonService.getTimestamp();

    process.indexInterval = 0;
    process.indexLoops = 0;
    process.complete = false;

    DeviceTimerService.processes[timeStamp] = process;

    return timeStamp;
  }

  static cleanTimerQueue() {
    const processKeys = Object.keys(DeviceTimerService.processes);

    processKeys.forEach((key) => {
      DeviceTimerService.unregister(key);
    });
  }

  static startDeviceTimer() {
    // starting looping
    DeviceTimerService.animationFrame = DeviceTimerService.requestAnimationFrame(DeviceTimerService.deviceTimer);
  }

  static killDeviceTimer() {
    DeviceTimerService.cancelAnimationFrame();
    DeviceTimerService.cleanTimerQueue();
  }
}
