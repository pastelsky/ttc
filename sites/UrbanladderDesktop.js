class UrbanLadderDesktop {
 constructor(client) {
  this.client = client
 }

 async goToHome() {
  const { Page } = this.client
  await Page.navigate({ url: 'https://www.urbanladder.com' });
  await Page.loadEventFired();
 }

 async goToSearch() {
  const { Page, Runtime } = this.client
  await Runtime.evaluate({
   expression: `
   document.querySelector('#search').value = 'table';
   document.querySelector('.icofont-search_latest').click();
   `,
  })
  await Page.loadEventFired();
 }

 async goToProduct() {
  const { Page, Runtime } = this.client
  await Runtime.evaluate({
   expression: `
   document.querySelector('.product-img').click()
   `,
  })
  await Page.loadEventFired();
 }

 async goToCart() {
  const { Page, Runtime } = this.client
  await Runtime.evaluate({
   expression: `
   document.querySelector('.cart-form').submit()
   `,
  })
  await Page.loadEventFired();
 }
}

module.exports = UrbanLadderDesktop
