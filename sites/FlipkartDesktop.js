const { clickElement } = require('../utils')

class FlipkartDesktop {
 constructor(client) {
  this.client = client
 }

 async goToHome() {
  const { Page } = this.client
  await Page.navigate({ url: 'https://www.flipkart.com' });
  await Page.loadEventFired();
 }

 async goToSearch() {
  const { Input, Page, Runtime } = this.client
  await Runtime.evaluate({
   expression: `
   document.querySelector('.LM6RPg').value = 'table';
   document.querySelector('.header-form-search').submit();
   `,
  })

  await Page.loadEventFired();
 }

 async goToProduct() {
  const { Page, Runtime } = this.client
  setTimeout(async () => {
   await Runtime.evaluate({
    expression: `
   document.querySelector('.Zhf2z-').setAttribute('target', '')
   document.querySelector('.Zhf2z-').click()
   `,
   })
  }, 1000)
  await Page.loadEventFired();
 }

 async goToCart() {
  const { Input, Page } = this.client

  await clickElement(this.client, '._2MWPVK')
  await Page.frameNavigated();
 }
}

module.exports = FlipkartDesktop
