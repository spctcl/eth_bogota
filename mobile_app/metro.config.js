const { getDefaultConfig } = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules = require("expo-crypto-polyfills");

module.exports = config;