<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <title>Scrumly</title>

  <meta name="viewport" content="width=device-width,initial-scale=1">

  <link href="stylesheets/css/application.css" rel="stylesheet" type="text/css"> 

  <script src="http://code.jquery.com/jquery-latest.js"></script>
  <script src="javascripts/vendor/jquery.isotope.min.js"></script>
  <script src="javascripts/application.js"></script>
</head>

<body class="is-loading">
  <header>
    <nav id="users" class="users filters"></nav>
    <nav id="statuses" class="statuses filters">
      <a class="status filter all active" data-filter=".item">All statuses</a>
      <a class="status filter" data-filter=".someday">Someday</a>
      <a class="status filter" data-filter=".backlog">Backlog</a>
      <a class="status filter" data-filter=".in-progress">Current</a>
    </nav>
    <nav id="types" class="statuses filters">
      <a class="type filter all active" data-filter=".item">All types</a>
      <a class="type filter" data-filter=".story">Story</a>
      <a class="type filter" data-filter=".task">Task</a>
      <a class="type filter" data-filter=".defect">Defect</a>
    </nav>
  </header>
  <div id="mask">
    <div class="runner"></div>
  </div>
  <div id="items"></div>
</body>
</html>
