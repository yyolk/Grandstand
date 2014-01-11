<?php
require 'init.php';
require 'libs/Requests/library/Requests.php';

Requests::register_autoloader();

// Vars:
$limit = 100;
$numApiRequests = 10; // = 1000 items max
$body = array();

// Fetch items from API (multiple times, if required)
for ($i = 0; $i < $numApiRequests; $i++) {

	$items = queryItemsApi($i);
	$body = array_merge($items,$body);

	// If the API returns less than $limit results, we have all results. Abort.
	if ($items < $limit) {
		break;
	}
}

// Function to query API and return items:
function queryItemsApi($page = 0, $limit = 100) {
	global $config;

	$offset = $page * $limit;
	$headers = array('Accept' => 'application/json');
	$options = array('auth' => array( $config['sprintly']['api_username'], $config['sprintly']['api_key']));
	$data = array('limit'=>$limit, 'offset' => $offset, 'status'=>$_GET['type']);
	$request = Requests::request('https://sprint.ly/api/products/'.$config['sprintly']['product_id'].'/items.json', $headers, $data, Requests::GET, $options);

	return json_decode($request->body, true);
}

// Respond as JSON
$body = json_encode(array_reverse($body));
echo $body;
