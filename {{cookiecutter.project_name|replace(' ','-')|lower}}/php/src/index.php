<?php
require('lib/init.php');
require('lib/html5.php');

html5(_('Title'), function () {
?>
  <link rel="stylesheet" href="css/index.css">
<?php
}, function () {
?>
  <main class="container">
    <form id="sample-form" class="sample-form card">
      <h2><?=_('Sample Form')?></h2>
      <div class="sample-form-content">
        <p>
          <label for="message"><?=_('Message')?></label>
          <input type="text" class="form-control message-input">
        </p>
        <button type="submit" class="btn submit-button"><?=_('Submit')?></button>
      </div>
    </form>
    <section id="result-section"></section>
  </main>
  <script src="js/index.js"></script>
<?php
});
