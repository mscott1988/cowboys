const units = {
  "Robert Madden": {
    "C5A1V": {
      label: "C5A1V Variable Speed AC",
      options: {
        "2 Ton": {
          price: 2379,
          coil: "EAM5X24M14A",
          coil_price: 445,
          furnace: "G80CTL0701412B",
          furnace_price: 1460,
          seer2: 17.0,
          eer2: 10.5,
          ahri: "215691194",
          total_price: 4284,
          tax_credit: true
        },
        "3 Ton": {
          price: 2983,
          coil: "EAM5X36M17A",
          coil_price: 475,
          furnace: "G80CTL0902120B",
          furnace_price: 1580,
          seer2: 18.0,
          eer2: 11.0,
          ahri: "215696475",
          total_price: 5038,
          tax_credit: true
        },
        "4 Ton": {
          price: 3271,
          coil: "EAM5X48M21A",
          coil_price: 500,
          furnace: "G80CTL0902120B",
          furnace_price: 1580,
          seer2: 18.5,
          eer2: 10.5,
          ahri: "215700584",
          total_price: 5351,
          tax_credit: true
        },
        "5 Ton": {
          price: 3450,
          coil: "EAM5X60M21A",
          coil_price: 530,
          furnace: "G80CTL1102400B",
          furnace_price: 1680,
          seer2: 17.8,
          eer2: 10.2,
          ahri: "215700586",
          total_price: 5660,
          tax_credit: true
        }
      }
    },
    "C5A8T": {
      label: "C5A8T Ion Two-Stage AC",
      options: {
        "2 Ton": {
          price: 2051,
          coil: "EVM5X24M14A",
          coil_price: 343,
          furnace: "N80VSL0451412B",
          furnace_price: 674,
          seer2: 16.5,
          eer2: 13.0,
          ahri: "216377101",
          total_price: 3068,
          tax_credit: true
        },
        "3 Ton": {
          price: 2228,
          coil: "EAM5X36M17A",
          coil_price: 564,
          furnace: "N80VSL0701716B",
          furnace_price: 699,
          seer2: 15.5,
          eer2: 12.5,
          ahri: "216393919",
          total_price: 3491,
          tax_credit: true
        },
        "4 Ton": {
          price: 2650,
          coil: "EAM5X48M21A",
          coil_price: 580,
          furnace: "N80VSL0902120B",
          furnace_price: 760,
          seer2: 15.6,
          eer2: 11.8,
          ahri: "216393921",
          total_price: 3990,
          tax_credit: true
        },
        "5 Ton": {
          price: 2985,
          coil: "EAM5X60M21A",
          coil_price: 610,
          furnace: "N80VSL1102400B",
          furnace_price: 798,
          seer2: 15.8,
          eer2: 11.9,
          ahri: "216393922",
          total_price: 4393,
          tax_credit: true
        }
      }
    },
    "N5A5S": {
      label: "N5A5S Single-Stage AC",
      options: {
        "2 Ton": {
          price: 1385,
          coil: "EAM5X24M14A",
          coil_price: 445,
          furnace: "N80MSN0451412A",
          furnace_price: 617,
          seer2: 14.3,
          eer2: 13.0,
          ahri: "214913620",
          total_price: 2447,
          tax_credit: false
        },
        "3 Ton": {
          price: 1492,
          coil: "EAM5X36M17A",
          coil_price: 475,
          furnace: "N80MSN0701716A",
          furnace_price: 642,
          seer2: 14.5,
          eer2: 12.7,
          ahri: "214913621",
          total_price: 2609,
          tax_credit: false
        },
        "4 Ton": {
          price: 1654,
          coil: "EAM5X48M21A",
          coil_price: 500,
          furnace: "N80MSN0902120A",
          furnace_price: 685,
          seer2: 14.6,
          eer2: 12.5,
          ahri: "214913622",
          total_price: 2839,
          tax_credit: false
        },
        "5 Ton": {
          price: 1825,
          coil: "EAM5X60M21A",
          coil_price: 530,
          furnace: "N80MSN1102400A",
          furnace_price: 710,
          seer2: 14.7,
          eer2: 12.3,
          ahri: "214913623",
          total_price: 3065,
          tax_credit: false
        }
      }
    },
    "R5A5S": {
      label: "R5A5S Performance Single-Stage AC",
      options: {
        "2 Ton": {
          price: 1412,
          coil: "EAM5X24M14A",
          coil_price: 445,
          furnace: "G80CTL0701412B",
          furnace_price: 1460,
          seer2: 14.3,
          eer2: 12.9,
          ahri: "214913624",
          total_price: 3317,
          tax_credit: false
        },
        "3 Ton": {
          price: 1535,
          coil: "EAM5X36M17A",
          coil_price: 475,
          furnace: "G80CTL0902120B",
          furnace_price: 1580,
          seer2: 14.6,
          eer2: 12.7,
          ahri: "214913625",
          total_price: 3590,
          tax_credit: false
        },
        "4 Ton": {
          price: 1695,
          coil: "EAM5X48M21A",
          coil_price: 500,
          furnace: "G80CTL0902120B",
          furnace_price: 1580,
          seer2: 14.8,
          eer2: 12.4,
          ahri: "214913626",
          total_price: 3775,
          tax_credit: false
        },
        "5 Ton": {
          price: 1870,
          coil: "EAM5X60M21A",
          coil_price: 530,
          furnace: "G80CTL1102400B",
          furnace_price: 1680,
          seer2: 15.0,
          eer2: 12.2,
          ahri: "214913627",
          total_price: 4080,
          tax_credit: false
        }
      }
    }
  }
};
