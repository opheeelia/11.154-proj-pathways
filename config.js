var config = {
  style: "mapbox://styles/warrenww/ckwjkf27a26b414nifa3qsdit",
  accessToken:
    "pk.eyJ1Ijoid2FycmVud3ciLCJhIjoiY2t1cjBvNTJwNTA0cDMwbWFudXRpcDhlbyJ9.vAzyl1I8gStvNrgmYS9uFg",
  showMarkers: false,
  theme: "dark",
  title: "Policies & Pathways of Immigration",
  subtitle: "",
  byline: "",
  footer: "",
  chapters: [
    {
      id: "start",
      alignment: "right",
      title: "Our motivation",
      image: "",
      description:
        "The U.S. is the main destination for Central American migrants, with over 90% of them residing in the U.S. as of 2018. Over the years, the U.S. immigration landscape have undergone many significant and frequent changes",
      location: {
        center: [-98.46575, 41.08284],
        zoom: 3.77,
        pitch: 3.5,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "USbound",
          opacity: 0.6,
        },
      ],
      onChapterExit: [
        {
          layer: "USbound",
          opacity: 0,
        },
      ],
    },
    {
      id: "central-am",
      alignment: "right",
      title: "Bike Lanes",
      image: "",
      description:
        "Philadelphia has XX miles of bike lanes, XX miles of which are protected. Drivers are getting more used to sharing the road, but ride defensively.",
      location: {
        center: { lon: -101.52442, lat: 20.20557 },
        zoom: 4.27,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "CAbound",
          opacity: 0.45,
        },
      ],
      onChapterExit: [
        {
          layer: "CAbound",
          opacity: 0,
        },
      ],
    },
  ],
};
