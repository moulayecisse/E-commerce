<?php

$appKernel = new AppKernel('tests', false);
$appKernel->boot();

return $appKernel->getContainer();

?>
