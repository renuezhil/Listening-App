import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard-component.component.html',
  styleUrls: ['./dashboard-component.component.css']
})
export class DashboardComponentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
