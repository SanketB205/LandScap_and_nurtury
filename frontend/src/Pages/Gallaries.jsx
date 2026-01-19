import { Album } from "../Components/Gallaries_Features/Album";

export function Gallries()
{
   const Name1 = "Artifical Grass";
   const Name2 = "Lawn Works";
   const Name3 = "Vertical Gardan";
   const Name4 = "Artificial Vertical Gardan";
   const Name5 = "Gardan Maintainance ";
   
   const arr1 = ["https://www.evergreenlandscaping.in/wp-content/uploads/2019/10/Artificial-Grass-CA-Bavdhan-e1571648034141.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2019/10/Artificial-Grass-Khardi-Pune-e1571647889408.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2019/10/Artificial-Grass-Wagholi-Pune-e1571647460951.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2019/10/Artificial-Grass-Viman-Nagar-Pune-e1571647525925.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2019/10/Artificial-Grass-Sai-Aura-e1571647747177.jpg"
];

  const arr2 = ["https://www.evergreenlandscaping.in/wp-content/uploads/2018/09/Sports-Field-Development-1-300x300.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2018/09/Sports-Field-Development-1-300x300.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2018/10/2018-10-08-300x300.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2018/09/Natural-Sports-Ground-Pune-e1536848545858-300x300.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2022/03/Sports-Field-Development-Natural-lawn-150x150.jpg"
  ];
  const arr3 = ["https://www.evergreenlandscaping.in/wp-content/uploads/2023/02/IMG-20181203-WA0008.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2023/02/IMG-20181203-WA0004-768x576.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2023/02/IMG-20180925-WA0017-768x576.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2023/02/IMG-20181203-WA0006-768x576.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2023/02/IMG-20181203-WA0009-768x576.jpg"
  ];
  const arr4 = ["https://www.evergreenlandscaping.in/wp-content/uploads/2024/08/IMG_1670-768x576.jpg","https://www.evergreenlandscaping.in/wp-content/uploads/2024/08/Artificial-Vertical-Garden-Wall-1-768x576.jpg"
    ,"https://www.evergreenlandscaping.in/wp-content/uploads/2024/08/IMG_1687-768x576.jpg","https://www.evergreenlandscaping.in/wp-content/uploads/2024/08/IMG_1691-e1724926639973.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2024/08/Artificial-garden-wall-balcony-768x1024.jpg"
  ];
  const arr5 = ["https://www.evergreenlandscaping.in/wp-content/uploads/2021/05/IMG-20210409-WA0004-768x576.jpg","https://www.evergreenlandscaping.in/wp-content/uploads/2021/08/Garden-maintenance-spraying-768x576.jpg",
    "https://www.evergreenlandscaping.in/wp-content/uploads/2021/08/trimming-768x1024.jpg","https://www.evergreenlandscaping.in/wp-content/uploads/2021/08/lawn-cutting-e1718550074923.jpg","https://www.evergreenlandscaping.in/wp-content/uploads/2021/08/plantation-768x576.jpg"
  ];

  return(<div className="Galleries">
  <Album Name={Name1}  imgArray={arr1}/>
  <Album Name={Name2}  imgArray={arr2}/>
  <Album Name={Name3}  imgArray={arr3}/>
  <Album Name={Name4}  imgArray={arr4}/>
  <Album Name={Name5}  imgArray={arr5}/>
  </div>)
}