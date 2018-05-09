SHELL=/bin/bash -o pipefail

TARGET_DIR = dist
SOURCE_DIR = src
SOURCES = $(shell find $(SOURCE_DIR) -type f -name '*.php')
LIB_SOURCES = $(shell find lib -type f -name '*.php')
TARGETS = $(patsubst $(SOURCE_DIR)/%.php,$(TARGET_DIR)/%.html,$(SOURCES))

LANGUAGE_CODE = en
MESSAGE_SOURCE = locale/$(LANGUAGE_CODE)/C/LC_MESSAGES/messages.po
MESSAGE_TARGET = locale/$(LANGUAGE_CODE)/C/LC_MESSAGES/messages.mo
XGETTEXT_OPT =
ifneq ($(MESSAGE_TARGET),)
XGETTEXT_OPT += -j
endif

HTML_MINIFIER_OPT += --collapse-whitespace
HTML_MINIFIER_OPT += --minify-css
HTML_MINIFIER_OPT += --minify-js
HTML_MINIFIER_OPT += --remove-comments
HTML_MINIFIER_OPT += --sort-attributes
HTML_MINIFIER_OPT += --sort-class-name

.DELETE_ON_ERROR:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all clean gettext

all: $(TARGETS)

$(TARGET_DIR)/%.html: $(SOURCE_DIR)/%.php $(LIB_SOURCES) $(MESSAGE_TARGET)
	-mkdir -p $(dir $@)
	php $< | html-minifier $(HTML_MINIFIER_OPT) > $@

$(MESSAGE_TARGET): $(MESSAGE_SOURCE)
	-msgfmt $< -o $@

# To ignore $(MESSAGE_SOURCE) not found
$(MESSAGE_SOURCE):

gettext:
	xgettext $(XGETTEXT_OPT) --language PHP -o $(MESSAGE_SOURCE) lib/* src/*

clean:
	-rm -rf $(TARGET_DIR) locale/*/LC_MESSAGES/*.mo

