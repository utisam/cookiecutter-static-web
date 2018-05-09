SHELL=/bin/bash -o pipefail

TARGET_DIR = dist
SOURCE_DIR = src
SOURCES = $(shell find $(SOURCE_DIR) -type f -name '*.js')
LIB_DIR = lib
LIB_SOURCES = $(shell find $(LIB_DIR) -type f -name '*.js')
TARGETS = $(patsubst $(SOURCE_DIR)/%,$(TARGET_DIR)/%,$(SOURCES))

.DELETE_ON_ERROR:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all test sources lint clean

all: lint $(TARGETS) test sources

lint: $(SOURCES) $(LIB_SOURCES)
	eslint -- $(SOURCE_DIR) $(LIB_DIR)

$(TARGET_DIR)/%.js: $(SOURCE_DIR)/%.js $(LIB_SOURCES)
	-mkdir -p $(dir $@)
	npx browserify --debug --transform [ babelify ] $< | \
		npx exorcist $@.map -b . > $@

test: $(TARGETS)
	TARGET_DIR=$(TARGET_DIR) npx mocha 'test/**/*.js'

sources: $(SOURCES) $(LIB_SOURCES)
	rsync -avr --delete $(SOURCE_DIR)/ $(TARGET_DIR)/$(SOURCE_DIR)/
	rsync -avr --delete $(LIB_DIR)/ $(TARGET_DIR)/$(LIB_DIR)/

clean:
	-rm -rf $(TARGET_DIR)

