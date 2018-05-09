SHELL=/bin/bash -o pipefail

TARGET_DIR = dist
SOURCE_DIR = src
SOURCES = $(shell find $(SOURCE_DIR) -type f -name '*.js')
LIB_DIR = lib
LIB_SOURCES = $(shell find lib -type f -name '*.js')
TARGETS = $(patsubst $(SOURCE_DIR)/%,$(TARGET_DIR)/%,$(SOURCES))

.DELETE_ON_ERROR:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all test sources eslint clean

all: eslint $(TARGETS) test sources

eslint: $(SOURCES) $(LIB_SOURCES)
	eslint $(SOURCE_DIR) $(LIB_DIR)

CLOSURE_COMPILER = closure-compiler.jar
CLOSURE_COMPILATION_LEVEL = ADVANCED_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = SIMPLE_OPTIMIZATIONS
#CLOSURE_COMPILATION_LEVEL = WHITESPACE_ONLY

$(TARGET_DIR)/%.js: $(SOURCE_DIR)/%.js $(LIB_SOURCES)
	-mkdir -p $(dir $@)
	java -jar $(CLOSURE_COMPILER) \
		--language_in=ECMASCRIPT6_STRICT \
		--language_out=ECMASCRIPT5_STRICT \
		--rewrite_polyfills=false \
		{% raw %}--output_wrapper='(()=>{%output%})();'{% endraw %} \
		--compilation_level=$(CLOSURE_COMPILATION_LEVEL) \
		--jscomp_off=checkVars \
		--module_resolution=BROWSER \
		--create_source_map "$@.map" \
		--js_output_file $@ \
		$^
	echo "//# sourceMappingURL=$(notdir $@).map" >> $@

test: $(TARGETS)
	TARGET_DIR=$(TARGET_DIR) npm run test

sources: $(SOURCES) $(LIB_SOURCES)
	rsync -avr --delete $(SOURCE_DIR)/ $(TARGET_DIR)/$(SOURCE_DIR)/
	rsync -avr --delete $(LIB_DIR)/ $(TARGET_DIR)/$(LIB_DIR)/

clean:
	-rm -rf $(TARGET_DIR)
