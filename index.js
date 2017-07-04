const CDP = require('chrome-remote-interface')
const chromedriver = require('chromedriver');
const FlipkartDesktop = require('./sites/FlipkartDesktop')
const UrbanLadderDesktop = require('./sites/UrbanladderDesktop')
const Table = require('cli-table');

function getPaintTime({ Runtime }) {
 return Runtime.evaluate({
  expression: `performance
   .getEntries()
   .find(entry => entry.name === \'first-contentful-paint\')
   .startTime`,
 })
}

async function ttc() {
 let client
 try {
  client = await CDP()
  const { Emulation, Network, Page } = client;
  await Promise.all([Network.enable(), Page.enable()]);
  await Network.clearBrowserCache()
  await Network.clearBrowserCookies()

  await Network.emulateNetworkConditions({
   offline: false,
   latency: 500,
   downloadThroughput: 80000,
   uploadThroughput: 60000,
  })

  await Emulation.setCPUThrottlingRate({ rate: 2 })


  //const website = new UrbanLadderDesktop(client)
  //const website = new UrbanLadderMobile(client)
  const website = new FlipkartDesktop(client)
  const isMobile = false

  if (isMobile) {
   await Network.setUserAgentOverride({
    userAgent: 'Mozilla/5.0 (Linux; Android 4.0.4; Galaxy Nexus Build/IMM76B) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.133 Mobile Safari/535.19',
   })
  }

  await website.goToHome()
  const fcpResultHome = await getPaintTime(client)

  await website.goToSearch()
  const fcpResultSearch = await getPaintTime(client)

  await website.goToProduct()
  const fcpResultProduct = await getPaintTime(client)
  //
  await website.goToCart()
  const fcpResultCart = await getPaintTime(client)

  const totalFCP = fcpResultHome.result.value +
   fcpResultSearch.result.value +
   fcpResultProduct.result.value +
   fcpResultCart.result.value

  const table = new Table({
   head: ['FCP Home Page', 'FCP Search Listing Page', 'FCP Product Page',
          'FCP Cart Page', 'Total FCP'],
  });

  table.push([
   `${Math.round(fcpResultHome.result.value)} ms`,
   `${Math.round(fcpResultSearch.result.value)} ms`,
   `${Math.round(fcpResultProduct.result.value)} ms`,
   `${Math.round(fcpResultCart.result.value)} ms`,
   `${Math.round(totalFCP)} ms`,
  ]);

  console.log(table.toString());
  return totalFCP
 } catch (err) {
  console.error(err);
 } finally {
  if (client) {
   await client.close();
  }
 }
}

ttc()
