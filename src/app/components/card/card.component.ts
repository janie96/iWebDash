import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: "app-card",
  templateUrl: "card.html"
})
export class CardComponent implements OnInit, OnDestroy {

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
      data: {type:'CARD',html:'<div class="col-sm-4 card card-coin card-plain">\n' +
            '          <div class="card-header card-no-margin">\n' +
            '              <img class="img-center img-fluid" src="assets/img/banner-image.png"/>\n' +
            '          </div>\n' +
            '          <div class="card-body">\n' +
            '              <div class="row">\n' +
            '                  <div class="col-md-12 text-center">\n' +
            '                      <h4 class="text-uppercase">Heading</h4>\n' +
            '                      <span> Sub heading </span>\n' +
            '                      <hr class="'+this.backgroundStyle+'"/>\n' +
            '                  </div>\n' +
            '              </div>\n' +
            '              <div class="row">\n' +
            '                  <ul class="list-group">\n' +
            '                      <li class="list-group-item">content</li>\n' +
            '                  </ul>\n' +
            '              </div>\n' +
            '          </div>\n' +
            '          <div class="card-footer text-center">\n' +
            '              <button class="btn btn-simple '+this.backgroundStyle+'">Button</button>\n' +
            '          </div>\n' +
            '      </div></br>'},
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
