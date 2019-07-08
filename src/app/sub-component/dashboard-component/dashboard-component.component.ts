import { Component, OnInit } from '@angular/core';

import { DashboardService } from "./dashboard.service";
import { ToastrService } from "../../services/toastr.service";
@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {

  constructor(private dashboardservice: DashboardService, private toastr: ToastrService) { }
  videoList: any = [];
  tempData: any = [];
  newVideoList : any =[];
  trendingVideoList : any =[];
  mostWatchedVideoList : any =[];
  watchedVideoList :any =[];

  ngOnInit() {
    // this.getvideoCategory();
    this.getVideos();
  }

  getVideos() {
    this.dashboardservice.getdashboardMostWatchedVideos().subscribe(
      (data) => {        
        this.createRowData(data,"Most Watched Video");
      },
      err => this.toastr.error(err, "Error!"))
    error => this.toastr.error(error, "Error!")     

    // this.dashboardservice.getdashboardNewVideos().subscribe(
    //   (data) => {        
    //     this.createRowData(data,"Latest Video");
    //   },
    //   err => this.toastr.error(err, "Error!"))
    // error => this.toastr.error(error, "Error!")

    // this.dashboardservice.getdashboardTrendingVideos().subscribe(
    //   (data) => {        
    //     this.createRowData(data,"Trending Video");
    //   },
    //   err => this.toastr.error(err, "Error!"))
    // error => this.toastr.error(error, "Error!")

  }
  createRowData(data,heading) {
    var rowData: any[] = [];
    var RefData = [];
    RefData = data;
    console.log(data);
    for (var i = 0; i < data.data.length; i++) {
      this.videoList.push({
        rowid: i + 1,
        headingname :heading,
        current_page: data.current_page,
        total: data.total,       
        id: data.data[i].id,
        category_id : data.data[i].category_id,  
        
        videos :[
          {
            type: "video/mp4",
            public_url:  data.data[i].public_url,
            title: data.data[i].title,
            description: data.data[i].description,
            views: data.data[i].views,
          }
        ]
        // public_url: "https://devapps.efficience.us/listeningApp/public/api"+data.data[i].public_url,
      });
    }
    // this.videoList = rowData;
  console.log("------\n"+this.videoList[0].videos);
  } 

  getViewVideosId(vidoeid)
  {
    alert(vidoeid);
  }
  catogiry: any = [{
    name: "Recently Watched",
    videos: [{
      watched_persentage: 20,
      type: "video/mp4",
      url: "../../assets/videoes/3.mp4",
      title: " Video 1",
      description: "No. 1 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/3.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/3.mp4",
      }
    },
    {
      watched_persentage: 80,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    },
    {
      watched_persentage: 80,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    },
    {
      watched_persentage: 80,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    },
    {
      watched_persentage: 80,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    },
    {
      watched_persentage: 80,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
    ]

  },
  {
    name: "Latestest video",
    videos: [{
      watched_persentage: 50,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 1",
      description: "No. 1 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",
      }
    },
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
      ,
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
      ,
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
      ,
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
      ,
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
      ,
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
      ,
    {
      watched_persentage: 33,
      type: "video/mp4",
      url: "../../assets/videoes/movie.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/movie.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/movie.mp4",


      }

    }
    ]

  }]
}
