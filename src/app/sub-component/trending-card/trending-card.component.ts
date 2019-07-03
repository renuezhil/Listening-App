import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending-card',
  templateUrl: './trending-card.component.html',
  styleUrls: ['./trending-card.component.css']
})
export class TrendingCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  catogiry: any = [{
    name: "Trending #1",
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
      url: "../../assets/videoes/2.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/2.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/2.mp4",


      }

    }
    ,{
      watched_persentage: 80,
      type: "video/mp4",
      url: "../../assets/videoes/2.mp4",
      title: " Video 2",
      description: "No. 2 Trending video.. Keep Watching.",

      resume: {
        label: "Resume",
        url: "../../assets/videoes/2.mp4",

      },
      delete: {
        label: "Delete",
        url: "../../assets/videoes/2.mp4",


      }

    },{
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

    },{
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

  } ]
}
