SystemJS.config({
  transpiler: "plugin-typescript",
  packages: {
    "geom-js": {
      "main": "geom.ts",
      "meta": {
        "*.js": {
          "loader": "plugin-typescript"
        }
      },
      "defaultExtension": "ts"
    }
  }
});

SystemJS.config({
  packageConfigPaths: [
    "github:*/*.json",
    "npm:@*/*.json",
    "npm:*.json"
  ],
  map: {
    "os": "github:jspm/nodelibs-os@0.2.0-alpha",
    "plugin-typescript": "github:frankwallis/plugin-typescript@4.0.6",
    "process": "github:jspm/nodelibs-process@0.2.0-alpha"
  },
  packages: {
    "github:frankwallis/plugin-typescript@4.0.6": {
      "map": {
        "typescript": "npm:typescript@1.8.10"
      }
    },
    "github:jspm/nodelibs-os@0.2.0-alpha": {
      "map": {
        "os-browserify": "npm:os-browserify@0.2.1"
      }
    }
  }
});
