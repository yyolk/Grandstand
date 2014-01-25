<?php require 'resources/init.php'; ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Grandstand for <?php echo $config['sprintly']['product_name'] ?></title>

  <meta name="viewport" content="width=device-width,initial-scale=1">

  <link href="stylesheets/css/application.css" rel="stylesheet" type="text/css"> 

  <script src="http://code.jquery.com/jquery-latest.js"></script>
  <script src="javascripts/application.js"></script>
</head>

<body class="is-loading">
  <header>
    <div class="width-wrapper">
      <h1><a href="/"></a></h1>
      <div id="users" class="filters dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">All users</a>
        <script id="user_template" type="text/x-handlebars-template">
          <ul class="dropdown-menu" role="menu">
            <li role="menuitem"><a class="user filter all active" data-filter=".item">All users</a></li>
            {{#each users}}
              <li role="menuitem">
                <a class="user filter" data-filter=".user-{{id}}">
                  {{firstName}} {{lastName}}
                </a>
              </li>
            {{/each}}
            <li role="menuitem"><a class="user filter" data-filter=".unassigned">Unassigned</a></li>
          </ul>
        </script>
      </div>
      <div id ="statuses" class="filters dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">All statuses</a>
        <ul class="dropdown-menu" role="menu">
          <li role="menuitem"><a class="filter all active" data-filter=".item">All statuses</a></li>
          <li role="menuitem"><a class="filter" data-filter=".someday">Someday</a></li>
          <li role="menuitem"><a class="filter" data-filter=".backlog">Backlog</a></li>
          <li role="menuitem"><a class="filter" data-filter=".in-progress">Current</a></li>
        </ul>
      </div>
      <div id="types" class="filters dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">All types</a>
        <ul class="dropdown-menu" role="menu">
          <li role="menuitem"><a class="filter all active" data-filter=".item">All types</a></li>
          <li role="menuitem"><a class="filter" data-filter=".story">Story</a></li>
          <li role="menuitem"><a class="filter" data-filter=".task">Task</a></li>
          <li role="menuitem"><a class="filter" data-filter=".defect">Defect</a></li>
        </ul>
      </div>
      <div id="scores" class="filters dropdown">
        <a class="dropdown-toggle" data-toggle="dropdown">All scores</a>
        <ul class="dropdown-menu" role="menu">
          <li role="menuitem"><a class="filter all active" data-filter=".item">All scores</a></li>
          <li role="menuitem"><a class="filter" data-filter=".no-score">No score</a></li>
          <li role="menuitem"><a class="filter" data-filter=".S">Small</a></li>
          <li role="menuitem"><a class="filter" data-filter=".M">Medium</a></li>
          <li role="menuitem"><a class="filter" data-filter=".L">Large</a></li>
          <li role="menuitem"><a class="filter" data-filter=".XL">X-Large</a></li>
        </ul>
      </div>
      <div class="view-actions">
        <div class="view-action">
          <input type="text" data-search="item" placeholder="Search items">
          <a data-icon="close" data-search="close"></a>
        </div>
        <div class="view-action" data-toggle="group">
          <a class="button active" data-icon="grid" data-toggles="grid"></a>
          <a class="button" data-icon="list" data-toggles="list"></a>
        </div>
      </div>
    </div>
  </header>
  <div id="items" class="width-wrapper" data-view="grid">
    <script id="item_template" type="text/x-handlebars-template">
      {{#each items}}
        <a href="{{{shortUrl}}}"class="item {{status}} {{score}} {{type}} {{assignedToID}}" target="_blank">
          <p>
            <b>#{{number}}</b>
            <span class="title">{{title}}</span>
          </p>
        </a>
      {{/each}}
    </script>
  </div>
  <div id="mask">
    <div class="runner"></div>
  </div>
</body>
</html>
