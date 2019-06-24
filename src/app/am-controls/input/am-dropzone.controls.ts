import {
  Component, Input, Output, ViewChild, OnInit, OnChanges, EventEmitter, ElementRef, AfterViewInit,
  SimpleChanges
} from '@angular/core';
import {Validate} from "../../utilities/data-validator";
import {Converter} from "../../utilities/data-converter";

declare var jQuery: any;
declare var Dropzone: any;

@Component({
  selector: 'am-dropzone',
  template: `<div #file id="{{name}}" class="dropzone"></div>`
})
export class AmDropzoneComponent implements  OnChanges, AfterViewInit {
  @Input() name: string;
  @Input() acceptedFiles: string = "image/*";
  @Input() url: string;
  @Input() imageUrl: string;
  @Input() headers: {} = {};
  @Input() paramName: string = "file";
  @Input() params: {} = {};
  @Input() maxFiles: number = 1;
  @Input() addRemoveLinks: boolean = true;
  @Input() isDisabled: boolean = false;

  @Output() onFileRemoved = new EventEmitter<any>();
  @Output() onFileUploaded = new EventEmitter<any>();
  @Output() onError = new EventEmitter<string>();
  
  private baseUrl: string = "http://dicom.efficience.us:9990/Dicom";


  @ViewChild('file') private elementRef: ElementRef;
  private $element: any;
  private isNewUploaded: boolean = false;

  ngOnChanges(changes: SimpleChanges) {
    if (this.$element) {
      if (this.isDisabled)
        this.$element.addClass("disabled");
      else
        this.$element.removeClass("disabled");
    }
    if(Validate.containsKey(changes, "imageUrl") && Validate.isNotNull(changes["imageUrl"].currentValue)) {

      if(this.isNewUploaded) {
        this.isNewUploaded = false;
        return;
      }
      this.updatePreview();

    }
  }

  ngAfterViewInit() {
    var self = this;
    this.$element = jQuery(this.elementRef.nativeElement);

    if (this.isDisabled) {
      this.$element.addClass("disabled");
    }

    Dropzone.autoDiscover = false;
    this.maxFiles = Converter.toInt(this.maxFiles);

    this.$element.dropzone({
      acceptedFiles: this.acceptedFiles,
      paramName: this.paramName,
      url: this.baseUrl + this.url,
      headers: this.headers,
      addRemoveLinks: this.addRemoveLinks,
      maxFiles: this.maxFiles,
      init: function() {
        this.on("sending", function(file, xhr, formData) {
          for(var property in self.params)
            formData.append(property, self.params[property]);
          self.isNewUploaded = true;
        });
        this.on("removedfile", function(file) {
          if(file.accepted) {
            self.onFileRemoved.emit({ file: file });
          }
        });
        this.on("maxfilesexceeded", function(file) {
          this.removeFile(file);
        });
        this.on("success", function(file, data) {
          if(file.accepted)
            self.onFileUploaded.emit({ file: file, response: data });
        });
        this.on("error", function(file, error, xhr) {
          self.onError.emit(error);
        });
      }
    });
    this.updatePreview();

  }

  updatePreview(){
    if(jQuery(this.elementRef.nativeElement).children().length){
      var dropzone = Dropzone.forElement("#" + this.name);
      if(Validate.isNotNull(this.imageUrl)){
        var mockFile = { name: this.imageUrl, size: 0, accepted: true };
        dropzone.emit("addedfile", mockFile);
        dropzone.emit("complete", mockFile);
        dropzone.createThumbnailFromUrl(mockFile, this.imageUrl);
        dropzone.files[0] = mockFile;
      }else{
        dropzone.removeAllFiles(true);
      }
    }
  }


}
