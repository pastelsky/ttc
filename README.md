

# [WIP] Time to Cart

## What is it?
Measure the time taken to compelete a flow from home page to the cart page on a 3G Network on chrome. 

<img src="https://s14.postimg.org/wgfezao81/Screen_Shot_2017-07-04_at_11.54.19_AM.png"/>

## Getting started
1. Clone this project
2. `yarn install`
3. Get / Have chrome canary
4. Start remote chrome interface on port 9222.
   On mac, this can be done using
   ```bash
   sudo /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 
   ```
5. In a new terminal exec `node index` to run the test
6. Different sites can be tested by changing the `website` variable in `index.js`

## Testing different sites
Supported sites can be found in the `sites` directory. 
A new site can be added by implementing all of the methods of the `Site` interface. 
Best to fork off an existing site.
