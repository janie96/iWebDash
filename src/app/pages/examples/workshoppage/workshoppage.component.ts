import { Component, OnInit, OnDestroy } from "@angular/core";
import {DndDropEvent} from "ngx-drag-drop";

@Component({
  selector: "app-workshoppage",
  templateUrl: "workshoppage.html"
})
export class WorkshoppageComponent implements OnInit, OnDestroy {

  data = "";
  showStyle:boolean = false;
  color:string;

  constructor() {}

  ngOnInit() {
  }
  ngOnDestroy() {

  }

  onDragover(event:DragEvent) {
    console.log("dragover", JSON.stringify(event, null, 2));
  }

  onDrop(event:DndDropEvent) {
    this.showStyle = false;
    console.log("*******************");
    this.data = event.data;
    console.log(event);
  }

  styleChange($event){
    this.showStyle = $event;
  }

  setColor($event){
    if($event !==""){

    }else{
      this.color = $event;
    }
  }
}
