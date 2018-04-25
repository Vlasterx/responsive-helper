# Responsive helper
SCSS mixin for easier responsive coding

## What is the purpose of this mixin?
These responsive helper mixins enable you to write better responsive CSS with less effort. 

Benefits:
  - Define resolutions and breakpoints in one config file
  - Use named resolutions with no need to remember min-width or max-width values
  - Use dynamic variables for each resolution
  - Gulp process produces optmized CSS
  - CSS code is encapsulated within media breakpoints, which prevents accidental style leaking to unwanted places
  
## Configuration
Your responsive configuration is located in `scss/config_media.json` file. This is the database file our resolutions and looks like this:

    {
      "resolutions": {
        "mobile": {
          "name":             "mobile",
          "shortName":        "m",
          "breakpointStart":  "320px",
          "divisions":        "4",
          "baseFontSize":     "14px",
          "fluidWidth":       "true"
        },
        "phablet": {
          "name":             "phablet",
          "shortName":        "p",
          "breakpointStart":  "520px",
          "divisions":        "4",
          "baseFontSize":     "14px",
          "fluidWidth":       "true"
        },
        "tablet": {
          "name":             "tablet",
          "shortName":        "t",
          "breakpointStart":  "768px",
          "divisions":        "8",
          "baseFontSize":     "16px",
          "fluidWidth":       "true"
        },
        "desktop": {
          "name":             "desktop",
          "shortName":        "d",
          "breakpointStart":  "1024px",
          "divisions":        "12",
          "baseFontSize":     "18px",
          "fluidWidth":       "false"
        },
        "desktop2": {
          "name":             "desktop2",
          "shortName":        "d2",
          "breakpointStart":  "1280px",
          "divisions":        "12",
          "baseFontSize":     "20px",
          "fluidWidth":       "false"
        }
      }
    }

Each resolution has it's own name and specific variables. Some values are left for future upgrades and grid system that will be built upon this solution.

During the build process, this JSON file will be turned into SASS map file. Variables from that generated file will be used in these mixins. 

This file will also be minimized and copied into generated CSS folder in case that you want to use these variables from your JS.


## Mixins
There are 3 mixins in this package:

  - media($breakpoints...)
  - mediaAll()
  - mediaRange(min-resolution-name, max-resolution-name)

### Mixin media($breakpoints...) with responsive variables
This mixin enables you to write code similar to this

    .mixin__media {
      color: black;

      @include media(mobile, phablet) {
        font-size: $baseFontSize;
        line-height: normal;
      }

      @include media(tablet, desktop, desktop2) {
        font-size: $baseFontSize;
        line-height: round($baseFontSize * 1.61);
      }
    }

As you can see, you can use responsive code directly in your class/ID. At the moment, only usable responive variable is `$baseFontSize`, which you can use to define responsive typography and geometry that is based on base font size. 

If you take a look at `scss/config_media.json`, you will see that each breakpoint has it's own `baseFontSize` value. That value is used later as SCSS variable `$baseFontSize`.

### Mixin mediaAll() with responsive variables
This mixin is similar to media() mixin, but this one will be applied to all defined resolutions with separate media queries.

    .mixin__mediaAll {
      color: black;

      @include mediaAll() {
        font-size: $baseFontSize;
        line-height: round($baseFontSize * 1.61);
      }
    }

### Mixin mediaRange(min-resolution-name, max-resolution-name) without responsive variables
This mixin is intended for situations where you want to envelop your CSS under one media query. Since it uses range of resolutions, responsive variables are not possible.

    .mixin__mediaRange {

      @include mediaRange(mobile, phablet) {
        padding: 10px;
      }

      @include mediaRange(tablet, desktop2) {
        padding: 20px;
      }  
    }
  

--- 

## Author
Vladimir Jovanović
[Bitersen](https://www.bitersen.com) | [Facebook](https://vx.rs/face) | [LinkedIn](http://vx.rs/linkedin) | [Medium blog](https://www.medium.com/bitersen) 
