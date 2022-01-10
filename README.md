# Mindable automation suite

## How to Start

Clone repository from [Github](https://github.com/artinada/tilda-challenge).

Install dependencies
```
npm  ci
```

## How to run tests on browser or mobile device


**For the running the  tests perform in terminal a command:**

for chrome browser
```
npm tun testcafe:chrome tests/navigation.ts
```

for chrome in headless mode
```
npm run testcafe:chrome:headless
```

for mobile (iPhone)
```
npm run testcafe:iphone
```

## Test reporter
Reporter is shipped with TestCafe by default. The result you can observe in the terminal after running the tests.

In case if any test was failed screenshots are saved in `/screenshots` folder

**Screenshots cleanup:**
```
rm -rf screenshots
```