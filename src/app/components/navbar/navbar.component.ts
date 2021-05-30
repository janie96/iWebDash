import {Component, OnInit, OnDestroy, Output, EventEmitter, Input} from "@angular/core";

@Component({
  selector: "app-navbar",
  templateUrl: "navbar.html"
})
export class NavbarComponent implements OnInit, OnDestroy {

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
      data:{type:'NAV',background:this.backgroundStyle,html: '<nav class="navbar navbar-expand-lg '+this.backgroundStyle+'">\n' +
            '  <div class="container">\n' +
            '    <a class="navbar-brand" href="#">Navbar</a>\n' +
            '    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">\n' +
            '    <span class="navbar-toggler-bar navbar-kebab"></span>\n' +
            '    <span class="navbar-toggler-bar navbar-kebab"></span>\n' +
            '    <span class="navbar-toggler-bar navbar-kebab"></span>\n' +
            '    </button>\n' +
            '    <div class="collapse navbar-collapse" id="navbarNav">\n' +
            '      <ul class="navbar-nav">\n' +
            '        <li class="nav-item active">\n' +
            '          <a class="nav-link" href="#">Link 1 <span class="sr-only">(current)</span></a>\n' +
            '        </li>\n' +
            '        <li class="nav-item">\n' +
            '          <a class="nav-link" href="#">Link 2</a>\n' +
            '        </li>\n' +
            '        <li class="nav-item">\n' +
            '          <a class="nav-link" href="#">Link 3</a>\n' +
            '        </li>\n' +
            '      </ul>\n' +
            '    </div>\n' +
            '  </div>\n' +
            '</nav>'},
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
