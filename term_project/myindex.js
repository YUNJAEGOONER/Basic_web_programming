const express = require('express')
const { get } = require('express/lib/response')
const app = express()
const port = 3000

// 서버에 HTML 파일 추가하는 방법
// localhost:3000/MyJS1.html

app.use('/public', express.static('public'))

app.use('/test', express.static('test'))

app.get('/', (req, res) => res.send('Hello World1!'))

app.get('/Path1', (req, res) => res.send('Get Path1'))

app.get('/Path2', (req, res) => res.send('Get Path2'))

app.put('/Path1', (req, res) => res.send('Put Path1'))

app.get('/api', function (req, res) {
  //console.log(search)
  var word = req.query.word;
  var request = require('request');
  var myurl = "http://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&ServiceKey=JAXK9K65ZC83J0739OM9&title=" + word;
  var options = {
    'method': 'GET',
    'url': encodeURI(myurl),
    'headers': {
      'Cookie': 'JSESSION ID=B7A0E8942A7CE6D8D7674794BFF150EC'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    // console.log(response.body);
    res.send(response.body);
  });

})

app.get('/kakao', function (req, res) {
  //'url': 'https://dapi.kakao.com/v2/search/blog?query=' + encodeURI(word+"리뷰")
  var word = req.query.word;
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://dapi.kakao.com/v2/search/blog?query=' + encodeURI(word),
    'headers': {
      'Authorization': 'KakaoAK aff54d687acb8a0a0022fa7688143c42'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    res.send(response.body);
  });
})

app.get('/kakaorecency', function (req, res) {
  //'url': 'https://dapi.kakao.com/v2/search/blog?query=' + encodeURI(word+"리뷰")
  var word = req.query.word;
  var request = require('request');
  var options = {
    'method': 'GET',
    'url': 'https://dapi.kakao.com/v2/search/blog?sort=recency&query=' + encodeURI(word),
    'headers': {
      'Authorization': 'KakaoAK aff54d687acb8a0a0022fa7688143c42'
    }
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    //console.log(response.body);
    res.send(response.body);
  });
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))