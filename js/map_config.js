var config = {
  style: "mapbox://styles/warrenww/ckwjkf27a26b414nifa3qsdit",
  accessToken:
    "pk.eyJ1Ijoid2FycmVud3ciLCJhIjoiY2t1cjBzbXB1M2lsNTJ1cnU0czRwMzFnNyJ9.yj-fZ0fx9dJIEgVLWAO2zA",
  showMarkers: false,
  theme: "dark",
  title: "Policies & Pathways of Immigration",
  subtitle: "into U.S. for Central American Countries",
  byline: "",
  footer: "",
  chapters: [
    {
      id: "passage1",
      alignment: "central",
      title: "Welcome!",
      image: "",
      description:
        "The United States is a nation built upon a history of immigration. Throughout the past three centuries, the great diversity of immigrants has made America one of the greatest nations in the world. People from all over the world come here to pursue a dream of liberty and opportunities, and we welcome them to make our nation a better place together. However, it is also important to regulate immigration to keep the nation safe.",
      location: {
        center: { lon: -100.05436, lat: 29.55967 },
        zoom: 3.32,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "USbound",
          opacity: 0.5,
        },
        {
          layer: "CAbound",
          opacity: 0.5,
        },
      ],
      onChapterExit: [
        {
          layer: "USbound",
          opacity: 0,
        },
        {
          layer: "CAbound",
          opacity: 0,
        },
      ],
    },
    {
      id: "passage2",
      alignment: "central",
      title: "Why you should care",
      image: "",
      description:
        "Your friends, your colleagues, and perhaps yourself are U.S. immigrants! Over the years, the U.S. immigration landscape have undergone many significant and frequent changes, especially for migrant policies. Policy changes and major events pose many unexpected hurdles for soon-to-be migrants and migrants already in the country, so it is particularly important to identify what causes higher proportions of irregular immigration. ",
      location: {
        center: { lon: -100.05436, lat: 29.55967 },
        zoom: 3.32,
        pitch: 0.0,
        bearing: 0.0,
      },
      onChapterEnter: [
        {
          layer: "USbound",
          opacity: 0.5,
        },
        {
          layer: "CAbound",
          opacity: 0.5,
        },
      ],
      onChapterExit: [
        {
          layer: "USbound",
          opacity: 0,
        },
        {
          layer: "CAbound",
          opacity: 0,
        },
      ],
    },
    {
      id: "passage3",
      alignment: "center",
      title: "How to evaluate immigration",
      image: "",
      description:
        'The ultimate goal of immigrants coming into the United States is obtaining the lawful permanent residency(LPR), also known as the "green card". The LPR status allows \
         non-citizens to legally live permanently within the U.S. Thus, the number of people gaining LPR status can reflect the trends of immigrations into the U.S.',
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
      id: "passage4",
      alignment: "center",
      title: "The pathways of obtaining LPR",
      image: "",
      description:
        "Immigrants can obtain LPR through five different pathways: \
        <ul>\
        <li>Immediate Relatives of U.S. Citizens</li>\
        <li>(other) Family-sponsored immigration</li>\
        <li>Employment-based immigration</li>\
        <li>Diversity Visa (Green Card Lottery)</li>\
        <li>Refugee / Asylee immigration</li>\
        </ul>",
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
      id: "passage5",
      alignment: "center",
      title: "Why Central America?",
      image: "",
      description:
        "Central American countries are the neighbors of the U.S., and the U.S. is the main destination for Central American migrants, with over 90% of them residing in the U.S. as of 2018. As a result, immigration policies of our government have been frequently driven by these countries.",
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
