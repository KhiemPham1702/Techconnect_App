import React, { Component } from 'react';
import { View, Text } from 'react-native';

import axios from 'axios';

export class Recommend_data extends React.Component {
    state = {};
    componentDidMount() {
        const user = {
            id: 'KH10',
            movie: '',
          };

          const rating = [
            {
             "Id_user": "KH10",
             "Id_product": 1,
             "Rating": 3
            },
            {
             "Id_user": "KH10",
             "Id_product": 36,
             "Rating": 3
            },
            {
             "Id_user": "KH02",
             "Id_product": 1,
             "Rating": 5
            },
            {
             "Id_user": "KH02",
             "Id_product": 37,
             "Rating": 5
            },
            {
             "Id_user": "KH03",
             "Id_product": 2,
             "Rating": 5
            },
            {
             "Id_user": "KH03",
             "Id_product": 38,
             "Rating": 5
            },
            {
             "Id_user": "KH04",
             "Id_product": 3,
             "Rating": 5
            },
            {
             "Id_user": "KH04",
             "Id_product": 39,
             "Rating": 4
            },
            {
             "Id_user": "KH05",
             "Id_product": 4,
             "Rating": 4
            },
            {
             "Id_user": "KH05",
             "Id_product": 40,
             "Rating": 4
            },
            {
             "Id_user": "KH06",
             "Id_product": 5,
             "Rating": 5
            },
            {
             "Id_user": "KH06",
             "Id_product": 41,
             "Rating": 3
            },
            {
             "Id_user": "KH07",
             "Id_product": 6,
             "Rating": 3
            },
            {
             "Id_user": "KH07",
             "Id_product": 42,
             "Rating": 4
            },
            {
             "Id_user": "KH08",
             "Id_product": 7,
             "Rating": 3
            },
            {
             "Id_user": "KH08",
             "Id_product": 43,
             "Rating": 3
            },
            {
             "Id_user": "KH09",
             "Id_product": 8,
             "Rating": 5
            },
            {
             "Id_user": "KH09",
             "Id_product": 44,
             "Rating": 3
            },
            {
             "Id_user": "KH09",
             "Id_product": 27,
             "Rating": 3
            },
            {
             "Id_user": "KH10",
             "Id_product": 9,
             "Rating": 3
            },
            {
             "Id_user": "KH10",
             "Id_product": 45,
             "Rating": 5
            },
            {
             "Id_user": "KH10",
             "Id_product": 28,
             "Rating": 5
            },
            {
             "Id_user": "KH11",
             "Id_product": 10,
             "Rating": 4
            },
            {
             "Id_user": "KH11",
             "Id_product": 23,
             "Rating": 5
            },
            {
             "Id_user": "KH11",
             "Id_product": 46,
             "Rating": 3
            },
            {
             "Id_user": "KH12",
             "Id_product": 11,
             "Rating": 3
            },
            {
             "Id_user": "KH12",
             "Id_product": 47,
             "Rating": 3
            },
            {
             "Id_user": "KH12",
             "Id_product": 1,
             "Rating": 3
            },
            {
             "Id_user": "KH13",
             "Id_product": 12,
             "Rating": 5
            },
            {
             "Id_user": "KH13",
             "Id_product": 48,
             "Rating": 3
            },
            {
             "Id_user": "KH13",
             "Id_product": 1,
             "Rating": 4
            },
            {
             "Id_user": "KH14",
             "Id_product": 13,
             "Rating": 4
            },
            {
             "Id_user": "KH14",
             "Id_product": 17,
             "Rating": 5
            },
            {
             "Id_user": "KH14",
             "Id_product": 2,
             "Rating": 4
            },
            {
             "Id_user": "KH15",
             "Id_product": 14,
             "Rating": 5
            },
            {
             "Id_user": "KH15",
             "Id_product": 24,
             "Rating": 4
            },
            {
             "Id_user": "KH15",
             "Id_product": 18,
             "Rating": 4
            },
            {
             "Id_user": "KH15",
             "Id_product": 3,
             "Rating": 4
            },
            {
             "Id_user": "KH16",
             "Id_product": 15,
             "Rating": 3
            },
            {
             "Id_user": "KH16",
             "Id_product": 19,
             "Rating": 4
            },
            {
             "Id_user": "KH16",
             "Id_product": 4,
             "Rating": 4
            },
            {
             "Id_user": "KH17",
             "Id_product": 16,
             "Rating": 4
            },
            {
             "Id_user": "KH17",
             "Id_product": 20,
             "Rating": 4
            },
            {
             "Id_user": "KH17",
             "Id_product": 5,
             "Rating": 3
            },
            {
             "Id_user": "KH18",
             "Id_product": 17,
             "Rating": 4
            },
            {
             "Id_user": "KH18",
             "Id_product": 21,
             "Rating": 5
            },
            {
             "Id_user": "KH18",
             "Id_product": 6,
             "Rating": 3
            },
            {
             "Id_user": "KH19",
             "Id_product": 18,
             "Rating": 5
            },
            {
             "Id_user": "KH19",
             "Id_product": 22,
             "Rating": 5
            },
            {
             "Id_user": "KH19",
             "Id_product": 7,
             "Rating": 4
            },
            {
             "Id_user": "KH20",
             "Id_product": 19,
             "Rating": 4
            },
            {
             "Id_user": "KH20",
             "Id_product": 23,
             "Rating": 5
            },
            {
             "Id_user": "KH20",
             "Id_product": 8,
             "Rating": 4
            },
            {
             "Id_user": "KH21",
             "Id_product": 20,
             "Rating": 3
            },
            {
             "Id_user": "KH21",
             "Id_product": 24,
             "Rating": 5
            },
            {
             "Id_user": "KH21",
             "Id_product": 9,
             "Rating": 4
            },
            {
             "Id_user": "KH22",
             "Id_product": 21,
             "Rating": 4
            },
            {
             "Id_user": "KH22",
             "Id_product": 29,
             "Rating": 4
            },
            {
             "Id_user": "KH22",
             "Id_product": 25,
             "Rating": 3
            },
            {
             "Id_user": "KH23",
             "Id_product": 22,
             "Rating": 5
            },
            {
             "Id_user": "KH23",
             "Id_product": 30,
             "Rating": 4
            },
            {
             "Id_user": "KH23",
             "Id_product": 26,
             "Rating": 5
            },
            {
             "Id_user": "KH24",
             "Id_product": 23,
             "Rating": 5
            },
            {
             "Id_user": "KH25",
             "Id_product": 24,
             "Rating": 5
            },
            {
             "Id_user": "KH26",
             "Id_product": 25,
             "Rating": 4
            },
            {
             "Id_user": "KH27",
             "Id_product": 26,
             "Rating": 5
            },
            {
             "Id_user": "KH28",
             "Id_product": 27,
             "Rating": 4
            },
            {
             "Id_user": "KH29",
             "Id_product": 28,
             "Rating": 5
            },
            {
             "Id_user": "KH29",
             "Id_product": 23,
             "Rating": 4
            },
            {
             "Id_user": "KH30",
             "Id_product": 29,
             "Rating": 4
            },
            {
             "Id_user": "KH30",
             "Id_product": 24,
             "Rating": 3
            },
            {
             "Id_user": "KH31",
             "Id_product": 30,
             "Rating": 3
            },
            {
             "Id_user": "KH31",
             "Id_product": 25,
             "Rating": 3
            },
            {
             "Id_user": "KH32",
             "Id_product": 31,
             "Rating": 3
            },
            {
             "Id_user": "KH32",
             "Id_product": 26,
             "Rating": 4
            },
            {
             "Id_user": "KH33",
             "Id_product": 32,
             "Rating": 5
            },
            {
             "Id_user": "KH33",
             "Id_product": 27,
             "Rating": 4
            },
            {
             "Id_user": "KH34",
             "Id_product": 33,
             "Rating": 5
            },
            {
             "Id_user": "KH34",
             "Id_product": 28,
             "Rating": 4
            },
            {
             "Id_user": "KH35",
             "Id_product": 34,
             "Rating": 5
            },
            {
             "Id_user": "KH35",
             "Id_product": 29,
             "Rating": 3
            },
            {
             "Id_user": "KH36",
             "Id_product": 35,
             "Rating": 3
            },
            {
             "Id_user": "KH36",
             "Id_product": 30,
             "Rating": 4
            },
            {
             "Id_user": "KH37",
             "Id_product": 36,
             "Rating": 4
            },
            {
             "Id_user": "KH37",
             "Id_product": 7,
             "Rating": 3
            },
            {
             "Id_user": "KH38",
             "Id_product": 37,
             "Rating": 4
            },
            {
             "Id_user": "KH38",
             "Id_product": 8,
             "Rating": 3
            },
            {
             "Id_user": "KH39",
             "Id_product": 38,
             "Rating": 5
            },
            {
             "Id_user": "KH39",
             "Id_product": 9,
             "Rating": 4
            },
            {
             "Id_user": "KH40",
             "Id_product": 39,
             "Rating": 3
            },
            {
             "Id_user": "KH40",
             "Id_product": 10,
             "Rating": 4
            },
            {
             "Id_user": "KH41",
             "Id_product": 40,
             "Rating": 5
            },
            {
             "Id_user": "KH41",
             "Id_product": 11,
             "Rating": 3
            },
            {
             "Id_user": "KH42",
             "Id_product": 41,
             "Rating": 3
            },
            {
             "Id_user": "KH42",
             "Id_product": 12,
             "Rating": 3
            },
            {
             "Id_user": "KH43",
             "Id_product": 42,
             "Rating": 3
            },
            {
             "Id_user": "KH43",
             "Id_product": 13,
             "Rating": 3
            },
            {
             "Id_user": "KH44",
             "Id_product": 43,
             "Rating": 3
            },
            {
             "Id_user": "KH44",
             "Id_product": 14,
             "Rating": 5
            },
            {
             "Id_user": "KH45",
             "Id_product": 44,
             "Rating": 5
            },
            {
             "Id_user": "KH45",
             "Id_product": 3,
             "Rating": 4
            },
            {
             "Id_user": "KH46",
             "Id_product": 45,
             "Rating": 3
            },
            {
             "Id_user": "KH46",
             "Id_product": 4,
             "Rating": 3
            },
            {
             "Id_user": "KH47",
             "Id_product": 46,
             "Rating": 5
            },
            {
             "Id_user": "KH47",
             "Id_product": 5,
             "Rating": 5
            },
            {
             "Id_user": "KH48",
             "Id_product": 47,
             "Rating": 4
            },
            {
             "Id_user": "KH48",
             "Id_product": 6,
             "Rating": 3
            },
            {
             "Id_user": "KH49",
             "Id_product": 48,
             "Rating": 5
            },
            {
             "Id_user": "KH49",
             "Id_product": 7,
             "Rating": 4
            },
            {
             "Id_user": "KH50",
             "Id_product": 49,
             "Rating": 3
            },
            {
             "Id_user": "KH50",
             "Id_product": 8,
             "Rating": 3
            },
            {
             "Id_user": "KH51",
             "Id_product": 50,
             "Rating": 4
            },
            {
             "Id_user": "KH51",
             "Id_product": 9,
             "Rating": 3
            },
            {
             "Id_user": "KH52",
             "Id_product": 51,
             "Rating": 4
            },
            {
             "Id_user": "KH52",
             "Id_product": 10,
             "Rating": 4
            },
            {
             "Id_user": "KH53",
             "Id_product": 52,
             "Rating": 4
            },
            {
             "Id_user": "KH53",
             "Id_product": 11,
             "Rating": 4
            },
            {
             "Id_user": "KH54",
             "Id_product": 53,
             "Rating": 4
            },
            {
             "Id_user": "KH54",
             "Id_product": 12,
             "Rating": 4
            },
            {
             "Id_user": "KH55",
             "Id_product": 54,
             "Rating": 4
            },
            {
             "Id_user": "KH55",
             "Id_product": 13,
             "Rating": 3
            },
            {
             "Id_user": "KH56",
             "Id_product": 55,
             "Rating": 5
            },
            {
             "Id_user": "KH56",
             "Id_product": 14,
             "Rating": 4
            },
            {
             "Id_user": "KH57",
             "Id_product": 56,
             "Rating": 5
            },
            {
             "Id_user": "KH57",
             "Id_product": 15,
             "Rating": 4
            },
            {
             "Id_user": "KH58",
             "Id_product": 57,
             "Rating": 3
            },
            {
             "Id_user": "KH58",
             "Id_product": 16,
             "Rating": 4
            },
            {
             "Id_user": "KH59",
             "Id_product": 58,
             "Rating": 5
            },
            {
             "Id_user": "KH59",
             "Id_product": 17,
             "Rating": 4
            },
            {
             "Id_user": "KH60",
             "Id_product": 3,
             "Rating": 4
            },
            {
             "Id_user": "KH60",
             "Id_product": 18,
             "Rating": 3
            },
            {
             "Id_user": "KH61",
             "Id_product": 4,
             "Rating": 3
            },
            {
             "Id_user": "KH61",
             "Id_product": 19,
             "Rating": 3
            },
            {
             "Id_user": "KH62",
             "Id_product": 5,
             "Rating": 3
            },
            {
             "Id_user": "KH62",
             "Id_product": 34,
             "Rating": 4
            },
            {
             "Id_user": "KH63",
             "Id_product": 6,
             "Rating": 4
            },
            {
             "Id_user": "KH63",
             "Id_product": 35,
             "Rating": 3
            },
            {
             "Id_user": "KH64",
             "Id_product": 7,
             "Rating": 5
            },
            {
             "Id_user": "KH64",
             "Id_product": 36,
             "Rating": 3
            },
            {
             "Id_user": "KH65",
             "Id_product": 8,
             "Rating": 5
            },
            {
             "Id_user": "KH65",
             "Id_product": 37,
             "Rating": 3
            },
            {
             "Id_user": "KH66",
             "Id_product": 9,
             "Rating": 4
            },
            {
             "Id_user": "KH66",
             "Id_product": 38,
             "Rating": 5
            },
            {
             "Id_user": "KH67",
             "Id_product": 36,
             "Rating": 3
            },
            {
             "Id_user": "KH67",
             "Id_product": 39,
             "Rating": 5
            },
            {
             "Id_user": "KH68",
             "Id_product": 37,
             "Rating": 5
            },
            {
             "Id_user": "KH68",
             "Id_product": 40,
             "Rating": 3
            },
            {
             "Id_user": "KH69",
             "Id_product": 38,
             "Rating": 3
            },
            {
             "Id_user": "KH69",
             "Id_product": 41,
             "Rating": 4
            },
            {
             "Id_user": "KH70",
             "Id_product": 39,
             "Rating": 4
            },
            {
             "Id_user": "KH70",
             "Id_product": 42,
             "Rating": 5
            },
            {
             "Id_user": "KH71",
             "Id_product": 40,
             "Rating": 4
            },
            {
             "Id_user": "KH71",
             "Id_product": 43,
             "Rating": 3
            },
            {
             "Id_user": "KH72",
             "Id_product": 41,
             "Rating": 4
            },
            {
             "Id_user": "KH72",
             "Id_product": 44,
             "Rating": 3
            },
            {
             "Id_user": "KH73",
             "Id_product": 42,
             "Rating": 4
            },
            {
             "Id_user": "KH73",
             "Id_product": 3,
             "Rating": 5
            },
            {
             "Id_user": "KH74",
             "Id_product": 43,
             "Rating": 5
            },
            {
             "Id_user": "KH74",
             "Id_product": 4,
             "Rating": 3
            },
            {
             "Id_user": "KH75",
             "Id_product": 44,
             "Rating": 5
            },
            {
             "Id_user": "KH75",
             "Id_product": 5,
             "Rating": 4
            },
            {
             "Id_user": "KH76",
             "Id_product": 45,
             "Rating": 3
            },
            {
             "Id_user": "KH76",
             "Id_product": 6,
             "Rating": 3
            },
            {
             "Id_user": "KH77",
             "Id_product": 46,
             "Rating": 5
            },
            {
             "Id_user": "KH77",
             "Id_product": 7,
             "Rating": 4
            },
            {
             "Id_user": "KH78",
             "Id_product": 47,
             "Rating": 5
            },
            {
             "Id_user": "KH78",
             "Id_product": 8,
             "Rating": 4
            },
            {
             "Id_user": "KH79",
             "Id_product": 48,
             "Rating": 3
            },
            {
             "Id_user": "KH79",
             "Id_product": 9,
             "Rating": 3
            },
            {
             "Id_user": "KH80",
             "Id_product": 17,
             "Rating": 5
            },
            {
             "Id_user": "KH80",
             "Id_product": 10,
             "Rating": 5
            },
            {
             "Id_user": "KH81",
             "Id_product": 18,
             "Rating": 4
            },
            {
             "Id_user": "KH81",
             "Id_product": 11,
             "Rating": 3
            },
            {
             "Id_user": "KH82",
             "Id_product": 19,
             "Rating": 5
            },
            {
             "Id_user": "KH82",
             "Id_product": 12,
             "Rating": 5
            },
            {
             "Id_user": "KH83",
             "Id_product": 20,
             "Rating": 4
            },
            {
             "Id_user": "KH83",
             "Id_product": 13,
             "Rating": 3
            },
            {
             "Id_user": "KH84",
             "Id_product": 21,
             "Rating": 3
            },
            {
             "Id_user": "KH84",
             "Id_product": 14,
             "Rating": 3
            },
            {
             "Id_user": "KH85",
             "Id_product": 22,
             "Rating": 5
            },
            {
             "Id_user": "KH85",
             "Id_product": 15,
             "Rating": 5
            },
            {
             "Id_user": "KH86",
             "Id_product": 25,
             "Rating": 3
            },
            {
             "Id_user": "KH86",
             "Id_product": 16,
             "Rating": 5
            },
            {
             "Id_user": "KH87",
             "Id_product": 26,
             "Rating": 3
            },
            {
             "Id_user": "KH87",
             "Id_product": 17,
             "Rating": 3
            },
            {
             "Id_user": "KH88",
             "Id_product": 27,
             "Rating": 3
            },
            {
             "Id_user": "KH88",
             "Id_product": 18,
             "Rating": 4
            },
            {
             "Id_user": "KH89",
             "Id_product": 28,
             "Rating": 4
            },
            {
             "Id_user": "KH89",
             "Id_product": 19,
             "Rating": 5
            }
           ];
           const product = [
            {
             "Id_product": 1,
             "Name_product": "Laptop ASUS Vivobook 15 X1502ZA BQ127W",
             "Brand": "ASUS",
             "Column4": "LT01"
            },
            {
             "Id_product": 2,
             "Name_product": "Laptop Asus ExpertBook B9400CEA KC1013W",
             "Brand": "ASUS",
             "Column4": "LT02"
            },
            {
             "Id_product": 3,
             "Name_product": "Laptop ASUS Zenbook 14 OLED UX3402VA KM085W",
             "Brand": "ASUS",
             "Column4": "LT03"
            },
            {
             "Id_product": 4,
             "Name_product": "Laptop ASUS VivoBook Pro 16X OLED N7600ZE L2010W",
             "Brand": "ASUS",
             "Column4": "LT04"
            },
            {
             "Id_product": 5,
             "Name_product": "Laptop gaming ASUS ROG Strix G15 G513IE HN246W",
             "Brand": "ASUS",
             "Column4": "LT05"
            },
            {
             "Id_product": 6,
             "Name_product": "Laptop gaming ASUS TUF Dash F15 FX517ZM HN480W",
             "Brand": "ASUS",
             "Column4": "LT06"
            },
            {
             "Id_product": 7,
             "Name_product": "Laptop gaming ASUS ROG Strix SCAR 17 SE G733CX LL6789W",
             "Brand": "ASUS",
             "Column4": "LT07"
            },
            {
             "Id_product": 8,
             "Name_product": "Laptop MSI Modern 14 C13M 458VN",
             "Brand": "MSI",
             "Column4": "LT08"
            },
            {
             "Id_product": 9,
             "Name_product": "Laptop MSI Summit E14 Evo A12M 211VN",
             "Brand": "MSI",
             "Column4": "LT09"
            },
            {
             "Id_product": 10,
             "Name_product": "Laptop MSI Creator Z16 A11UET 025VN",
             "Brand": "MSI",
             "Column4": "LT10"
            },
            {
             "Id_product": 11,
             "Name_product": "Laptop gaming MSI Katana GF66 11UC 698VN",
             "Brand": "MSI",
             "Column4": "LT11"
            },
            {
             "Id_product": 12,
             "Name_product": "Laptop Gaming MSI Katana GF66 11UC 676VN",
             "Brand": "MSI",
             "Column4": "LT12"
            },
            {
             "Id_product": 13,
             "Name_product": "Laptop gaming MSI Raider GE77HX 12UGS 230VN",
             "Brand": "MSI",
             "Column4": "LT13"
            },
            {
             "Id_product": 14,
             "Name_product": "Laptop Dell Inspiron 15 3520 i3U082W11BLU",
             "Brand": "Dell",
             "Column4": "LT14"
            },
            {
             "Id_product": 15,
             "Name_product": "Laptop Dell Inspiron 14 5420 I5u085w11slu",
             "Brand": "Dell",
             "Column4": "LT15"
            },
            {
             "Id_product": 16,
             "Name_product": "Laptop Dell Vostro 13 5320 V3I7005W Gray",
             "Brand": "Dell",
             "Column4": "LT16"
            },
            {
             "Id_product": 17,
             "Name_product": "Laptop Dell Inspiron 14 7420 1YT85",
             "Brand": "Dell",
             "Column4": "LT17"
            },
            {
             "Id_product": 18,
             "Name_product": "Laptop Acer Nitro 5 Tiger AN515 58 769J",
             "Brand": "Acer",
             "Column4": "LT18"
            },
            {
             "Id_product": 19,
             "Name_product": "Laptop gaming Acer Nitro 5 AN515 45 R86D",
             "Brand": "Acer",
             "Column4": "LT19"
            },
            {
             "Id_product": 20,
             "Name_product": "Laptop gaming Acer Predator Helios 300 PH315 55 76KG",
             "Brand": "Acer",
             "Column4": "LT20"
            },
            {
             "Id_product": 21,
             "Name_product": "Tai nghe Gaming Logitech G Pro Gen 2",
             "Brand": "Logitech",
             "Column4": "HP01"
            },
            {
             "Id_product": 22,
             "Name_product": "Tai nghe Logitech G535 LIGHTSPEED Wireless Black",
             "Brand": "Logitech",
             "Column4": "HP02"
            },
            {
             "Id_product": 23,
             "Name_product": "Tai nghe Gaming Logitech G335 White",
             "Brand": "Logitech",
             "Column4": "HP03"
            },
            {
             "Id_product": 24,
             "Name_product": "Tai nghe Logitech G733 LIGHTSPEED Wireless Black",
             "Brand": "Logitech",
             "Column4": "HP04"
            },
            {
             "Id_product": 25,
             "Name_product": "Tai nghe Logitech G Pro X League Of Legends",
             "Brand": "Logitech",
             "Column4": "HP05"
            },
            {
             "Id_product": 26,
             "Name_product": "Tai Nghe Sony MDR - XB55AP",
             "Brand": "Sony",
             "Column4": "HP06"
            },
            {
             "Id_product": 27,
             "Name_product": "Tai nghe True Wireless Sony WF - C500 Green",
             "Brand": "Sony",
             "Column4": "HP07"
            },
            {
             "Id_product": 28,
             "Name_product": "Tai nghe Hires Sony MDR-1AM2",
             "Brand": "Sony",
             "Column4": "HP08"
            },
            {
             "Id_product": 29,
             "Name_product": "Tai Nghe Asus ROG Delta S Core",
             "Brand": "ASUS",
             "Column4": "HP09"
            },
            {
             "Id_product": 30,
             "Name_product": "Tai nghe Asus ROG Delta S Animate",
             "Brand": "ASUS",
             "Column4": "HP10"
            },
            {
             "Id_product": 31,
             "Name_product": "Bàn Phím Bluetooth Logitech K380 Blue",
             "Brand": "Logitech",
             "Column4": "KB01"
            },
            {
             "Id_product": 32,
             "Name_product": "Bàn phím không dây Logitech MX Keys Mini - Rose",
             "Brand": "Logitech",
             "Column4": "KB02"
            },
            {
             "Id_product": 33,
             "Name_product": "Bàn phím Logitech Mechanical Gaming G413 TKL SE",
             "Brand": "Logitech",
             "Column4": "KB03"
            },
            {
             "Id_product": 34,
             "Name_product": "Bàn phím Logitech G PRO Mechanical Gaming Keyboard",
             "Brand": "Logitech",
             "Column4": "KB04"
            },
            {
             "Id_product": 35,
             "Name_product": "Bàn phím Logitech G Pro League Of Legends",
             "Brand": "Logitech",
             "Column4": "KB05"
            },
            {
             "Id_product": 36,
             "Name_product": "Bàn phím cơ Asus ROG Strix Scope RX EVA Edition",
             "Brand": "ASUS",
             "Column4": "KB06"
            },
            {
             "Id_product": 37,
             "Name_product": "Bàn phím Asus ROG Strix Scope NX TKL Moonlight White",
             "Brand": "ASUS",
             "Column4": "KB07"
            },
            {
             "Id_product": 38,
             "Name_product": "Bàn phím Asus ROG Strix Scope NX TKL DELUXE - Red Switch",
             "Brand": "ASUS",
             "Column4": "KB08"
            },
            {
             "Id_product": 39,
             "Name_product": "Bàn phím cơ Fuhlen D87s RGB White",
             "Brand": "Fuhlen",
             "Column4": "KB09"
            },
            {
             "Id_product": 40,
             "Name_product": "Bàn phím cơ Fuhlen H95S Panda 3 Mode Wireless",
             "Brand": "Fuhlen",
             "Column4": "KB10"
            },
            {
             "Id_product": 41,
             "Name_product": "Chuột Logitech G304 Lightspeed Wireless",
             "Brand": "Logitech",
             "Column4": "M01"
            },
            {
             "Id_product": 42,
             "Name_product": "Chuột Logitech MX Anywhere 3 for Business Pale Grey",
             "Brand": "Logitech",
             "Column4": "M02"
            },
            {
             "Id_product": 43,
             "Name_product": "Chuột Logitech G502 Hero",
             "Brand": "Logitech",
             "Column4": "M03"
            },
            {
             "Id_product": 44,
             "Name_product": "Chuột Logitech G502 X Black",
             "Brand": "Logitech",
             "Column4": "M04"
            },
            {
             "Id_product": 45,
             "Name_product": "Chuột không dây Logitech Signature M650 L Rose",
             "Brand": "Logitech",
             "Column4": "M05"
            },
            {
             "Id_product": 46,
             "Name_product": "Chuột Asus TUF Gaming M4 Air",
             "Brand": "ASUS",
             "Column4": "M06"
            },
            {
             "Id_product": 47,
             "Name_product": "Chuột ASUS ROG Keris Wireless",
             "Brand": "ASUS",
             "Column4": "M07"
            },
            {
             "Id_product": 48,
             "Name_product": "Chuột Asus Rog Gladius III Wireless Aimpoint White",
             "Brand": "ASUS",
             "Column4": "M08"
            },
            {
             "Id_product": 49,
             "Name_product": "Chuột Fuhlen G90 Pro X",
             "Brand": "Fuhlen",
             "Column4": "M09"
            },
            {
             "Id_product": 50,
             "Name_product": "Chuột Fuhlen D90S White",
             "Brand": "Fuhlen",
             "Column4": "M10"
            },
            {
             "Id_product": 51,
             "Name_product": "Tay cầm chơi game Asus ROG Kunai 3 Gamepad Black",
             "Brand": "ASUS",
             "Column4": "GP01"
            },
            {
             "Id_product": 52,
             "Name_product": "Tay cầm chơi game Asus ROG Kunai 3 Gamepad White",
             "Brand": "ASUS",
             "Column4": "GP02"
            },
            {
             "Id_product": 53,
             "Name_product": "Tay cầm game không dây MSI Force GC30 V2 Black",
             "Brand": "MSI",
             "Column4": "GP03"
            },
            {
             "Id_product": 54,
             "Name_product": "Tay cầm game không dây MSI Force GC30 V2 White",
             "Brand": "MSI",
             "Column4": "GP04"
            },
            {
             "Id_product": 55,
             "Name_product": "Tay cầm Rapoo V600S Blue",
             "Brand": "Rapoo",
             "Column4": "GP05"
            },
            {
             "Id_product": 56,
             "Name_product": "Tay cầm Rapoo V600S Red",
             "Brand": "Rapoo",
             "Column4": "GP06"
            },
            {
             "Id_product": 57,
             "Name_product": "Razer Raiju Tournament Edition",
             "Brand": "Razer",
             "Column4": "GP07"
            },
            {
             "Id_product": 58,
             "Name_product": "Razer Raiju Ultimate",
             "Brand": "Razer",
             "Column4": "GP08"
            }
           ];

        axios.post('http://10.0.2.2:5000/sever/send-data', {
            user: user,
            rating: rating,
            product: product,
        })
        .then(response => {
            console.log(response.data);
            return fetch('http://10.0.2.2:5000/sever/get-data');
        })
        .then(response => response.json())
        .then(result => {
            const parsedData = JSON.parse(result)
            this.setState(parsedData)
        })
        .catch(error => {
            console.error(error);
        });
    }

    render() {
        const { data } = this.state;
        const dataArray = Object.values(this.state);

        const dataElements = dataArray.map((item, index) => (
            <Text key={index}>{item}</Text>
        ));

        return (
            <View>
                {dataElements}
            </View>
        );
  }
}

