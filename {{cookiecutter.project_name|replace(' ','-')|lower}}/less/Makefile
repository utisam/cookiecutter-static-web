SED=sed

TARGET_DIR = dist
SOURCE_DIR = src
SOURCES = $(shell find $(SOURCE_DIR) -type f -name '*.less')
LIB_SOURCES = $(shell find lib -type f -name '*.less')
TARGETS = $(patsubst $(SOURCE_DIR)/%.less,$(TARGET_DIR)/%.css,$(SOURCES))

.DELETE_ON_ERROR:

# Delete the default suffixes for old-fashioned suffix rules
.SUFFIXES:

.PHONY: all clean

all: $(TARGETS)

$(TARGET_DIR)/%.css: $(SOURCE_DIR)/%.less $(LIB_SOURCES)
	-mkdir -p $(dir $@)
	lessc --strict-imports --clean-css --autoprefix="last 2 versions, not ie <= 10" $< > $@
	# generate dependencies
	lessc -M $< $@ > $(TARGET_DIR)/$*.d
	# add rules to ignore missing prerequisites
	$(SED) -e 's/^[^:]*: *//' -e 's/ /\n/g' < $(TARGET_DIR)/$*.d | \
		$(SED) -e '/^$$/d' -e 's/$$/:/' \
		>> $(TARGET_DIR)/$*.d

-include $(LESS_TARGETS:.css=.d)

clean:
	-rm -rf $(TARGET_DIR)

