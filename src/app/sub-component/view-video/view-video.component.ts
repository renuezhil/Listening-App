import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  , NgForm} from "@angular/forms";
import { CommonValidationService } from "../../services/common-validation.service";
import { RouterModule,Router, ActivatedRoute } from "@angular/router";
import { ToastrService } from "../../services/toastr.service";
import {ViewVideoService} from "../view-video/view-video.service";

@Component({
  selector: 'app-view-video',
  templateUrl: './view-video.component.html',
  styleUrls: ['./view-video.component.css']
})
export class ViewVideoComponent implements OnInit {
  id: number;
  private sub: any;
  videoList: any = [];
   tempData :any =[]; 

  constructor( private route: ActivatedRoute,private videoservice :ViewVideoService ,private commonservice: CommonValidationService,private formBuilder: FormBuilder, private router: Router,   private toastr: ToastrService) { }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
alert(this.id);
this. getVideos();
      // In a real app: dispatch action to load the details here.
   });
  }
  getVideos()
  {
    this.videoservice.viewVideoDetails(7,2).subscribe(data => {
      console.log(data)  
      this.tempData = data;     
      this.createRowData();
    },
      error => this.toastr.error(error, "Error!"));
  }

  createRowData()
{
  var rowData: any[] = [];
  var RefData = [];
  RefData =  this.tempData;


  for (var i = 0; i < this.tempData.data.length; i++) {
    rowData.push({
      rowid: i + 1,
      current_page: this.tempData.current_page,
      total: this.tempData.total,
      description: this.tempData.data[i].description,
      id: this.tempData.data[i].id,
      title: this.tempData.data[i].title,
      public_url:  this.tempData.data[i].public_url,
      views:this.tempData.data[i].views
    
      // public_url: "https://devapps.efficience.us/listeningApp/public/api"+this.tempData.data[i].public_url,
      
    });
  }
  this.videoList = rowData;
 this.tempData =this.videoList[0];
    console.log(this.videoList);
 
}

}
