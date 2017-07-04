class UrbanLadderMobile {
 static isMobile() {
  return true
 }

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
   document.querySelector('.mock-search-bar').click();
   setTimeout(() => {
     document.querySelector('.search-form input').value = 'table';
     document.querySelector('.search-form').submit();
   }, 1000)
   `,
  })
  await Page.loadEventFired();
 }

 async goToProduct() {
  const { Page, Runtime } = this.client
  await Runtime.evaluate({
   expression: `
   setTimeout(() => {
    document.querySelector('#interstitial-header').click()
    document.querySelector('.product-card__image-link').click()
   }, 1000)
   `,
  })
  await Page.loadEventFired();
 }

 async goToCart() {
  const { Page, Runtime } = this.client
  await Runtime.evaluate({
   expression: `
   document.querySelector('.product-page-footer-bar__action form').submit()
   `,
  })
  await Page.loadEventFired();
 }
}

module.exports = UrbanLadderMobile

