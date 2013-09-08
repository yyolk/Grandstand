# Visualize your Sprints

[Sprint.ly](http://sprint.ly) is a great tool for Agile development, however it can be difficult to get a good sense of the size of your queue and how stories, tasks, and defects are distributed among your team. 

![Screenshot](http://f.cl.ly/items/2T0F1w0038161Y3p0g1r/Screen%20Shot%202013-09-08%20at%2012.48.29%20PM.png)

Based on [Scrumly](https://github.com/simpleenergy/Scrumly) with interaction and visualization help from [Isotope](https://github.com/desandro/isotope), your Sprint.ly items are sized by their score, colored by their type, and arranged in a masonry grid.  You can filter your project's items by user, status, type, and score. 

## Setup

Getting started is simple, assuming you have a Sprint.ly account: 

1. Clone or download this repo.
2. Open `config.template.php`, fill in the user, product, and API information.
3. Save as `config.php`.
4. Setup the files on a webserver, or run locally with [MAMP](http://www.mamp.info/en/index.html).
5. Open `index.php` in your favorite browser.

## To do

This method of interacting with a Sprint.ly queue has promise.  Additional features that would make this too more useful: 

* Come up with a better name.
* Sort items by number, date added, activity, etc.
* Display item meta information beyond number and title.
* POST operations.
* Build a configuration pane to allow users to input information for their own projects.
* Allow filtering on multiple parameters within the same dimension.
* Figure out how to get around the 100 item API limit.
* Generally push this tool to be a Sprint.ly replacement, rather than just a suplement.
