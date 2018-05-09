<?php
function html5($title, $ext_head, $body)
{
?>
<!DOCTYPE html>
<html lang="<?=LANGUAGE_CODE?>">
<head>
  <title><?=$title?></title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/base.css">
<?php $ext_head(); ?>
</head>
<body>
<?php $body(); ?>
</body>
</html>
<?php
}
?>
