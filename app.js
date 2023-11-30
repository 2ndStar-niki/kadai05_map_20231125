import config from "./config.js";
const apikey = config.ApiKey;

// 現在位置の取得
navigator.geolocation.getCurrentPosition(success, fail);


// 現在位置が取得できた場合
function success(pos) {
    alert("緯度：" + pos.coords.latitude + " 経度：" + pos.coords.longitude);
    const latitude = pos.coords.latitude; //緯度
    const longitude = pos.coords.longitude; // 経度
    const url = 'https://api.openweathermap.org/data/2.5/forecast'; // 使用するAPIのurl
    const apiKey = apikey; 

// 非同期処理
$.ajax({
    url: url, // 使用するAPIのURL
    data: { // 取得に必要な情報
    appid: apiKey,
    lat: latitude,
    lon: longitude,
    cnt: 1, // 取得する数
    units: 'metric', // 摂氏
    lang: 'ja' // 言語
    }
})

// API通信成功時
.done(function(data) { 
    $('h2').text(data.city.country + '：' + data.city.name + 'の天気');

    // 取得した天気予報データ
    data.list.forEach(function(response, index) {
    const dateTime = new Date(response.dt* 1000); // 取得日時
    const month = dateTime.getMonth() + 1; // 月
    const date = dateTime.getDate(); // 日
    const temp = Math.round(response.main.temp); // 気温
    const description = response.weather[0].description; // 天気の詳細
    const icon = response.weather[0].icon; // 天気アイコン名

    $('#today_icon').children('img').attr
        ('src', 'http://openweathermap.org/img/wn/' + icon + '@4x.png'); // 天気アイコンの場所
    $('#today_monthdate').text('日付：' + month + '/' + date); // 取得した月日
    $('#today_description').text('天気：' + description); // 天気の詳細
    $('#today_temp').text('気温：' + temp  + '°C'); // 気温

    });
    })
    // APIとの通信が失敗した場合
    .fail(function() {
    alert('APIから情報を取得できませんでした。');
})
}

// 現在位置が取得できなかった場合
function fail(error) { 
alert('現在位置を取得できませんでした。');
}