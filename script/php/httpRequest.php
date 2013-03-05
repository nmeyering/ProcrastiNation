<?php
echo file_get_contents("https://search.twitter.com/search.json?q=".$_GET['query']."&result_type=popular&count=1");
?>