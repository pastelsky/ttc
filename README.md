

# [WIP] Time to Cart
Measure the time taken to compelete a flow from home page to the cart page on a 3G Network on chrome. 

<img src="https://s14.postimg.org/wgfezao81/Screen_Shot_2017-07-04_at_11.54.19_AM.png"/>

# Sites
Supported sites can be found in the `sites` directory. 
A new site can be added by implementing all of the methods of the `Site` interface. 
Best to fork off an existing site.

# Getting started
1. Clone this project
2. `yarn install`
3. Get / Have chrome canary
4. Start remote chrome interface on port 9222.
   On mac, this can be done using
   ```bash
   sudo /Applications/Google\ Chrome\ Canary.app/Contents/MacOS/Google\ Chrome\ Canary --remote-debugging-port=9222 
   ```
5. In a new terminal exec `node index` to run the test
6. Different sites can be tested by changing `website` in `index.js`
