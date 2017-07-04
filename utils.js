module.exports = {
 clickElement: async (client, selector) => {
  const { Input, Runtime } = client
  const bcrResultLeft = await Runtime.evaluate({
   expression: `
     document.querySelector('${selector}').getBoundingClientRect().left
    `,
  })

  const bcrResultTop = await Runtime.evaluate({
   expression: `
     document.querySelector('${selector}').getBoundingClientRect().top
    `,
  })

  await Input.dispatchMouseEvent({
   type: 'mousePressed',
   x: bcrResultLeft.result.value,
   y: bcrResultTop.result.value,
   button: 'left',
   clickCount: 1,
  })
  await Input.dispatchMouseEvent({
   type: 'mouseReleased',
   x: bcrResultLeft.result.value,
   y: bcrResultTop.result.value,
   button: 'left',
   clickCount: 1,
  })
 },
}
