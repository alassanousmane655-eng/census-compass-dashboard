export type Arrondissement = { code: string; name: string };
export type Department = { code: string; name: string; chefLieu: string; arrondissements: Arrondissement[] };
export type Region = { code: string; name: string; chefLieu: string; departments: Department[] };
export const TERRITORY_VERSION = "2026-10-v1";
export const TERRITORY_SOURCE = "MINAT — découpage administratif (10 régions, 58 départements, 360 arrondissements). À vérifier avant production.";
export const REGIONS: Region[] = [
  {
    "code": "AD",
    "name": "Adamaoua",
    "chefLieu": "Ngaoundéré",
    "departments": [
      {
        "code": "AD-DJE",
        "name": "Djérem",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "AD-DJE-01",
            "name": "Ngaoundal"
          },
          {
            "code": "AD-DJE-02",
            "name": "Tibati"
          }
        ]
      },
      {
        "code": "AD-FDE",
        "name": "Faro-et-Déo",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "AD-FDE-01",
            "name": "Galim-Tignère"
          },
          {
            "code": "AD-FDE-02",
            "name": "Kontcha"
          },
          {
            "code": "AD-FDE-03",
            "name": "Mayo-Baléo"
          },
          {
            "code": "AD-FDE-04",
            "name": "Tignère"
          }
        ]
      },
      {
        "code": "AD-MBA",
        "name": "Mayo-Banyo",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "AD-MBA-01",
            "name": "Bankim"
          },
          {
            "code": "AD-MBA-02",
            "name": "Banyo"
          },
          {
            "code": "AD-MBA-03",
            "name": "Mayo-Darlé"
          }
        ]
      },
      {
        "code": "AD-MBE",
        "name": "Mbéré",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "AD-MBE-01",
            "name": "Dir"
          },
          {
            "code": "AD-MBE-02",
            "name": "Djohong"
          },
          {
            "code": "AD-MBE-03",
            "name": "Meiganga"
          },
          {
            "code": "AD-MBE-04",
            "name": "Ngaoui"
          }
        ]
      },
      {
        "code": "AD-VIN",
        "name": "Vina",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "AD-VIN-01",
            "name": "Bélel"
          },
          {
            "code": "AD-VIN-02",
            "name": "Martap"
          },
          {
            "code": "AD-VIN-03",
            "name": "Mbé"
          },
          {
            "code": "AD-VIN-04",
            "name": "Nganha"
          },
          {
            "code": "AD-VIN-05",
            "name": "Ngaoundéré I"
          },
          {
            "code": "AD-VIN-06",
            "name": "Ngaoundéré II"
          },
          {
            "code": "AD-VIN-07",
            "name": "Ngaoundéré III"
          },
          {
            "code": "AD-VIN-08",
            "name": "Nyambaka"
          }
        ]
      }
    ]
  },
  {
    "code": "CE",
    "name": "Centre",
    "chefLieu": "Yaoundé",
    "departments": [
      {
        "code": "CE-HSA",
        "name": "Haute-Sanaga",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-HSA-01",
            "name": "Bibey"
          },
          {
            "code": "CE-HSA-02",
            "name": "Lembe-Yezoum"
          },
          {
            "code": "CE-HSA-03",
            "name": "Mbandjock"
          },
          {
            "code": "CE-HSA-04",
            "name": "Minta"
          },
          {
            "code": "CE-HSA-05",
            "name": "Nanga-Eboko"
          },
          {
            "code": "CE-HSA-06",
            "name": "Nkoteng"
          },
          {
            "code": "CE-HSA-07",
            "name": "Nsem"
          }
        ]
      },
      {
        "code": "CE-LEK",
        "name": "Lekié",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-LEK-01",
            "name": "Batchenga"
          },
          {
            "code": "CE-LEK-02",
            "name": "Ebebda"
          },
          {
            "code": "CE-LEK-03",
            "name": "Elig-Mfomo"
          },
          {
            "code": "CE-LEK-04",
            "name": "Evodoula"
          },
          {
            "code": "CE-LEK-05",
            "name": "Lobo"
          },
          {
            "code": "CE-LEK-06",
            "name": "Monatélé"
          },
          {
            "code": "CE-LEK-07",
            "name": "Obala"
          },
          {
            "code": "CE-LEK-08",
            "name": "Okola"
          },
          {
            "code": "CE-LEK-09",
            "name": "Sa'a"
          }
        ]
      },
      {
        "code": "CE-MIN",
        "name": "Mbam-et-Inoubou",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-MIN-01",
            "name": "Bafia"
          },
          {
            "code": "CE-MIN-02",
            "name": "Bokito"
          },
          {
            "code": "CE-MIN-03",
            "name": "Deuk"
          },
          {
            "code": "CE-MIN-04",
            "name": "Kiiki"
          },
          {
            "code": "CE-MIN-05",
            "name": "Kon-Yambetta"
          },
          {
            "code": "CE-MIN-06",
            "name": "Makénéné"
          },
          {
            "code": "CE-MIN-07",
            "name": "Ndikiniméki"
          },
          {
            "code": "CE-MIN-08",
            "name": "Nitoukou"
          },
          {
            "code": "CE-MIN-09",
            "name": "Ombessa"
          }
        ]
      },
      {
        "code": "CE-MKI",
        "name": "Mbam-et-Kim",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-MKI-01",
            "name": "Mbangassina"
          },
          {
            "code": "CE-MKI-02",
            "name": "Ngambè-Tikar"
          },
          {
            "code": "CE-MKI-03",
            "name": "Ngoro"
          },
          {
            "code": "CE-MKI-04",
            "name": "Ntui"
          },
          {
            "code": "CE-MKI-05",
            "name": "Yoko"
          }
        ]
      },
      {
        "code": "CE-MFA",
        "name": "Méfou-et-Afamba",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-MFA-01",
            "name": "Afanloum"
          },
          {
            "code": "CE-MFA-02",
            "name": "Assamba"
          },
          {
            "code": "CE-MFA-03",
            "name": "Awaé"
          },
          {
            "code": "CE-MFA-04",
            "name": "Edzendouan"
          },
          {
            "code": "CE-MFA-05",
            "name": "Essé"
          },
          {
            "code": "CE-MFA-06",
            "name": "Mfou"
          },
          {
            "code": "CE-MFA-07",
            "name": "Nkolafamba"
          },
          {
            "code": "CE-MFA-08",
            "name": "Soa"
          }
        ]
      },
      {
        "code": "CE-MAK",
        "name": "Méfou-et-Akono",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-MAK-01",
            "name": "Akono"
          },
          {
            "code": "CE-MAK-02",
            "name": "Bikok"
          },
          {
            "code": "CE-MAK-03",
            "name": "Mbankomo"
          },
          {
            "code": "CE-MAK-04",
            "name": "Ngoumou"
          }
        ]
      },
      {
        "code": "CE-MFO",
        "name": "Mfoundi",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-MFO-01",
            "name": "Yaoundé I"
          },
          {
            "code": "CE-MFO-02",
            "name": "Yaoundé II"
          },
          {
            "code": "CE-MFO-03",
            "name": "Yaoundé III"
          },
          {
            "code": "CE-MFO-04",
            "name": "Yaoundé IV"
          },
          {
            "code": "CE-MFO-05",
            "name": "Yaoundé V"
          },
          {
            "code": "CE-MFO-06",
            "name": "Yaoundé VI"
          },
          {
            "code": "CE-MFO-07",
            "name": "Yaoundé VII"
          }
        ]
      },
      {
        "code": "CE-NKE",
        "name": "Nyong-et-Kéllé",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-NKE-01",
            "name": "Biyouha"
          },
          {
            "code": "CE-NKE-02",
            "name": "Bondjock"
          },
          {
            "code": "CE-NKE-03",
            "name": "Bot-Makak"
          },
          {
            "code": "CE-NKE-04",
            "name": "Dibang"
          },
          {
            "code": "CE-NKE-05",
            "name": "Éséka"
          },
          {
            "code": "CE-NKE-06",
            "name": "Makak"
          },
          {
            "code": "CE-NKE-07",
            "name": "Matomb"
          },
          {
            "code": "CE-NKE-08",
            "name": "Messondo"
          },
          {
            "code": "CE-NKE-09",
            "name": "Ngog-Mapubi"
          },
          {
            "code": "CE-NKE-10",
            "name": "Nguibassal"
          }
        ]
      },
      {
        "code": "CE-NMF",
        "name": "Nyong-et-Mfoumou",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-NMF-01",
            "name": "Akonolinga"
          },
          {
            "code": "CE-NMF-02",
            "name": "Ayos"
          },
          {
            "code": "CE-NMF-03",
            "name": "Endom"
          },
          {
            "code": "CE-NMF-04",
            "name": "Mengang"
          },
          {
            "code": "CE-NMF-05",
            "name": "Nyakokombo"
          }
        ]
      },
      {
        "code": "CE-NSO",
        "name": "Nyong-et-So'o",
        "chefLieu": "",
        "arrondissements": [
          {
            "code": "CE-NSO-01",
            "name": "Akoeman"
          },
          {
            "code": "CE-NSO-02",
            "name": "Dzeng"
          },
          {
            "code": "CE-NSO-03",
            "name": "Mbalmayo"
          },
          {
            "code": "CE-NSO-04",
            "name": "Menguémé"
          },
          {
            "code": "CE-NSO-05",
            "name": "Ngomedzap"
          },
          {
            "code": "CE-NSO-06",
            "name": "Nkolmetet"
          }
        ]
      }
    ]
  },
  {
    "code": "ES",
    "name": "Est",
    "chefLieu": "Bertoua",
    "departments": [
      {
        "code": "ES-BNG",
        "name": "Boumba-et-Ngoko",
        "chefLieu": "Yokadouma",
        "arrondissements": [
          {
            "code": "ES-BNG-01",
            "name": "Gari-Gombo"
          },
          {
            "code": "ES-BNG-02",
            "name": "Moloundou"
          },
          {
            "code": "ES-BNG-03",
            "name": "Salapoumbé"
          },
          {
            "code": "ES-BNG-04",
            "name": "Yokadouma"
          }
        ]
      },
      {
        "code": "ES-HNY",
        "name": "Haut-Nyong",
        "chefLieu": "Abong-Mbang",
        "arrondissements": [
          {
            "code": "ES-HNY-01",
            "name": "Abong-Mbang"
          },
          {
            "code": "ES-HNY-02",
            "name": "Bebend"
          },
          {
            "code": "ES-HNY-03",
            "name": "Dimako"
          },
          {
            "code": "ES-HNY-04",
            "name": "Dja"
          },
          {
            "code": "ES-HNY-05",
            "name": "Doumaintang"
          },
          {
            "code": "ES-HNY-06",
            "name": "Doumé"
          },
          {
            "code": "ES-HNY-07",
            "name": "Lomié"
          },
          {
            "code": "ES-HNY-08",
            "name": "Mboanz"
          },
          {
            "code": "ES-HNY-09",
            "name": "Mboma"
          },
          {
            "code": "ES-HNY-10",
            "name": "Messamena"
          },
          {
            "code": "ES-HNY-11",
            "name": "Messok"
          },
          {
            "code": "ES-HNY-12",
            "name": "Ngoyla"
          },
          {
            "code": "ES-HNY-13",
            "name": "Nguélémendouka"
          },
          {
            "code": "ES-HNY-14",
            "name": "Somalomo"
          }
        ]
      },
      {
        "code": "ES-KAD",
        "name": "Kadey",
        "chefLieu": "Batouri",
        "arrondissements": [
          {
            "code": "ES-KAD-01",
            "name": "Batouri"
          },
          {
            "code": "ES-KAD-02",
            "name": "Bombé"
          },
          {
            "code": "ES-KAD-03",
            "name": "Kétté"
          },
          {
            "code": "ES-KAD-04",
            "name": "Mbang"
          },
          {
            "code": "ES-KAD-05",
            "name": "Mbotoro"
          },
          {
            "code": "ES-KAD-06",
            "name": "Ndélélé"
          },
          {
            "code": "ES-KAD-07",
            "name": "Ndem-Nam"
          }
        ]
      },
      {
        "code": "ES-LDJ",
        "name": "Lom-et-Djérem",
        "chefLieu": "Bertoua",
        "arrondissements": [
          {
            "code": "ES-LDJ-01",
            "name": "Bélabo"
          },
          {
            "code": "ES-LDJ-02",
            "name": "Bertoua I"
          },
          {
            "code": "ES-LDJ-03",
            "name": "Bertoua II"
          },
          {
            "code": "ES-LDJ-04",
            "name": "Bétaré-Oya"
          },
          {
            "code": "ES-LDJ-05",
            "name": "Diang"
          },
          {
            "code": "ES-LDJ-06",
            "name": "Garoua-Boulaï"
          },
          {
            "code": "ES-LDJ-07",
            "name": "Mandjou"
          },
          {
            "code": "ES-LDJ-08",
            "name": "Ngoura"
          }
        ]
      }
    ]
  },
  {
    "code": "EN",
    "name": "Extrême-Nord",
    "chefLieu": "Maroua",
    "departments": [
      {
        "code": "EN-DIA",
        "name": "Diamaré",
        "chefLieu": "Maroua",
        "arrondissements": [
          {
            "code": "EN-DIA-01",
            "name": "Bogo"
          },
          {
            "code": "EN-DIA-02",
            "name": "Dargala"
          },
          {
            "code": "EN-DIA-03",
            "name": "Gazawa"
          },
          {
            "code": "EN-DIA-04",
            "name": "Maroua I"
          },
          {
            "code": "EN-DIA-05",
            "name": "Maroua II"
          },
          {
            "code": "EN-DIA-06",
            "name": "Maroua III"
          },
          {
            "code": "EN-DIA-07",
            "name": "Méri"
          },
          {
            "code": "EN-DIA-08",
            "name": "Ndoukoula"
          },
          {
            "code": "EN-DIA-09",
            "name": "Petté"
          }
        ]
      },
      {
        "code": "EN-LCH",
        "name": "Logone-et-Chari",
        "chefLieu": "Kousséri",
        "arrondissements": [
          {
            "code": "EN-LCH-01",
            "name": "Blangoua"
          },
          {
            "code": "EN-LCH-02",
            "name": "Darak"
          },
          {
            "code": "EN-LCH-03",
            "name": "Fotokol"
          },
          {
            "code": "EN-LCH-04",
            "name": "Goulfey"
          },
          {
            "code": "EN-LCH-05",
            "name": "Hilé-Alifa"
          },
          {
            "code": "EN-LCH-06",
            "name": "Kousséri"
          },
          {
            "code": "EN-LCH-07",
            "name": "Logone-Birni"
          },
          {
            "code": "EN-LCH-08",
            "name": "Makary"
          },
          {
            "code": "EN-LCH-09",
            "name": "Waza"
          },
          {
            "code": "EN-LCH-10",
            "name": "Zina"
          }
        ]
      },
      {
        "code": "EN-MDA",
        "name": "Mayo-Danay",
        "chefLieu": "Yagoua",
        "arrondissements": [
          {
            "code": "EN-MDA-01",
            "name": "Datcheka"
          },
          {
            "code": "EN-MDA-02",
            "name": "Gobo"
          },
          {
            "code": "EN-MDA-03",
            "name": "Guéré"
          },
          {
            "code": "EN-MDA-04",
            "name": "Kaï-Kaï"
          },
          {
            "code": "EN-MDA-05",
            "name": "Kalfou"
          },
          {
            "code": "EN-MDA-06",
            "name": "Kar-Hay"
          },
          {
            "code": "EN-MDA-07",
            "name": "Maga"
          },
          {
            "code": "EN-MDA-08",
            "name": "Tchati-Bali"
          },
          {
            "code": "EN-MDA-09",
            "name": "Vélé"
          },
          {
            "code": "EN-MDA-10",
            "name": "Wina"
          },
          {
            "code": "EN-MDA-11",
            "name": "Yagoua"
          }
        ]
      },
      {
        "code": "EN-MKA",
        "name": "Mayo-Kani",
        "chefLieu": "Kaélé",
        "arrondissements": [
          {
            "code": "EN-MKA-01",
            "name": "Guidiguis"
          },
          {
            "code": "EN-MKA-02",
            "name": "Kaélé"
          },
          {
            "code": "EN-MKA-03",
            "name": "Mindif"
          },
          {
            "code": "EN-MKA-04",
            "name": "Moulvoudaye"
          },
          {
            "code": "EN-MKA-05",
            "name": "Moutourwa"
          },
          {
            "code": "EN-MKA-06",
            "name": "Porhi"
          },
          {
            "code": "EN-MKA-07",
            "name": "Taibong"
          }
        ]
      },
      {
        "code": "EN-MSA",
        "name": "Mayo-Sava",
        "chefLieu": "Mora",
        "arrondissements": [
          {
            "code": "EN-MSA-01",
            "name": "Kolofata"
          },
          {
            "code": "EN-MSA-02",
            "name": "Mora"
          },
          {
            "code": "EN-MSA-03",
            "name": "Tokombéré"
          }
        ]
      },
      {
        "code": "EN-MTS",
        "name": "Mayo-Tsanaga",
        "chefLieu": "Mokolo",
        "arrondissements": [
          {
            "code": "EN-MTS-01",
            "name": "Bourrha"
          },
          {
            "code": "EN-MTS-02",
            "name": "Hina"
          },
          {
            "code": "EN-MTS-03",
            "name": "Koza"
          },
          {
            "code": "EN-MTS-04",
            "name": "Mayo-Moskota"
          },
          {
            "code": "EN-MTS-05",
            "name": "Mogode"
          },
          {
            "code": "EN-MTS-06",
            "name": "Mokolo"
          },
          {
            "code": "EN-MTS-07",
            "name": "Soulédé-Roua"
          }
        ]
      }
    ]
  },
  {
    "code": "LT",
    "name": "Littoral",
    "chefLieu": "Douala",
    "departments": [
      {
        "code": "LT-MOU",
        "name": "Moungo",
        "chefLieu": "Nkongsamba",
        "arrondissements": [
          {
            "code": "LT-MOU-01",
            "name": "Baré-Bakem"
          },
          {
            "code": "LT-MOU-02",
            "name": "Dibombari"
          },
          {
            "code": "LT-MOU-03",
            "name": "Fiko"
          },
          {
            "code": "LT-MOU-04",
            "name": "Loum"
          },
          {
            "code": "LT-MOU-05",
            "name": "Manjo"
          },
          {
            "code": "LT-MOU-06",
            "name": "Mbanga"
          },
          {
            "code": "LT-MOU-07",
            "name": "Melong"
          },
          {
            "code": "LT-MOU-08",
            "name": "Mombo"
          },
          {
            "code": "LT-MOU-09",
            "name": "Njombe-Penja"
          },
          {
            "code": "LT-MOU-10",
            "name": "Nkongsamba I"
          },
          {
            "code": "LT-MOU-11",
            "name": "Nkongsamba II"
          },
          {
            "code": "LT-MOU-12",
            "name": "Nkongsamba III"
          },
          {
            "code": "LT-MOU-13",
            "name": "Nlonako"
          }
        ]
      },
      {
        "code": "LT-NKA",
        "name": "Nkam",
        "chefLieu": "Yabassi",
        "arrondissements": [
          {
            "code": "LT-NKA-01",
            "name": "Nkondjock"
          },
          {
            "code": "LT-NKA-02",
            "name": "Nord-Makombé"
          },
          {
            "code": "LT-NKA-03",
            "name": "Yabassi"
          },
          {
            "code": "LT-NKA-04",
            "name": "Yingui"
          }
        ]
      },
      {
        "code": "LT-SMA",
        "name": "Sanaga-Maritime",
        "chefLieu": "Édéa",
        "arrondissements": [
          {
            "code": "LT-SMA-01",
            "name": "Dibamba"
          },
          {
            "code": "LT-SMA-02",
            "name": "Dizangué"
          },
          {
            "code": "LT-SMA-03",
            "name": "Édéa I"
          },
          {
            "code": "LT-SMA-04",
            "name": "Édéa II"
          },
          {
            "code": "LT-SMA-05",
            "name": "Massock-Songloulou"
          },
          {
            "code": "LT-SMA-06",
            "name": "Mouanko"
          },
          {
            "code": "LT-SMA-07",
            "name": "Ndom"
          },
          {
            "code": "LT-SMA-08",
            "name": "Ngambè"
          },
          {
            "code": "LT-SMA-09",
            "name": "Ngwei"
          },
          {
            "code": "LT-SMA-10",
            "name": "Nyanon"
          },
          {
            "code": "LT-SMA-11",
            "name": "Pouma"
          }
        ]
      },
      {
        "code": "LT-WOU",
        "name": "Wouri",
        "chefLieu": "Douala",
        "arrondissements": [
          {
            "code": "LT-WOU-01",
            "name": "Douala I"
          },
          {
            "code": "LT-WOU-02",
            "name": "Douala II"
          },
          {
            "code": "LT-WOU-03",
            "name": "Douala III"
          },
          {
            "code": "LT-WOU-04",
            "name": "Douala IV"
          },
          {
            "code": "LT-WOU-05",
            "name": "Douala V"
          },
          {
            "code": "LT-WOU-06",
            "name": "Douala VI"
          }
        ]
      }
    ]
  },
  {
    "code": "NO",
    "name": "Nord",
    "chefLieu": "Garoua",
    "departments": [
      {
        "code": "NO-BEN",
        "name": "Bénoué",
        "chefLieu": "Garoua",
        "arrondissements": [
          {
            "code": "NO-BEN-01",
            "name": "Baschéo"
          },
          {
            "code": "NO-BEN-02",
            "name": "Bibemi"
          },
          {
            "code": "NO-BEN-03",
            "name": "Dembo"
          },
          {
            "code": "NO-BEN-04",
            "name": "Demsa"
          },
          {
            "code": "NO-BEN-05",
            "name": "Garoua I"
          },
          {
            "code": "NO-BEN-06",
            "name": "Garoua II"
          },
          {
            "code": "NO-BEN-07",
            "name": "Garoua III"
          },
          {
            "code": "NO-BEN-08",
            "name": "Lagdo"
          },
          {
            "code": "NO-BEN-09",
            "name": "Mayo-Hourna"
          },
          {
            "code": "NO-BEN-10",
            "name": "Pitoa"
          },
          {
            "code": "NO-BEN-11",
            "name": "Tcheboa"
          },
          {
            "code": "NO-BEN-12",
            "name": "Touroua"
          }
        ]
      },
      {
        "code": "NO-FAR",
        "name": "Faro",
        "chefLieu": "Poli",
        "arrondissements": [
          {
            "code": "NO-FAR-01",
            "name": "Béka"
          },
          {
            "code": "NO-FAR-02",
            "name": "Poli"
          }
        ]
      },
      {
        "code": "NO-MLO",
        "name": "Mayo-Louti",
        "chefLieu": "Guider",
        "arrondissements": [
          {
            "code": "NO-MLO-01",
            "name": "Figuil"
          },
          {
            "code": "NO-MLO-02",
            "name": "Guider"
          },
          {
            "code": "NO-MLO-03",
            "name": "Mayo-Oulo"
          }
        ]
      },
      {
        "code": "NO-MRE",
        "name": "Mayo-Rey",
        "chefLieu": "Tcholliré",
        "arrondissements": [
          {
            "code": "NO-MRE-01",
            "name": "Madingring"
          },
          {
            "code": "NO-MRE-02",
            "name": "Rey-Bouba"
          },
          {
            "code": "NO-MRE-03",
            "name": "Tcholliré"
          },
          {
            "code": "NO-MRE-04",
            "name": "Touboro"
          }
        ]
      }
    ]
  },
  {
    "code": "NW",
    "name": "Nord-Ouest",
    "chefLieu": "Bamenda",
    "departments": [
      {
        "code": "NW-BOY",
        "name": "Boyo",
        "chefLieu": "Fundong",
        "arrondissements": [
          {
            "code": "NW-BOY-01",
            "name": "Belo"
          },
          {
            "code": "NW-BOY-02",
            "name": "Bum"
          },
          {
            "code": "NW-BOY-03",
            "name": "Fundong"
          },
          {
            "code": "NW-BOY-04",
            "name": "Njinikom"
          }
        ]
      },
      {
        "code": "NW-BUI",
        "name": "Bui",
        "chefLieu": "Kumbo",
        "arrondissements": [
          {
            "code": "NW-BUI-01",
            "name": "Jakiri"
          },
          {
            "code": "NW-BUI-02",
            "name": "Kumbo"
          },
          {
            "code": "NW-BUI-03",
            "name": "Mbven"
          },
          {
            "code": "NW-BUI-04",
            "name": "Nkum"
          },
          {
            "code": "NW-BUI-05",
            "name": "Noni"
          },
          {
            "code": "NW-BUI-06",
            "name": "Oku"
          }
        ]
      },
      {
        "code": "NW-DMA",
        "name": "Donga-Mantung",
        "chefLieu": "Nkambé",
        "arrondissements": [
          {
            "code": "NW-DMA-01",
            "name": "Ako"
          },
          {
            "code": "NW-DMA-02",
            "name": "Misaje"
          },
          {
            "code": "NW-DMA-03",
            "name": "Ndu"
          },
          {
            "code": "NW-DMA-04",
            "name": "Nkambé"
          },
          {
            "code": "NW-DMA-05",
            "name": "Nwa"
          }
        ]
      },
      {
        "code": "NW-MCH",
        "name": "Menchum",
        "chefLieu": "Wum",
        "arrondissements": [
          {
            "code": "NW-MCH-01",
            "name": "Fungom"
          },
          {
            "code": "NW-MCH-02",
            "name": "Furu-Awa"
          },
          {
            "code": "NW-MCH-03",
            "name": "Menchum Valley"
          },
          {
            "code": "NW-MCH-04",
            "name": "Wum"
          }
        ]
      },
      {
        "code": "NW-MEZ",
        "name": "Mezam",
        "chefLieu": "Bamenda",
        "arrondissements": [
          {
            "code": "NW-MEZ-01",
            "name": "Bafut"
          },
          {
            "code": "NW-MEZ-02",
            "name": "Bali"
          },
          {
            "code": "NW-MEZ-03",
            "name": "Bamenda I"
          },
          {
            "code": "NW-MEZ-04",
            "name": "Bamenda II"
          },
          {
            "code": "NW-MEZ-05",
            "name": "Bamenda III"
          },
          {
            "code": "NW-MEZ-06",
            "name": "Santa"
          },
          {
            "code": "NW-MEZ-07",
            "name": "Tubah"
          }
        ]
      },
      {
        "code": "NW-MOM",
        "name": "Momo",
        "chefLieu": "Mbengwi",
        "arrondissements": [
          {
            "code": "NW-MOM-01",
            "name": "Batibo"
          },
          {
            "code": "NW-MOM-02",
            "name": "Mbengwi"
          },
          {
            "code": "NW-MOM-03",
            "name": "Ngie"
          },
          {
            "code": "NW-MOM-04",
            "name": "Njikwa"
          },
          {
            "code": "NW-MOM-05",
            "name": "Widikum-Menka"
          }
        ]
      },
      {
        "code": "NW-NKE",
        "name": "Ngo-Ketunjia",
        "chefLieu": "Ndop",
        "arrondissements": [
          {
            "code": "NW-NKE-01",
            "name": "Babessi"
          },
          {
            "code": "NW-NKE-02",
            "name": "Balikumbat"
          },
          {
            "code": "NW-NKE-03",
            "name": "Ndop"
          }
        ]
      }
    ]
  },
  {
    "code": "OU",
    "name": "Ouest",
    "chefLieu": "Bafoussam",
    "departments": [
      {
        "code": "OU-BAM",
        "name": "Bamboutos",
        "chefLieu": "Mbouda",
        "arrondissements": [
          {
            "code": "OU-BAM-01",
            "name": "Babadjou"
          },
          {
            "code": "OU-BAM-02",
            "name": "Batcham"
          },
          {
            "code": "OU-BAM-03",
            "name": "Galim"
          },
          {
            "code": "OU-BAM-04",
            "name": "Mbouda"
          }
        ]
      },
      {
        "code": "OU-HNK",
        "name": "Haut-Nkam",
        "chefLieu": "Bafang",
        "arrondissements": [
          {
            "code": "OU-HNK-01",
            "name": "Bafang"
          },
          {
            "code": "OU-HNK-02",
            "name": "Bakou"
          },
          {
            "code": "OU-HNK-03",
            "name": "Bana"
          },
          {
            "code": "OU-HNK-04",
            "name": "Bandja"
          },
          {
            "code": "OU-HNK-05",
            "name": "Banka"
          },
          {
            "code": "OU-HNK-06",
            "name": "Banwa"
          },
          {
            "code": "OU-HNK-07",
            "name": "Kékem"
          }
        ]
      },
      {
        "code": "OU-HPL",
        "name": "Hauts-Plateaux",
        "chefLieu": "Baham",
        "arrondissements": [
          {
            "code": "OU-HPL-01",
            "name": "Baham"
          },
          {
            "code": "OU-HPL-02",
            "name": "Bamendjou"
          },
          {
            "code": "OU-HPL-03",
            "name": "Bangou"
          },
          {
            "code": "OU-HPL-04",
            "name": "Batié"
          }
        ]
      },
      {
        "code": "OU-KKH",
        "name": "Koung-Khi",
        "chefLieu": "Bandjoun",
        "arrondissements": [
          {
            "code": "OU-KKH-01",
            "name": "Bayangam"
          },
          {
            "code": "OU-KKH-02",
            "name": "Djebem"
          },
          {
            "code": "OU-KKH-03",
            "name": "Poumougne"
          }
        ]
      },
      {
        "code": "OU-MEN",
        "name": "Menoua",
        "chefLieu": "Dschang",
        "arrondissements": [
          {
            "code": "OU-MEN-01",
            "name": "Dschang"
          },
          {
            "code": "OU-MEN-02",
            "name": "Fokoué"
          },
          {
            "code": "OU-MEN-03",
            "name": "Fongo-Tongo"
          },
          {
            "code": "OU-MEN-04",
            "name": "Nkong-Ni"
          },
          {
            "code": "OU-MEN-05",
            "name": "Penka-Michel"
          },
          {
            "code": "OU-MEN-06",
            "name": "Santchou"
          }
        ]
      },
      {
        "code": "OU-MIF",
        "name": "Mifi",
        "chefLieu": "Bafoussam",
        "arrondissements": [
          {
            "code": "OU-MIF-01",
            "name": "Bafoussam I"
          },
          {
            "code": "OU-MIF-02",
            "name": "Bafoussam II"
          },
          {
            "code": "OU-MIF-03",
            "name": "Bafoussam III"
          }
        ]
      },
      {
        "code": "OU-NDE",
        "name": "Ndé",
        "chefLieu": "Bangangté",
        "arrondissements": [
          {
            "code": "OU-NDE-01",
            "name": "Bangangté"
          },
          {
            "code": "OU-NDE-02",
            "name": "Bassamba"
          },
          {
            "code": "OU-NDE-03",
            "name": "Bazou"
          },
          {
            "code": "OU-NDE-04",
            "name": "Tonga"
          }
        ]
      },
      {
        "code": "OU-NOU",
        "name": "Noun",
        "chefLieu": "Foumban",
        "arrondissements": [
          {
            "code": "OU-NOU-01",
            "name": "Bangourain"
          },
          {
            "code": "OU-NOU-02",
            "name": "Foumban"
          },
          {
            "code": "OU-NOU-03",
            "name": "Foumbot"
          },
          {
            "code": "OU-NOU-04",
            "name": "Kouoptamo"
          },
          {
            "code": "OU-NOU-05",
            "name": "Koutaba"
          },
          {
            "code": "OU-NOU-06",
            "name": "Magba"
          },
          {
            "code": "OU-NOU-07",
            "name": "Malentouen"
          },
          {
            "code": "OU-NOU-08",
            "name": "Massangam"
          },
          {
            "code": "OU-NOU-09",
            "name": "Njimom"
          }
        ]
      }
    ]
  },
  {
    "code": "SU",
    "name": "Sud",
    "chefLieu": "Ebolowa",
    "departments": [
      {
        "code": "SU-DLO",
        "name": "Dja-et-Lobo",
        "chefLieu": "Sangmélima",
        "arrondissements": [
          {
            "code": "SU-DLO-01",
            "name": "Bengbis"
          },
          {
            "code": "SU-DLO-02",
            "name": "Djoum"
          },
          {
            "code": "SU-DLO-03",
            "name": "Meyomessala"
          },
          {
            "code": "SU-DLO-04",
            "name": "Meyomessi"
          },
          {
            "code": "SU-DLO-05",
            "name": "Mintom"
          },
          {
            "code": "SU-DLO-06",
            "name": "Oveng"
          },
          {
            "code": "SU-DLO-07",
            "name": "Sangmélima"
          },
          {
            "code": "SU-DLO-08",
            "name": "Zoétélé"
          }
        ]
      },
      {
        "code": "SU-MVI",
        "name": "Mvila",
        "chefLieu": "Ebolowa",
        "arrondissements": [
          {
            "code": "SU-MVI-01",
            "name": "Biwong-Bane"
          },
          {
            "code": "SU-MVI-02",
            "name": "Biwong-Bulu"
          },
          {
            "code": "SU-MVI-03",
            "name": "Ebolowa I"
          },
          {
            "code": "SU-MVI-04",
            "name": "Ebolowa II"
          },
          {
            "code": "SU-MVI-05",
            "name": "Efoulan"
          },
          {
            "code": "SU-MVI-06",
            "name": "Mengong"
          },
          {
            "code": "SU-MVI-07",
            "name": "Mvangan"
          },
          {
            "code": "SU-MVI-08",
            "name": "Ngoulemakong"
          }
        ]
      },
      {
        "code": "SU-OCE",
        "name": "Océan",
        "chefLieu": "Kribi",
        "arrondissements": [
          {
            "code": "SU-OCE-01",
            "name": "Akom II"
          },
          {
            "code": "SU-OCE-02",
            "name": "Bipindi"
          },
          {
            "code": "SU-OCE-03",
            "name": "Campo"
          },
          {
            "code": "SU-OCE-04",
            "name": "Kribi I"
          },
          {
            "code": "SU-OCE-05",
            "name": "Kribi II"
          },
          {
            "code": "SU-OCE-06",
            "name": "Lokoundjé"
          },
          {
            "code": "SU-OCE-07",
            "name": "Lolodorf"
          },
          {
            "code": "SU-OCE-08",
            "name": "Mvengue"
          },
          {
            "code": "SU-OCE-09",
            "name": "Niété"
          }
        ]
      },
      {
        "code": "SU-VNT",
        "name": "Vallée-du-Ntem",
        "chefLieu": "Ambam",
        "arrondissements": [
          {
            "code": "SU-VNT-01",
            "name": "Ambam"
          },
          {
            "code": "SU-VNT-02",
            "name": "Kyé-Ossi"
          },
          {
            "code": "SU-VNT-03",
            "name": "Ma'an"
          },
          {
            "code": "SU-VNT-04",
            "name": "Olamzé"
          }
        ]
      }
    ]
  },
  {
    "code": "SW",
    "name": "Sud-Ouest",
    "chefLieu": "Buéa",
    "departments": [
      {
        "code": "SW-FAK",
        "name": "Fako",
        "chefLieu": "Limbé",
        "arrondissements": [
          {
            "code": "SW-FAK-01",
            "name": "Buéa"
          },
          {
            "code": "SW-FAK-02",
            "name": "Limbé I"
          },
          {
            "code": "SW-FAK-03",
            "name": "Limbé II"
          },
          {
            "code": "SW-FAK-04",
            "name": "Limbé III"
          },
          {
            "code": "SW-FAK-05",
            "name": "Muyuka"
          },
          {
            "code": "SW-FAK-06",
            "name": "Tiko"
          },
          {
            "code": "SW-FAK-07",
            "name": "West Coast"
          }
        ]
      },
      {
        "code": "SW-KMA",
        "name": "Koupé-Manengouba",
        "chefLieu": "Bangem",
        "arrondissements": [
          {
            "code": "SW-KMA-01",
            "name": "Bangem"
          },
          {
            "code": "SW-KMA-02",
            "name": "Nguti"
          },
          {
            "code": "SW-KMA-03",
            "name": "Tombel"
          }
        ]
      },
      {
        "code": "SW-LEB",
        "name": "Lebialem",
        "chefLieu": "Menji",
        "arrondissements": [
          {
            "code": "SW-LEB-01",
            "name": "Alou"
          },
          {
            "code": "SW-LEB-02",
            "name": "Fontem"
          },
          {
            "code": "SW-LEB-03",
            "name": "Wabane"
          }
        ]
      },
      {
        "code": "SW-MAN",
        "name": "Manyu",
        "chefLieu": "Mamfé",
        "arrondissements": [
          {
            "code": "SW-MAN-01",
            "name": "Akwaya"
          },
          {
            "code": "SW-MAN-02",
            "name": "Eyumodjock"
          },
          {
            "code": "SW-MAN-03",
            "name": "Mamfé"
          },
          {
            "code": "SW-MAN-04",
            "name": "Upper Bayang"
          }
        ]
      },
      {
        "code": "SW-MEM",
        "name": "Meme",
        "chefLieu": "Kumba",
        "arrondissements": [
          {
            "code": "SW-MEM-01",
            "name": "Konye"
          },
          {
            "code": "SW-MEM-02",
            "name": "Kumba I"
          },
          {
            "code": "SW-MEM-03",
            "name": "Kumba II"
          },
          {
            "code": "SW-MEM-04",
            "name": "Kumba III"
          },
          {
            "code": "SW-MEM-05",
            "name": "Mbonge"
          }
        ]
      },
      {
        "code": "SW-NDI",
        "name": "Ndian",
        "chefLieu": "Mundemba",
        "arrondissements": [
          {
            "code": "SW-NDI-01",
            "name": "Bamusso"
          },
          {
            "code": "SW-NDI-02",
            "name": "Dikome-Balue"
          },
          {
            "code": "SW-NDI-03",
            "name": "Ekondo-Titi"
          },
          {
            "code": "SW-NDI-04",
            "name": "Idabato"
          },
          {
            "code": "SW-NDI-05",
            "name": "Isanguele"
          },
          {
            "code": "SW-NDI-06",
            "name": "Kombo-Abedimo"
          },
          {
            "code": "SW-NDI-07",
            "name": "Kombo-Itindi"
          },
          {
            "code": "SW-NDI-08",
            "name": "Mundemba"
          },
          {
            "code": "SW-NDI-09",
            "name": "Toko"
          }
        ]
      }
    ]
  }
];
