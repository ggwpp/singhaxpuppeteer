# SinghaRewards automated point collecting by Puppeteer

## Installation
```
npm install
```

## Usage
1. Put all codes into `codes.txt` use new line as delimiter.
2. Set env `SINGHA_USERNAME`, `SINGHA_PASSWORD`. 
3. Run `node main.js`

This also takes a screenshot before/after collecting point. Incase that don't want to see the processing can simply turn on headless by set it to ture `{ headless: true}`

To testing purpose please comment on this https://github.com/ggwpp/singhaxpuppeteer/blob/master/main.js#L38-L41 so codes will not be submitted.

This project is just for study about Puppeteer.
Please use this with caution and be careful about rate limit.
