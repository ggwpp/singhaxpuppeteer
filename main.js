const puppeteer = require('puppeteer');

(async () => {
  var codes = await getCodes();
  codes = codes.filter(code=>code!=''); // clean empty code
  var count = Math.ceil(codes.length/10);
  var index = 0;
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://singha.buzzebees.com');
  await page.type('input[type=text]', process.env.SINGHA_USERNAME );
  await page.type('input[type=password]',process.env.SINGHA_PASSWORD );
  await page.click('button[type=submit]');
  await sleep(3000);

  await page.goto('https://singha.buzzebees.com/profile.aspx', {"waitUntil" : "networkidle0"});
  await page.screenshot({path: 'beforeAddPoint.png'});

  for(i =0; i< count; i++) {
    await page.goto('https://singha.buzzebees.com/AddCode.aspx');
    // Always expand input field to 10
    for(j =0; j<5; j++) {
      await page.evaluate(() => {
        document.querySelector('div.btn_add_code').click();
      })
    }
    await sleep(500);
    index = 0;
    for(k =i*10; k<(i*10)+10 && k<codes.length; k++) {
      console.log(codes[k])
      if(codes[k]!='') {
        index++;
        await page.type('input[placeholder="รหัสที่ ' + index.toString() + '"]', codes[k]);
      }
    };    
    // Click submit
    console.log('Click submit')
    await page.waitForSelector('div.btn_blue.btn_submite_code.ng-binding');
    await page.evaluate(() => {
      document.querySelector('div.btn_blue.btn_submite_code.ng-binding').click();
    })
    await sleep(5000);
  }

  await sleep(5000);
  await page.goto('https://singha.buzzebees.com/profile.aspx', {"waitUntil" : "networkidle0"}); 
  await page.screenshot({path: 'afterAddPoint.png'});  
  await browser.close();
})();

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function getCodes(cb) {
  fs = require('fs')
  return new Promise(function(resolve, reject){
    fs.readFile('codes.txt', 'utf8', function (err, data){
      if (err) {
        resolve(err)
      } else {
        var rawData = data.split("\n");
        resolve(rawData)
      }
    });
  });
}
