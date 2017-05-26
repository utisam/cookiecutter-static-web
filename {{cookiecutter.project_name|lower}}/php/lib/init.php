<?php
/*
 * Common initialization
 */

define('LANGUAGE_CODE', getenv('LANGUAGE_CODE') ?: 'en');

setlocale(LC_ALL, 'C.UTF-8');
bindtextdomain('messages', __DIR__ . '/../locale/' . LANGUAGE_CODE);
bind_textdomain_codeset('messages', 'UTF-8');
textdomain('messages');

