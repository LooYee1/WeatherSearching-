//weather.js
/*使用城市名称（例如 athens）
或逗号分隔的城市名称以及国家/地区代码（例如 athens，gr）
进行搜索*/
/*我的理解:这些const代码就是获取了相应的事件,以此来让后续代码能够操作对应的事件

 */
const form=document.querySelector(".top-banner form");
const input=document.querySelector(".top-banner input");
const msg=document.querySelector(".top-banner.msg");
const list=document.querySelector(".ajax-section .cities");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const inputVal = input.value;

    // 调用你自己的后端
    try {
        const response = await fetch(`http://localhost:8080/api/weather?location=${encodeURIComponent(inputVal)}`);
        const data = await response.json();

        // 处理心知天气返回的数据
        const { location, now } = data.results[0];
        const iconUrl = `images/${now.code}@1x.png`;

        const li = document.createElement("li");
        li.classList.add("city");
        li.innerHTML = `
      <h2 class="city-name" data-name="${location.name},${location.country}">
        <span>${location.name}</span>
        <sup>${location.country}</sup>
      </h2>
      <div class="city-temp">${now.temperature}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${iconUrl}" alt="${now.text}">
        <figcaption>${now.text}</figcaption>
      </figure>
    `;
        list.appendChild(li);
    } catch (error) {
        msg.textContent = "查询失败，请检查城市名称";
    }

    msg.textContent = "";
    form.reset();
    input.focus();
});
// const apiKey = "PwrR_DhYsnDG-Ywnc";
// form.addEventListener("submit",e=>{
//     e.preventDefault();/*阻止表单默认提交(页面不刷新)*/
//     let inputval =input.value;//获取用户的输入
//     const listItems = list.querySelectorAll(".ajax-section .city"); // 获取所有城市卡片
//     const listItemsArray = Array.from(listItems); // 将 NodeList 转为数组
//     //为什么要转为数组?因为接下来要用if判断来进行重复性检测
//     if(listItemsArray.length>0){
//         const filteredArray=listItemsArray.filter(el=>{
//             let content="";
//             //情况1 :输入包含国家码(如:"athens,gr")
//             if(inputval.includes(",")){
//                 const[city,countryCode]=inputval.split(",");//将城市和国家码分割
//
//                 //子情况1a:国家码长度超过了2(如:grrrrr 无效)
//                 if(countryCode.trim().length>2){
//                     inputval=city;//保留城市名,并修正输入为城市名
//                     content = el.querySelector(".city-name span").textContent.toLowerCase();
//                 }
//                 //子情况1b:国家码有效
//                 else{
//                     content=el.querySelector(".city-name").dataset.name.toLowerCase();
//                 }
//             }
//             //情况2: 仅城市名
//                 else{
//                     content=el.querySelector(".city-name span").textContent.toLowerCase();
//                 }
//                 return content === inputval.toLowerCase();
//         });
//         if(filteredArray.length>0){
//             msg.textContent = `You already know the weather for ${
//                 filteredArray[0].querySelector(".city-name span").textContent
//             } ...otherwise be more specific by providing the country code as well 😉`;
//             form.reset();
//             input.focus();
//             return;
//         }
// }
//     //ajax代码部分
// const url=`https://api.openweathermap.org/data/2.5/weather?
// q=${inputval}&appid=${apiKey}&units=metric`;
//     fetch(url)
//     .then(response=>response.json())
//     .then(data=>{
//     const{main,name,sys,weather}=data;
//         const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
//             weather[0]["icon"]
//         }.svg`;
//
//         const li = document.createElement("li");
//         li.classList.add("city");
//         const markup = `
//         <h2 class="city-name" data-name="${name},${sys.country}">
//           <span>${name}</span>
//           <sup>${sys.country}</sup>
//         </h2>
//         <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//         <figure>
//           <img class="city-icon" src="${icon}" alt="${
//             weather[0]["description"]
//         }">
//           <figcaption>${weather[0]["description"]}</figcaption>
//         </figure>
//       `;
//         li.innerHTML = markup;
//         list.appendChild(li);
//     })
//         .catch(() => {
//             msg.textContent = "Please search for a valid city 😩";
//         });
//
//     msg.textContent = "";
//     form.reset();
//     input.focus();
// });