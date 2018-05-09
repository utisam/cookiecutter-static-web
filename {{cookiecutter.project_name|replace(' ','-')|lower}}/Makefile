SHELL=/bin/bash -o pipefail

LANGUAGE_CODE = en
TARGET_DIR = dist

HTML_MODULES = php
CSS_MODULES = less
JS_MODULES = js-gcl
MODULES = $(HTML_MODULES) $(CSS_MODULES) $(JS_MODULES) jsdoc

.DELETE_ON_ERROR:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all clean src $(MODULES)

all: src $(MODULES)

clean:
	-rm -rf $(TARGET_DIR) php/locale/*/C/LC_MESSAGES/messages.mo

src:
	rsync -au --exclude ".gitkeep" "src/" "$(TARGET_DIR)/"

$(HTML_MODULES):
	+$(MAKE) -C "$@" -e "TARGET_DIR=../$(TARGET_DIR)"

$(CSS_MODULES):
	+$(MAKE) -C "$@" -e "TARGET_DIR=../$(TARGET_DIR)/css"

$(JS_MODULES):
	+$(MAKE) -C "$@" -e "TARGET_DIR=../$(TARGET_DIR)/js"

jsdoc:
	+$(MAKE) -C js-gcl -e "TARGET_DIR=../$(TARGET_DIR)" jsdoc

