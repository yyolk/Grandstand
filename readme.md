# Grandstand: Visualize your Sprints

[Sprint.ly](http://sprint.ly) is a great tool for Agile development, however it can be difficult to get a good sense of the size of your queue and how stories, tasks, and defects are distributed among your team. 

![Screenshot](http://f.cl.ly/items/0o2s1l0b382z2T3Q4743/screenshot_full.png)

Based on [Scrumly](https://github.com/simpleenergy/Scrumly) with interaction and visualization help from [Isotope](https://github.com/desandro/isotope), with Grandstand your Sprint.ly items are sized by their score, colored by their type, and arranged in a masonry grid.  You can filter your project's items by user, status, type, and score. 

Grandstand in action...

![Animated screenshot](http://f.cl.ly/items/0e3q151b00042H0a390d/granstand.gif)

## Setup

Getting started is simple, assuming you have a Sprint.ly account: 

1. Clone this repository recursively (`git clone --recursive git@github.com:andrewliebchen/Grandstand.git`). Without the `--recursive` flag, you won't get the necessary submodule.
1. Clone or download this repo.
2. Open `config.template.php`, fill in your Sprint.ly user, product, and API key information.
3. Save this file as `config.php`.
4. Setup the files on a webserver, or run locally with [MAMP](http://www.mamp.info/en/index.html).
5. Open `index.php` in your favorite browser.

## To do

This project goal is to experiment with new ways of visualizing and interacting with an Agile queue beyond the standard column layout. Grandstand should be improved to make better use of the more functionality offered by the Sprint.ly API. Additional features that would make Grandstand more useful: 

* Sort items by number, date added, activity, etc.
* Display item meta information beyond number and title.
* Build a configuration pane to allow users to input information for their own projects. With this feature, there could be a publically accessiable demo.
* Filter on multiple parameters within the same dimension.
* Figure out how to get around the 100 item API limit.
