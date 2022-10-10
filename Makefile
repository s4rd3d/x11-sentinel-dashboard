# Common directories and paths
TOP_DIR := $(dir $(firstword $(MAKEFILE_LIST)))
ABS_DIR := $(abspath $(TOP_DIR))

# Common directories and paths
BUILD_DIR := $(ABS_DIR)/build

# Make modules dir configurable
MODULES_DIR ?= $(ABS_DIR)/node_modules
PATH := $(PATH):$(ABS_DIR)/node_modules/.bin

# Additional yarn configurations
YARN_EXTRA_ARGS ?=

#-------------------------------------------------------------------------------
# Internals
#-------------------------------------------------------------------------------

YARN_ARGS = --modules-folder $(MODULES_DIR) $(YARN_EXTRA_ARGS)

#-------------------------------------------------------------------------------
# Targets
#-------------------------------------------------------------------------------

default: all

.PHONY: all
all: install-deps check

# Cleanup targets
.PHONY: mrproper
mrproper:
	$(RM) -r $(MODULES_DIR) $(BUILD_DIR) $(ABS_DIR)/release.tar.xz
.PHONY: clean
clean:
	yarn $(YARN_ARGS) clean

# Install dependencies
.PHONY: install-deps
install-deps:
	yarn $(YARN_ARGS) install

# Upgrade dependencies
.PHONY: upgrade-deps
upgrade-deps:
	yarn $(YARN_ARGS) upgrade

# Compile application
build: compile
compile:
	yarn $(YARN_ARGS) build

# Run development server
.PHONY: server
server:
	yarn $(YARN_ARGS) start

# Run tests
.PHONY: test
test:
	yarn $(YARN_ARGS) test

# Create production build
.PHONY: release
release: build
	tar -c -J -f $(TOP_DIR)/release.tar.xz -C $(BUILD_DIR) .
