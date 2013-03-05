<?php
echo file_get_contents("https://search.twitter.com/search.json?q=".$_GET['query']."&result_type=recent&geocode=52.2,8.0,100km");
?>