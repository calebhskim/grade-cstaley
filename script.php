<?php

	/*
	* Function takes in a path to a directory and returns an array of all files
	* in the directory.
	*
	* @params: $path
	*	String, path to directory
	*
	* @return: array
	*/

	function sounds($path) {
		return preg_grep('/^([^.])/', scandir($path));
	}

	/*
	* Function takes in a list of file names and creates an html string of buttons.
	*
	* @params: $list
	*	array of filesnames
	*
	* @return: html string
	*/

	function buttons($list) {
		$colors = array('default', 'primary', 'success', 'info', 'warning', 'danger');
		$buttons = '';
		foreach ($list as $key=>$value) {
			$soundname = substr($value, 0, strpos($value, '.'));
			$buttons .= '<button id="'.$soundname.'" type="button" class="staley btn btn-'.$colors[$key % sizeof($colors)].'">'.$soundname.'</button>';
		}
		return $buttons;
	}

	if(isset($_POST['type']) && $_POST['type'] == 'sounds') {
		$dir = $_POST['path'];
		$filenames = sounds($dir);
		echo(buttons($filenames));
	}
?>