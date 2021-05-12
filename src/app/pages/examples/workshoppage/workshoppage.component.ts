import { Component, OnInit, OnDestroy } from "@angular/core";
import {DndDropEvent} from "ngx-drag-drop";

@Component({
  selector: "app-workshoppage",
  templateUrl: "workshoppage.html"
})
export class WorkshoppageComponent implements OnInit, OnDestroy {

  navbarData = "<span class='text-white' >Drag your preferred navbar</span>";
  bannerData = "<span class='text-white'>Drag your preferred banner</span>";
  cardData = "";
  cardsMoved:boolean;
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
    if(event.data){
      let componentData:ComponentData = event.data;
      switch (componentData.type){
        case 'NAV':
          this.navbarData = componentData.html;
          break;
        case 'BANNER':
          this.bannerData = componentData.html;
          break;
        case 'CARD':
          this.cardsMoved = true;
          this.cardData = this.cardData + componentData.html;
          break;
        default:
          break;
      }
    }
    console.log(event);
  }

  styleChange($event){
    this.showStyle = $event;
  }
}

export class ComponentData {
  type:string;
  html:string;
}
