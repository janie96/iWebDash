import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: "app-banner",
  templateUrl: "banner.html"
})
export class BannerComponent implements OnInit, OnDestroy {

  @Output()
  activateDropzone:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  getColor:EventEmitter<string> = new EventEmitter<string>();

  @Input()
  backgroundStyle:string;

  draggable:any;

  constructor() {}

  ngOnInit() {
    this.draggable = {
      // note that data is handled with JSON.stringify/JSON.parse
      // only set simple data or POJO's as methods will be lost
      data: {type:'BANNER',background:this.backgroundStyle,html:'<div class="card '+this.backgroundStyle+'">\n' +
            '        <div class="card-header">\n' +
            '            <h4 class="card-title">Banner</h4>\n' +
            '        </div>\n' +
            '        <div class="card-body">\n' +
            '            <h4 class="card-title">Banner Content</h4>\n' +
            '        </div>\n' +
            '    </div>'},
      effectAllowed: "all",
      disable: false,
      handle: false
    };
  }
  ngOnDestroy() {

  }

  onDragStart(event:DragEvent) {
    this.activateDropzone.emit(true);
    console.log("drag started", JSON.stringify(event, null, 2));
  }

  onDragEnd(event:DragEvent) {
    this.activateDropzone.emit(false);
    console.log("drag ended", JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event:DragEvent) {

    console.log("draggable copied", JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event:DragEvent) {

    console.log("draggable linked", JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event:DragEvent) {

    console.log("draggable moved", JSON.stringify(event, null, 2));
  }

  onDragCanceled(event:DragEvent) {

    console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
}
